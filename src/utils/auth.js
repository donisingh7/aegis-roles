// src/utils/auth.js
export function isLoggedIn() {
  return Boolean(localStorage.getItem('loggedInUser'));
}

export function getUserType() {
  const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  return user?.userType;  // e.g. "player_user"
}
export function getUserId() {
  const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  return user?.userid;  // e.g. "21456789"
}