import { projectId, publicAnonKey } from "/utils/supabase/info";

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bcdc6876`;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${publicAnonKey}`,
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
  return request("/screening", {
    method: "POST",
    body: JSON.stringify({ phone, ...data }),
  });
}

// Assessment
export async function saveAssessment(phone: string, type: "baseline" | "endline", score: number, total: number, answers: number[]) {
  return request("/assessment", {
    method: "POST",
    body: JSON.stringify({ phone, type, score, total, answers }),
  });
}

// Modules completion
export async function completeModules(phone: string) {
  return request("/modules/complete", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}