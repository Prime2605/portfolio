const API_BASE = import.meta.env.VITE_API_URL || '/api'

// Generic fetch wrapper with error handling
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Network error' }))
    throw new Error(error.message || `API Error: ${res.status}`)
  }
  return res.json()
}

// Portfolio data endpoints
export const api = {
  // Get all profile data
  getProfile: () => apiFetch('/profile'),
  
  // Get all projects
  getProjects: () => apiFetch('/projects'),
  
  // Get all skills
  getSkills: () => apiFetch('/skills'),
  
  // Get education
  getEducation: () => apiFetch('/education'),
  
  // Get experience
  getExperience: () => apiFetch('/experience'),
  
  // Get social links
  getSocials: () => apiFetch('/socials'),
  
  // Send contact message
  sendMessage: (data) => apiFetch('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Get all portfolio data at once
  getAll: () => apiFetch('/portfolio'),
}
