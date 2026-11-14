import type { LoginRole } from "./RoleSelect";

/**
 * Front-end-only session placeholder (kept in localStorage so it survives new tabs and refreshes).
 * There is no auth API in the Laravel backend yet, so sign-in just records who
 * signed in (email + role) in this browser. Replace with a real call to the
 * backend (e.g. Laravel Sanctum) once it exists.
 */
const KEY = "lincoln.session";

export interface Session {
  email: string;
  role: LoginRole;
  signedInAt: string;
}

/** Where each role lands after signing in. */
export const ROLE_HOME: Record<LoginRole, string> = {
  Admin: "/management",
  Agent: "/agent-portal",
  User: "/finance",
  Security: "/management",
};

export function saveSession(session: Session) {
  try {
    localStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    /* storage unavailable (private mode) — sign-in still proceeds */
  }
}

export function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
