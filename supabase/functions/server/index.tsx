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
    const users = await kv.getByPrefix("user:");
    // Filter to only profile entries
    const profiles = [];
    const allData = await kv.getByPrefix("user:");
    
    // We need key-value pairs, so let's get profiles specifically
    // getByPrefix returns values only, so we get all user profiles
    const profileKeys: string[] = [];
    
    // Get all KV entries that are profiles
    const allProfiles = await kv.getByPrefix("user:");
    
    // Since getByPrefix only returns values, we'll collect all user data
    return c.json({ success: true, data: allProfiles });
  } catch (err) {
    console.log(`Error fetching all users: ${err}`);
    return c.json({ error: `Failed to fetch users: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);