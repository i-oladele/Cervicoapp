import { projectId, publicAnonKey } from "../../../utils/supabase/info";

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bcdc6876`;
const LOCAL_BASE_URL = "http://localhost:3001/api";

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
    headers: { ...headers, ...(options.headers || {}) },
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(`API error at ${path}:`, data);
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }
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

// Auth
export async function registerUser(phone: string, city: string, pin: string, language: string) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ phone, city, pin, language }),
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
  return request("/screening", {
    method: "POST",
    body: JSON.stringify({ phone, age, center, date, reminder }),
  });
}

export async function getScreeningData(phone: string) {
  return request(`/screening/${phone}`);
}

export async function updateScreeningCompletion(phone: string, completed: boolean) {
  return request("/screening/completed", {
    method: "POST",
    body: JSON.stringify({ phone, completed }),
  });
}

// Assessment
export async function saveAssessment(phone: string, type: "baseline" | "endline", score: number, total: number, answers: number[]) {
  return request("/assessment", {
    method: "POST",
    body: JSON.stringify({ phone, type, score, total, answers }),
  });
}

export async function getAssessment(phone: string, type: "baseline" | "endline") {
  return request(`/assessment/${encodeURIComponent(phone)}/${type}`);
}

// Modules completion
export async function completeModules(phone: string) {
  return request("/modules/complete", {
    method: "POST",
    body: JSON.stringify({ phone }),
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