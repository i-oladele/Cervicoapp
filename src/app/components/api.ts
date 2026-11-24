import { projectId, publicAnonKey } from "../../../utils/supabase/info";

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bcdc6876`;
const LOCAL_BASE_URL = "http://localhost:3001/api";
const USE_LOCAL_API = false;
let sessionToken = "";
export function clearSession() { sessionToken = ""; }

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${publicAnonKey}`,
};

const localHeaders = {
  "Content-Type": "application/json",
};

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...headers, "X-Session-Token": sessionToken, ...(options.headers || {}) },
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401 && !path.startsWith("/auth/") && path !== "/recovery/generate") { clearSession(); window.dispatchEvent(new Event("session-expired")); }
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }
  if (data.sessionToken) sessionToken = data.sessionToken;
  return data;
}

async function localRequest(path: string, options: RequestInit = {}) {
  const res = await fetch(`${LOCAL_BASE_URL}${path}`, {
    ...options,
    headers: { ...localHeaders, ...(options.headers || {}) },
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(`Local API error at ${path}:`, data);
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }
  return data;
}

// Smart request function that uses local API in development, Supabase in production
async function smartRequest(path: string, options: RequestInit = {}) {
  if (USE_LOCAL_API) {
    return localRequest(path, options);
  } else {
    return request(path, options);
  }
}

// Auth
export async function registerUser(phone: string, city: string, pin: string, language: string, facility: string, participantCode: string, lga: string) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ phone, city, pin, language, facility, participantCode, lga }),
  });
}

export async function loginUser(phone: string, pin: string) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ phone, pin }),
  });
}

// User profile
export async function getUserData(phone: string) {
  return request(`/user/${encodeURIComponent(phone)}`);
}

// Screening
export async function saveScreening(phone: string, age: number, center: string, date: string, reminder: boolean) {
  return smartRequest("/screening", {
    method: "POST",
    body: JSON.stringify({ phone, age, center, date, reminder }),
  });
}

export async function getScreeningData(phone: string) {
  const result = await smartRequest(`/screening/${encodeURIComponent(phone)}`);
  return result.screening ?? null;
}

export async function updateScreeningCompletion(phone: string, completed: boolean) {
  return smartRequest("/screening/completed", {
    method: "POST",
    body: JSON.stringify({ phone, completed }),
  });
}

// Assessment
export async function saveAssessment(phone: string, type: "baseline" | "endline", score: number, total: number, answers: Record<string, unknown>, questionnaireVersion: string) {
  return request("/assessment", {
    method: "POST",
    body: JSON.stringify({ phone, type, score, total, answers, questionnaireVersion }),
  });
}

export async function getAssessment(phone: string, type: "baseline" | "endline") {
  return request(`/assessment/${encodeURIComponent(phone)}/${type}`);
}

// Modules completion
export async function completeModules(phone: string, engagement: Record<string,number>) {
  return request("/modules/complete", {
    method: "POST",
    body: JSON.stringify({ phone, engagement }),
  });
}

// Push Notifications
export async function savePushSubscription(phone: string, subscription: any) {
  return request("/push-subscription", {
    method: "POST",
    body: JSON.stringify({ phone, subscription }),
  });
}

export async function getPushSubscription(phone: string) {
  return request(`/push-subscription/${phone}`);
}

export async function sendPushNotification(phone: string, title: string, body: string, data?: any) {
  return request("/push/send", {
    method: "POST",
    body: JSON.stringify({ phone, title, body, data }),
  });
}

// Admin/Data Access
export async function getAllUsers() {
  return request("/admin/users");
}

export async function getAllAssessments() {
  return request("/admin/assessments");
}

export async function getAllScreenings() {
  return request("/admin/screenings");
}

export async function getAllNotifications() {
  return request("/admin/notifications");
}

export async function getUserDataAdmin(phone: string) {
  return request(`/admin/user/${phone}`);
}

export async function getAnalytics() {
  return request("/admin/analytics");
}
export async function resetPin(phone:string,code:string,pin:string){return request('/auth/recovery/reset',{method:'POST',body:JSON.stringify({phone,code,pin})});}

export async function disablePush(phone:string){return request('/push-subscription/disable',{method:'POST',body:JSON.stringify({phone})});}

export async function generateRecoveryCode(phone:string,pin:string){return request('/recovery/generate',{method:'POST',body:JSON.stringify({phone,pin})});}
