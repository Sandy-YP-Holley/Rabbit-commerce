const USERS_KEY = "rc_users";
const SESSION_KEY = "rc_session";

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function findUserByEmail(email) {
  const normalized = email.trim().toLowerCase();
  return getUsers().find((u) => u.email.toLowerCase() === normalized);
}

export function registerUser({ name, email, password }) {
  if (findUserByEmail(email)) {
    return { success: false, error: "An account with this email already exists." };
  }

  const user = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
  };

  const users = getUsers();
  users.push(user);
  saveUsers(users);

  return { success: true, user: { id: user.id, name: user.name, email: user.email } };
}

export function authenticateUser(email, password) {
  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return { success: false, error: "Incorrect email or password." };
  }

  return { success: true, user: { id: user.id, name: user.name, email: user.email } };
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(SESSION_KEY);
}
