// src/auth.js
export function saveAuth({ token, user, remember }) {
  // token = optional auth token string
  // user = object with user_id and userName (or username / first_name)
  const store = remember ? localStorage : sessionStorage;
  if (token) store.setItem("authToken", token);
  if (user?.user_id) store.setItem("user_id", String(user.user_id));
  if (user?.userName) store.setItem("userName", user.userName);
  else if (user?.first_name || user?.last_name) {
    const n = [user.first_name, user.middle_name, user.last_name].filter(Boolean).join(" ");
    if (n) store.setItem("userName", n);
  } else if (user?.username) store.setItem("userName", user.username);
}

export function clearAuth() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user_id");
  localStorage.removeItem("userName");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("user_id");
  sessionStorage.removeItem("userName");
}

export function getAuthValue(key) {
  return localStorage.getItem(key) || sessionStorage.getItem(key) || null;
}

export function isSignedIn() {
  return Boolean(getAuthValue("authToken") || getAuthValue("user_id"));
}
