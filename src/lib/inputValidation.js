// Client-side validation — improves UX, but is NEVER a security boundary by itself.
// Real validation must also happen server-side (see backend section below),
// since anyone can bypass frontend JS entirely.

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateName(name) {
  return name.trim().length >= 2 && name.trim().length <= 100;
}

export function validateMessage(message) {
  return message.trim().length >= 10 && message.trim().length <= 2000;
}

// Strips HTML tags from user input before it's ever rendered or sent —
// prevents basic XSS payloads from being stored/displayed as-is
export function sanitizeInput(str) {
  return str.replace(/<[^>]*>/g, "").trim();
}

export function validateContactForm({ name, email, message }) {
  const errors = {};
  if (!validateName(name)) errors.name = "Name must be 2-100 characters.";
  if (!validateEmail(email)) errors.email = "Enter a valid email address.";
  if (!validateMessage(message))
    errors.message = "Message must be 10-2000 characters.";
  return { valid: Object.keys(errors).length === 0, errors };
}
