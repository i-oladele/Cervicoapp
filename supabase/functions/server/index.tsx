import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-bcdc6876/health", (c) => {
  return c.json({ status: "ok" });
});

// ============ AUTH ROUTES ============

// Register a new user
app.post("/make-server-bcdc6876/auth/register", async (c) => {
  try {
    const { phone, city, pin, language } = await c.req.json();

    if (!phone || !city || !pin) {
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
      city,
      language: language || "en",
      registeredAt: new Date().toISOString(),
    };
    await kv.set(`user:${phone}:profile`, profile);

    // Store PIN (simple storage for prototype)
    await kv.set(`user:${phone}:pin`, { pin });

    // Initialize progress
    await kv.set(`user:${phone}:progress`, {
      baselineCompleted: false,
      modulesCompleted: false,
      endlineCompleted: false,
    });

    console.log(`User registered successfully: ${phone}`);
    return c.json({ success: true, user: profile });
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

    // Check user exists
    const profile = await kv.get(`user:${phone}:profile`);
    if (!profile) {
      return c.json({ error: "No account found with this phone number" }, 404);
    }

    // Check PIN
    const storedPin = await kv.get(`user:${phone}:pin`);
    if (!storedPin || storedPin.pin !== pin) {
      return c.json({ error: "Incorrect PIN" }, 401);
    }

    // Fetch progress
    const progress = await kv.get(`user:${phone}:progress`) || {
      baselineCompleted: false,
      modulesCompleted: false,
      endlineCompleted: false,
    };

    console.log(`User logged in successfully: ${phone}`);
    return c.json({ success: true, user: profile, progress });
  } catch (err) {
    console.log(`Error during user login: ${err}`);
    return c.json({ error: `Login failed: ${err}` }, 500);
  }
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

// Save screening booking
app.post("/make-server-bcdc6876/screening", async (c) => {
  try {
    const { phone, age, center, date, reminder } = await c.req.json();

    if (!phone) {
      return c.json({ error: "Phone is required to save screening" }, 400);
    }

    const screeningData = {
      age,
      center,
      date,
      reminder,
      savedAt: new Date().toISOString(),
    };

    await kv.set(`user:${phone}:screening`, screeningData);

    console.log(`Screening saved for user: ${phone}`);
    return c.json({ success: true, screening: screeningData });
  } catch (err) {
    console.log(`Error saving screening data: ${err}`);
    return c.json({ error: `Failed to save screening: ${err}` }, 500);
  }
});

// ============ ASSESSMENT ROUTES ============

// Save assessment results
app.post("/make-server-bcdc6876/assessment", async (c) => {
  try {
    const { phone, type, score, total, answers } = await c.req.json();

    if (!phone || !type) {
      return c.json({ error: "Phone and assessment type are required" }, 400);
    }

    if (type !== "baseline" && type !== "endline") {
      return c.json({ error: "Assessment type must be 'baseline' or 'endline'" }, 400);
    }

    const assessmentData = {
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
    } else {
      progress.endlineCompleted = true;
    }
    await kv.set(`user:${phone}:progress`, progress);

    console.log(`Assessment (${type}) saved for user: ${phone}, score: ${score}/${total}`);
    return c.json({ success: true, assessment: assessmentData, progress });
  } catch (err) {
    console.log(`Error saving assessment data: ${err}`);
    return c.json({ error: `Failed to save assessment: ${err}` }, 500);
  }
});

// ============ SCREENING ROUTES ============

// Save screening appointment
app.post("/make-server-bcdc6876/screening", async (c) => {
  try {
    const { phone, age, center, date, reminder } = await c.req.json();
    
    if (!phone || !age || !center || !date) {
      return c.json({ error: "Phone, age, center, and date are required" }, 400);
    }

    const screeningData = {
      age,
      center,
      date,
      reminder: reminder || false,
      completed: false,
      completedAt: null,
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
    
    if (!phone) {
      return c.json({ error: "Phone number is required" }, 400);
    }

    const screening = await kv.get(`user:${phone}:screening`);
    if (screening) {
      screening.completed = completed;
      screening.completedAt = completed ? new Date().toISOString() : null;
      await kv.set(`user:${phone}:screening`, screening);
    }
    
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

    // Store notification log
    const notificationLog = {
      phone,
      title,
      body,
      data: data || {},
      sentAt: new Date().toISOString(),
      status: "sent"
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
    const { phone } = await c.req.json();
    if (!phone) {
      return c.json({ error: "Phone number is required" }, 400);
    }

    const progress: any = await kv.get(`user:${phone}:progress`) || {
      baselineCompleted: false,
      modulesCompleted: false,
      endlineCompleted: false,
    };
    progress.modulesCompleted = true;
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