import webpush from "npm:web-push@3.6.7";
import { questions, scoreKnowledge, knowledgeScoringVersion } from "./questionnaire.ts";
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.ts";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Session-Token"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Sessions are issued only after registration or successful PIN verification.
async function pinHash(pin: string, salt: string) {
 const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(pin),'PBKDF2',false,['deriveBits']);
 const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(salt),iterations:100000,hash:'SHA-256'},key,256);
 return Array.from(new Uint8Array(bits),b=>b.toString(16).padStart(2,'0')).join('');
}
function lagosDate(now=new Date()) {
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Lagos',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const part=(type:string)=>parts.find(p=>p.type===type)!.value;
 return `${part('year')}-${part('month')}-${part('day')}`;
}
function newRecoveryCode() {
 const bytes=crypto.getRandomValues(new Uint8Array(16));
 return Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('').toUpperCase().match(/.{4}/g)!.join('-');
}
function normalizeRecoveryCode(code:string){return code.replace(/[\s-]/g,'').toUpperCase();}
async function recoveryDigest(code:string){
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(normalizeRecoveryCode(code)));
 return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
}
async function issueSession(phone: string) {
 const token=crypto.randomUUID()+crypto.randomUUID();
 await kv.set(`session:${token}`,{phone,issuedAt:Date.now(),expiresAt:Date.now()+30*60*1000});
 return token;
}
app.use('/make-server-bcdc6876/*',async(c,next)=>{
 const path=c.req.path;
 if(path.endsWith('/reminders/run')) {const secret=Deno.env.get('REMINDER_CRON_SECRET');if(!secret||c.req.header('X-Cron-Secret')!==secret)return c.json({error:'Access denied'},403);return next();}
 if(c.req.method==='OPTIONS'||path.endsWith('/health')||path.includes('/auth/')) return next();
 if(path.includes('/admin/')) return c.json({error:'Research exports require a separately configured administrator service'},403);
 const token=c.req.header('X-Session-Token');
 const session=token?await kv.get(`session:${token}`):null;
 if(!session||session.expiresAt<Date.now())return c.json({error:'Session expired. Please log in again.'},401);
 const profile=await kv.get(`user:${session.phone}:pin`);
 if(profile?.sessionsRevokedAt && (!session.issuedAt||session.issuedAt<=profile.sessionsRevokedAt))return c.json({error:'Session expired. Please log in again.'},401);
 const parts=path.split('/');
 let phone:string|undefined;
 if(c.req.method==='GET') {
  const index=parts.findIndex(p=>['user','assessment','screening','push-subscription'].includes(p));
  if(index>=0)phone=decodeURIComponent(parts[index+1]||'');
 } else {try{phone=(await c.req.json()).phone;}catch{return c.json({error:'Invalid request'},400);}}
 if(phone!==session.phone)return c.json({error:'Access denied'},403);
 return next();
});

// Health check endpoint
app.get("/make-server-bcdc6876/health", (c) => {
  return c.json({ status: "ok" });
});

// ============ AUTH ROUTES ============

// Register a new user
app.post("/make-server-bcdc6876/auth/register", async (c) => {
  try {
    const { phone, city, pin, language, facility, participantCode, lga } = await c.req.json();

    if (!/^\+234\d{10}$/.test(phone || "") || !/^\d{4}$/.test(pin || "") || !city || !facility || !participantCode || !lga) {
      return c.json({ error: "Phone, city, and PIN are required" }, 400);
    }

    // Check if user already exists
    const existing = await kv.get(`user:${phone}:profile`);
    if (existing) {
      return c.json({ error: "User with this phone number already exists" }, 409);
    }

    // Store user profile
    const profile = {
      phone,
      city, facility, participantCode, lga,
      language: language || "en",
      registeredAt: new Date().toISOString(),
    };
    await kv.set(`user:${phone}:profile`, profile);

    // Store PIN (simple storage for prototype)
    const salt=crypto.randomUUID();
    const recoveryCode=newRecoveryCode();
    await kv.set(`user:${phone}:pin`, { salt, hash:await pinHash(pin,salt), recoveryHash:await recoveryDigest(recoveryCode) });

    // Initialize progress
    await kv.set(`user:${phone}:progress`, {
      baselineCompleted: false,
      modulesCompleted: false,
      endlineCompleted: false,
    });

    console.log(`User registered successfully: ${phone}`);
    return c.json({ success: true, user: profile, recoveryCode, sessionToken: await issueSession(phone) });
  } catch (err) {
    console.log(`Error during user registration: ${err}`);
    return c.json({ error: `Registration failed: ${err}` }, 500);
  }
});

// Login
app.post("/make-server-bcdc6876/auth/login", async (c) => {
  try {
    const { phone, pin } = await c.req.json();

    if (!phone || !pin) {
      return c.json({ error: "Phone and PIN are required" }, 400);
    }

    const attempts = await kv.get(`user:${phone}:loginAttempts`) || {count:0,until:0};
    if (attempts.until > Date.now()) return c.json({error:'Too many attempts. Try again in 15 minutes.'},429);
    // Check user exists
    const profile = await kv.get(`user:${phone}:profile`);
    if (!profile) {
      return c.json({ error: "No account found with this phone number" }, 404);
    }

    // Check PIN
    const storedPin = await kv.get(`user:${phone}:pin`);
    if (!storedPin || (storedPin.hash ? await pinHash(pin,storedPin.salt) !== storedPin.hash : storedPin.pin !== pin)) {
      const count = attempts.until && attempts.until <= Date.now() ? 1 : attempts.count+1;
      await kv.set(`user:${phone}:loginAttempts`, {count,until:count>=5?Date.now()+15*60*1000:0});
      return c.json({ error: "Incorrect PIN" }, 401);
    }

    if(!storedPin.hash) {const salt=crypto.randomUUID();await kv.set(`user:${phone}:pin`,{...storedPin,salt,hash:await pinHash(pin,salt),pin:undefined});}
    await kv.set(`user:${phone}:loginAttempts`, {count:0,until:0});
    // Fetch progress
    const progress = await kv.get(`user:${phone}:progress`) || {
      baselineCompleted: false,
      modulesCompleted: false,
      endlineCompleted: false,
    };

    console.log(`User logged in successfully: ${phone}`);
    return c.json({ success: true, user: profile, progress, sessionToken: await issueSession(phone) });
  } catch (err) {
    console.log(`Error during user login: ${err}`);
    return c.json({ error: `Login failed: ${err}` }, 500);
  }
});

// Logged-in users can replace a lost code by confirming their current PIN.
app.post('/make-server-bcdc6876/recovery/generate',async(c)=>{
 const {phone,pin}=await c.req.json();
 if(!/^\d{4}$/.test(pin||''))return c.json({error:'Enter your current four-digit PIN'},400);
 const attempts=await kv.get(`user:${phone}:loginAttempts`)||{count:0,until:0};
 if(attempts.until>Date.now())return c.json({error:'Too many attempts. Try again in 15 minutes.'},429);
 const stored=await kv.get(`user:${phone}:pin`);
 if(!stored||(stored.hash?await pinHash(pin,stored.salt)!==stored.hash:stored.pin!==pin)){
 const count=attempts.until&&attempts.until<=Date.now()?1:attempts.count+1;
 await kv.set(`user:${phone}:loginAttempts`,{count,until:count>=5?Date.now()+900000:0});
 return c.json({error:'Incorrect PIN'},401);}
 const recoveryCode=newRecoveryCode();
 if(!await kv.compareAndSet(`user:${phone}:pin`,stored,{...stored,recoveryHash:await recoveryDigest(recoveryCode)}))return c.json({error:'Account changed. Please retry.'},409);
 await kv.set(`user:${phone}:loginAttempts`,{count:0,until:0});
 return c.json({success:true,recoveryCode});
});
app.post('/make-server-bcdc6876/auth/recovery/reset',async(c)=>{
 const {phone,code,pin}=await c.req.json();
 if(!/^\+234\d{10}$/.test(phone||'')||!/^\d{4}$/.test(pin||'')||typeof code!=='string'||!/^[A-F0-9]{32}$/.test(normalizeRecoveryCode(code)))return c.json({error:'Enter your saved recovery code and a new four-digit PIN'},400);
 const limit=await kv.get(`recovery-limit:${phone}`)||{count:0,until:0};
 if(limit.until>Date.now())return c.json({error:'Too many attempts. Try again in 15 minutes.'},429);
 const stored=await kv.get(`user:${phone}:pin`);
 if(!stored?.recoveryHash||stored.recoveryHash!==await recoveryDigest(code)){
 const count=limit.until&&limit.until<=Date.now()?1:limit.count+1;
 await kv.set(`recovery-limit:${phone}`,{count,until:count>=5?Date.now()+900000:0});
 return c.json({error:'Invalid recovery code'},400);}
 const salt=crypto.randomUUID(),recoveryCode=newRecoveryCode(),now=Date.now();
 const updated={salt,hash:await pinHash(pin,salt),recoveryHash:await recoveryDigest(recoveryCode),sessionsRevokedAt:now};
 if(!await kv.compareAndSet(`user:${phone}:pin`,stored,updated))return c.json({error:'Recovery code already used. Please retry with your latest code.'},409);
 await kv.set(`user:${phone}:loginAttempts`,{count:0,until:0});await kv.del(`recovery-limit:${phone}`);
 return c.json({success:true,recoveryCode});
});

// ============ USER PROFILE ROUTES ============

// Get user profile and all data
app.get("/make-server-bcdc6876/user/:phone", async (c) => {
  try {
    const phone = c.req.param("phone");

    const profile = await kv.get(`user:${phone}:profile`);
    if (!profile) {
      return c.json({ error: "User not found" }, 404);
    }

    const progress = await kv.get(`user:${phone}:progress`);
    const screening = await kv.get(`user:${phone}:screening`);
    const baseline = await kv.get(`user:${phone}:assessment:baseline`);
    const endline = await kv.get(`user:${phone}:assessment:endline`);

    return c.json({
      profile,
      progress,
      screening,
      assessments: { baseline, endline },
    });
  } catch (err) {
    console.log(`Error fetching user profile: ${err}`);
    return c.json({ error: `Failed to fetch user: ${err}` }, 500);
  }
});

// ============ SCREENING ROUTES ============

// ============ ASSESSMENT ROUTES ============

// Save assessment results
app.post("/make-server-bcdc6876/assessment", async (c) => {
  try {
    const { phone, type, answers, questionnaireVersion } = await c.req.json();

    if (!phone || !type) {
      return c.json({ error: "Phone and assessment type are required" }, 400);
    }

    if (type !== "baseline" && type !== "endline") {
      return c.json({ error: "Assessment type must be 'baseline' or 'endline'" }, 400);
    }

    const previous = await kv.get(`user:${phone}:progress`) || {};
    if (previous[type === 'baseline' ? 'baselineCompleted' : 'endlineCompleted']) return c.json({error:'This assessment has already been submitted'},409);
    if (type === 'endline' && (!previous.baselineCompleted || !previous.modulesCompleted)) return c.json({error:'Complete baseline and modules first'},403);
    if (questionnaireVersion !== 'appendix-II-2026-11' || !answers || Array.isArray(answers)) return c.json({error:'Use the revised questionnaire'},400);
    for(const q of questions.filter(q=>type==='endline'||q.section!=='D')) {
      const applicable=!q.when||answers[q.when[0]]===q.when[1];
      if(!applicable) {answers[q.id]=null;continue;}
      const value=answers[q.id];
      if(q.kind==='multi') {if(!Array.isArray(value)||!value.length||value.some(v=>!q.options?.includes(v)))return c.json({error:`Invalid answer to question ${q.id}`},400);}
      else if(q.options) {if(!q.options.includes(value))return c.json({error:`Invalid answer to question ${q.id}`},400);}
      else if(typeof value!=='string'||!value.trim()) return c.json({error:`Question ${q.id} is required`},400);
      if(q.kind==='number'&&(!/^\d+$/.test(value)||Number(value)<(q.id==='1'?18:0)||Number(value)>120))return c.json({error:`Invalid number for question ${q.id}`},400);
      if(q.kind==='other'&&String(value).startsWith('Other')&&!String(answers[q.id+'Other']||'').trim())return c.json({error:'Specify your other response'},400);
    }
    const knowledge = scoreKnowledge(answers);
    const { score, total } = knowledge;
    const assessmentData = {
      questionnaireVersion,
      knowledgeScoringVersion,
      knowledgeItemScores: knowledge.items,
      score,
      total,
      answers,
      completedAt: new Date().toISOString(),
    };

    await kv.set(`user:${phone}:assessment:${type}`, assessmentData);

    // Update progress
    const progress = await kv.get(`user:${phone}:progress`) || {};
    if (type === "baseline") {
      progress.baselineCompleted = true;
      progress.baselineCompletedAt = assessmentData.completedAt;
    } else {
      progress.endlineCompleted = true;
      progress.endlineCompletedAt = assessmentData.completedAt;
    }
    await kv.set(`user:${phone}:progress`, progress);

    console.log(`Assessment (${type}) saved for user: ${phone}, score: ${score}/${total}`);
    return c.json({ success: true, assessment: assessmentData, progress });
  } catch (err) {
    console.log(`Error saving assessment data: ${err}`);
    return c.json({ error: `Failed to save assessment: ${err}` }, 500);
  }
});

app.get('/make-server-bcdc6876/assessment/:phone/:type',async(c)=>{
 const type=c.req.param('type');if(!['baseline','endline'].includes(type))return c.json({error:'Invalid assessment type'},400);
 return c.json(await kv.get(`user:${c.req.param('phone')}:assessment:${type}`));
});
app.post('/make-server-bcdc6876/push-subscription/disable',async(c)=>{
 const {phone}=await c.req.json();await kv.del(`user:${phone}:push-subscription`);
 const screening=await kv.get(`user:${phone}:screening`);if(screening){screening.reminder=false;await kv.set(`user:${phone}:screening`,screening);}
 return c.json({success:true});
});

// ============ SCREENING ROUTES ============

// Save screening appointment
app.post("/make-server-bcdc6876/screening", async (c) => {
  try {
    const body = await c.req.json();
    const { phone, center, date, reminder } = body;
    let age = body.age;
    // Age is already collected in the baseline questionnaire (question 1); reuse it when the form does not send one.
    if (!age) age = (await kv.get(`user:${phone}:assessment:baseline`))?.answers?.['1'];

    if (!phone || !age || !center || !date) {
      return c.json({ error: "Phone, age, center, and date are required" }, 400);
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < lagosDate() || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0,10)!==date) return c.json({error:'Choose today or a future date'},400);
    if(!['asubiaro','oke-ogbo'].includes(center)||!Number.isInteger(Number(age))||Number(age)<18||Number(age)>120||typeof reminder!=='boolean')return c.json({error:'Invalid appointment details'},400);
    if(reminder && !await kv.get(`user:${phone}:push-subscription`))return c.json({error:'Enable push notifications before saving reminders'},400);
    const previous=await kv.get(`user:${phone}:screening`);
    const screeningData = {
      age,
      center,
      date,
      reminder: reminder || false,
      completed: previous?.date===date && previous?.center===center ? previous.completed===true : false,
      completedAt: previous?.date===date && previous?.center===center ? previous.completedAt || null : null,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`user:${phone}:screening`, screeningData);
    
    // Create reminder tracking
    await kv.set(`user:${phone}:reminders`, {
      screeningDate: date,
      reminder2DaysSent: false,
      reminder1DaySent: false,
      reminderDayOfSent: false,
      createdAt: new Date().toISOString(),
    });

    console.log(`Screening appointment saved for user: ${phone}, date: ${date}`);
    return c.json({ success: true, screening: screeningData });
  } catch (err) {
    console.log(`Error saving screening data: ${err}`);
    return c.json({ error: `Failed to save screening: ${err}` }, 500);
  }
});

// Update screening completion status
app.post("/make-server-bcdc6876/screening/completed", async (c) => {
  try {
    const { phone, completed } = await c.req.json();
    
    if (!phone || typeof completed !== "boolean") {
      return c.json({ error: "Phone number and a yes/no answer are required" }, 400);
    }

    const screening = await kv.get(`user:${phone}:screening`);
    if (!screening) return c.json({ error: "No screening appointment found" }, 404);
    const now = new Date().toISOString();
    screening.completed = completed;
    screening.completedAt = completed ? now : null;
    // Self-reported answer from the home screen or completion prompt. Every answer is kept for the research record.
    screening.selfReportedAt = now;
    screening.selfReports = [...(screening.selfReports || []), { completed, at: now }];
    await kv.set(`user:${phone}:screening`, screening);
    
    console.log(`Screening completion updated for user: ${phone}, completed: ${completed}`);
    return c.json({ success: true, screening });
  } catch (err) {
    console.log(`Error updating screening completion: ${err}`);
    return c.json({ error: `Failed to update screening completion: ${err}` }, 500);
  }
});

// Get screening data
app.get("/make-server-bcdc6876/screening/:phone", async (c) => {
  try {
    const phone = c.req.param("phone");
    const screening = await kv.get(`user:${phone}:screening`);
    const reminders = await kv.get(`user:${phone}:reminders`);
    
    return c.json({ success: true, screening, reminders });
  } catch (err) {
    console.log(`Error fetching screening data: ${err}`);
    return c.json({ error: `Failed to fetch screening data: ${err}` }, 500);
  }
});

// ============ PUSH NOTIFICATION ROUTES ============

// Save push subscription
app.post("/make-server-bcdc6876/push-subscription", async (c) => {
  try {
    const { phone, subscription } = await c.req.json();
    
    if (!phone || !subscription) {
      return c.json({ error: "Phone and subscription are required" }, 400);
    }
    
    await kv.set(`user:${phone}:push-subscription`, subscription);
    
    console.log(`Push subscription saved for user: ${phone}`);
    return c.json({ success: true, message: "Subscription saved successfully" });
  } catch (err) {
    console.log(`Error saving push subscription: ${err}`);
    return c.json({ error: `Failed to save subscription: ${err}` }, 500);
  }
});

// Get push subscription
app.get("/make-server-bcdc6876/push-subscription/:phone", async (c) => {
  try {
    const phone = c.req.param("phone");
    const subscription = await kv.get(`user:${phone}:push-subscription`);
    
    return c.json({ success: true, subscription });
  } catch (err) {
    console.log(`Error fetching push subscription: ${err}`);
    return c.json({ error: `Failed to fetch subscription: ${err}` }, 500);
  }
});

async function deliver(subscription:any, payload:any) {
 const publicKey=Deno.env.get('VAPID_PUBLIC_KEY'),privateKey=Deno.env.get('VAPID_PRIVATE_KEY'),subject=Deno.env.get('VAPID_SUBJECT');
 if(!publicKey||!privateKey||!subject)throw new Error('Push delivery is not configured');
 webpush.setVapidDetails(subject,publicKey,privateKey);
 await webpush.sendNotification(subscription,JSON.stringify(payload));
}
app.post('/make-server-bcdc6876/reminders/run',async(c)=>{
 const records=await kv.getByPrefix('user:');let accepted=0,failed=0;
 const today=lagosDate();
 for(const profile of records.filter((r:any)=>r.phone&&r.registeredAt)) {
 const phone=profile.phone, screening=await kv.get(`user:${phone}:screening`);
 if(!screening?.reminder||screening.completed)continue;
 const days=Math.round((Date.parse(screening.date)-Date.parse(today))/86400000);
 if(![0,1,2].includes(days))continue;
 const key=`user:${phone}:reminder-delivery:${screening.date}:${days}`;
 if(await kv.get(key))continue;
 const subscription=await kv.get(`user:${phone}:push-subscription`);if(!subscription)continue;
 const yo=profile.language==='yo';
 try{await deliver(subscription,{title:yo?'Ìránnilétí àyẹ̀wò':'Screening reminder',body:yo?`Ọjọ́ àyẹ̀wò rẹ ni ${screening.date}. Kàn sí ilé ìwòsàn fún àkókò.`:`Your screening date is ${screening.date}. Contact the clinic to confirm the time.`,tag:`screening-${screening.date}-${days}`,data:{url:'/'}});await kv.set(key,{acceptedAt:new Date().toISOString()});accepted++;}catch{failed++;}
 }
 return c.json({accepted,failed});
});

// Send push notification
app.post("/make-server-bcdc6876/push/send", async (c) => {
  try {
    const { phone, title, body, data } = await c.req.json();
    
    if (!phone || !title || !body) {
      return c.json({ error: "Phone, title, and body are required" }, 400);
    }

    const subscription = await kv.get(`user:${phone}:push-subscription`);
    if (!subscription) {
      return c.json({ error: "No push subscription found for this user" }, 404);
    }

    await deliver(subscription,{title,body,data});
    // Store notification log
    const notificationLog = {
      phone,
      title,
      body,
      data: data || {},
      sentAt: new Date().toISOString(),
      status: "accepted_by_push_service"
    };
    
    const logs = await kv.get(`user:${phone}:notification-logs`) || [];
    logs.push(notificationLog);
    await kv.set(`user:${phone}:notification-logs`, logs);

    console.log(`Push notification sent to user: ${phone}`);
    return c.json({ success: true, notification: notificationLog });
  } catch (err) {
    console.log(`Error sending push notification: ${err}`);
    return c.json({ error: `Failed to send notification: ${err}` }, 500);
  }
});

// ============ MODULES COMPLETION ROUTE ============

// Mark modules as completed
app.post("/make-server-bcdc6876/modules/complete", async (c) => {
  try {
    const { phone, engagement } = await c.req.json();
    if (!phone) {
      return c.json({ error: "Phone number is required" }, 400);
    }

    const progress: any = await kv.get(`user:${phone}:progress`) || {
      baselineCompleted: false,
      modulesCompleted: false,
      endlineCompleted: false,
    };
    if (!progress.baselineCompleted) return c.json({error:'Complete baseline first'},403);
    await kv.set(`user:${phone}:engagement`, {slideMilliseconds:engagement, recordedAt:new Date().toISOString()});
    progress.modulesCompleted = true;
    progress.modulesCompletedAt = new Date().toISOString();
    await kv.set(`user:${phone}:progress`, progress);

    console.log(`Modules marked as completed for user: ${phone}`);
    return c.json({ success: true, progress });
  } catch (err) {
    console.log(`Error marking modules complete: ${err}`);
    return c.json({ error: `Failed to update modules progress: ${err}` }, 500);
  }
});

// ============ ADMIN/RESEARCH ROUTES ============

// Get all registered users (for research data collection)
app.get("/make-server-bcdc6876/admin/users", async (c) => {
  try {
    const allData = await kv.getByPrefix("user:");
    
    // Organize data by user
    const users = {};
    
    for (const entry of allData) {
      // Extract phone from key pattern: user:{phone}:type
      const keyParts = entry.key.split(':');
      if (keyParts.length >= 3) {
        const phone = keyParts[1];
        const dataType = keyParts[2];
        
        if (!users[phone]) {
          users[phone] = {};
        }
        
        users[phone][dataType] = entry.value;
      }
    }
    
    return c.json({ success: true, users, totalUsers: Object.keys(users).length });
  } catch (err) {
    console.log(`Error fetching all users: ${err}`);
    return c.json({ error: `Failed to fetch users: ${err}` }, 500);
  }
});

// Get all assessment data
app.get("/make-server-bcdc6876/admin/assessments", async (c) => {
  try {
    const assessments = await kv.getByPrefix("user::assessment:");
    
    const organizedAssessments = {
      baseline: [],
      endline: []
    };
    
    for (const entry of assessments) {
      const keyParts = entry.key.split(':');
      if (keyParts.length >= 4) {
        const phone = keyParts[2];
        const type = keyParts[3];
        
        organizedAssessments[type].push({
          phone,
          type,
          ...entry.value
        });
      }
    }
    
    return c.json({ success: true, assessments: organizedAssessments });
  } catch (err) {
    console.log(`Error fetching assessments: ${err}`);
    return c.json({ error: `Failed to fetch assessments: ${err}` }, 500);
  }
});

// Get all screening data
app.get("/make-server-bcdc6876/admin/screenings", async (c) => {
  try {
    const screenings = await kv.getByPrefix("user::screening");
    const reminders = await kv.getByPrefix("user::reminders");
    
    const organizedScreenings = [];
    
    for (const entry of screenings) {
      const keyParts = entry.key.split(':');
      if (keyParts.length >= 3) {
        const phone = keyParts[2];
        
        organizedScreenings.push({
          phone,
          ...entry.value
        });
      }
    }
    
    return c.json({ success: true, screenings: organizedScreenings });
  } catch (err) {
    console.log(`Error fetching screenings: ${err}`);
    return c.json({ error: `Failed to fetch screenings: ${err}` }, 500);
  }
});

// Get all push notification data
app.get("/make-server-bcdc6876/admin/notifications", async (c) => {
  try {
    const subscriptions = await kv.getByPrefix("user::push-subscription");
    const logs = await kv.getByPrefix("user::notification-logs");
    
    const organizedData = {
      subscriptions: [],
      logs: []
    };
    
    for (const entry of subscriptions) {
      const keyParts = entry.key.split(':');
      if (keyParts.length >= 3) {
        const phone = keyParts[2];
        
        organizedData.subscriptions.push({
          phone,
          subscription: entry.value
        });
      }
    }
    
    for (const entry of logs) {
      const keyParts = entry.key.split(':');
      if (keyParts.length >= 3) {
        const phone = keyParts[2];
        
        organizedData.logs.push({
          phone,
          logs: entry.value
        });
      }
    }
    
    return c.json({ success: true, ...organizedData });
  } catch (err) {
    console.log(`Error fetching notification data: ${err}`);
    return c.json({ error: `Failed to fetch notification data: ${err}` }, 500);
  }
});

// Get complete data for a specific user
app.get("/make-server-bcdc6876/admin/user/:phone", async (c) => {
  try {
    const phone = c.req.param("phone");
    
    const userData = {
      profile: await kv.get(`user:${phone}:profile`),
      progress: await kv.get(`user:${phone}:progress`),
      screening: await kv.get(`user:${phone}:screening`),
      reminders: await kv.get(`user:${phone}:reminders`),
      baseline: await kv.get(`user:${phone}:assessment:baseline`),
      endline: await kv.get(`user:${phone}:assessment:endline`),
      pushSubscription: await kv.get(`user:${phone}:push-subscription`),
      notificationLogs: await kv.get(`user:${phone}:notification-logs`)
    };
    
    return c.json({ success: true, userData });
  } catch (err) {
    console.log(`Error fetching user data: ${err}`);
    return c.json({ error: `Failed to fetch user data: ${err}` }, 500);
  }
});

// Get analytics summary
app.get("/make-server-bcdc6876/admin/analytics", async (c) => {
  try {
    const allData = await kv.getByPrefix("user:");
    
    const analytics = {
      totalUsers: 0,
      baselineCompleted: 0,
      endlineCompleted: 0,
      modulesCompleted: 0,
      screeningsBooked: 0,
      screeningsCompleted: 0,
      pushSubscriptions: 0,
      totalNotifications: 0
    };
    
    const processedUsers = new Set();
    
    for (const entry of allData) {
      const keyParts = entry.key.split(':');
      if (keyParts.length >= 3) {
        const phone = keyParts[1];
        const dataType = keyParts[2];
        
        // Count unique users
        if (dataType === 'profile') {
          processedUsers.add(phone);
        }
        
        // Count completions
        if (dataType === 'progress') {
          if (entry.value.baselineCompleted) analytics.baselineCompleted++;
          if (entry.value.endlineCompleted) analytics.endlineCompleted++;
          if (entry.value.modulesCompleted) analytics.modulesCompleted++;
        }
        
        // Count screenings
        if (dataType === 'screening') {
          analytics.screeningsBooked++;
          if (entry.value.completed) analytics.screeningsCompleted++;
        }
        
        // Count push subscriptions
        if (dataType === 'push-subscription') {
          analytics.pushSubscriptions++;
        }
        
        // Count notifications
        if (dataType === 'notification-logs') {
          analytics.totalNotifications += entry.value.length;
        }
      }
    }
    
    analytics.totalUsers = processedUsers.size;
    
    return c.json({ success: true, analytics });
  } catch (err) {
    console.log(`Error fetching analytics: ${err}`);
    return c.json({ error: `Failed to fetch analytics: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);