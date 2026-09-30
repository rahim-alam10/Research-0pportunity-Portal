import { opportunities as seedOpportunities } from './opportunities'

const API_BASE = 'http://localhost:3000/api'
const tones = ['coral', 'mint', 'sun', 'lavender']

function normalizeOpportunity(item, index = 0) {
  return {
    ...item,
    code: item.code || item.id,
    tone: item.tone || tones[index % tones.length],
    researchArea: item.researchArea || item.department,
    requiredSkills: item.requiredSkills || 'Not specified',
    positions: item.positions || 1,
    deadline: item.deadline || '',
  }
}

async function request(path, options) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || 'The request could not be completed.')
  }

  return response.status === 204 ? null : response.json()
}

export async function getOpportunities() {
  const result = await request('/opportunities')
  return result.data.map(normalizeOpportunity)
}

export async function getOpportunity(code) {
  const result = await request(`/opportunities/${code}`)
  return normalizeOpportunity(result.data)
}

export async function createOpportunity(payload) {
  const result = await request('/opportunities', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return normalizeOpportunity(result.data)
}

export async function updateOpportunity(code, payload) {
  const result = await request(`/opportunities/${code}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
  return normalizeOpportunity(result.data)
}

export async function updateOpportunityStatus(code, status) {
  const result = await request(`/opportunities/${code}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
  return normalizeOpportunity(result.data)
}

export async function deleteOpportunity(code) {
  await request(`/opportunities/${code}`, { method: 'DELETE' })
}

export function getSeedOpportunity(code) {
  return seedOpportunities.find((opportunity) => opportunity.code === code)
}
