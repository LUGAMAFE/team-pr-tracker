import { fetchData } from '../apiClient.js';
export async function fetchMembers() {
  return fetchData('/members/getAll');
}
export function addMember(newUser) {
  return fetchData('/members', 'POST', newUser);
}
export function deleteMember(email) {
  return fetchData('/members', 'DELETE', { email });
}
