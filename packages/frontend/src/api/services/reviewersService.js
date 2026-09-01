import { fetchData } from '../apiClient.js';

export async function fetchReviewers() {
  return fetchData('/reviewers/getAll');
}
export function addReviewer(newUser) {
  return fetchData('/reviewers', 'POST', newUser);
}
export function deleteReviewer(email) {
  return fetchData('/reviewers', 'DELETE', { email });
}
