import { projectId, publicAnonKey } from "/utils/supabase/info";

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
export async function saveScreening(phone: string, data: { age: string; center: string; date: string; reminder: boolean }) {
  return localRequest("/screening", {
    method: "POST",
    body: JSON.stringify({ phone, ...data }),
  });
}

export async function getScreening(phone: string) {
  return localRequest(`/screening/${encodeURIComponent(phone)}`);
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

// Notifications
export async function saveNotification(phone: string, notification: { message: string; type: string }) {
  return localRequest("/notifications", {
    method: "POST",
    body: JSON.stringify({ phone, notification }),
  });
}

export async function getUserNotifications(phone: string) {
  return localRequest(`/notifications/${encodeURIComponent(phone)}`);
}

export async function markNotificationRead(phone: string, notificationId: string) {
  return localRequest(`/notifications/${encodeURIComponent(phone)}/${notificationId}/read`, {
    method: "PUT",
  });
}

// Screening Reminders
export async function createScreeningReminder(phone: string, screeningDate: string) {
  return localRequest("/screening-reminders", {
    method: "POST",
    body: JSON.stringify({ phone, screeningDate }),
  });
}

export async function getScreeningReminders(phone: string) {
  return localRequest(`/screening-reminders/${encodeURIComponent(phone)}`);
}

// Push Notifications
export async function savePushSubscription(phone: string, subscription: any) {
  return localRequest("/push-subscription", {
    method: "POST",
    body: JSON.stringify({ phone, subscription }),
  });
}

export async function sendPushNotification(message: string, title: string, subscription: any) {
  return localRequest("/send-test-notification", {
    method: "POST",
    body: JSON.stringify({ message, title, subscription }),
  });
}

export async function triggerReminderCheck() {
  return localRequest("/check-reminders", {
    method: "POST",
    body: JSON.stringify({}),
  });
}