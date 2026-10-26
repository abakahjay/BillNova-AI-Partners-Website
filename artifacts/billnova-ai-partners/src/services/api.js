const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/contact';

export const contactService = {
  async submit(payload) {
    const endpoint = CONTACT_ENDPOINT.startsWith('http')
      ? CONTACT_ENDPOINT
      : `${API_BASE_URL}${CONTACT_ENDPOINT}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // The enquiry form is anonymous, so no cookies: the shared backend only allows credentialed
      // requests from its listed frontends, and browsers would block this one in production.
      credentials: 'omit',
      body: JSON.stringify(payload),
    });
    let body = null;
    try { body = await response.json(); } catch { /* Empty response is valid only on success. */ }
    if (!response.ok) throw new Error(body?.message || 'Unable to submit enquiry.');
    return body;
  },
};