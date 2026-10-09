const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const tones = ['coral', 'mint', 'sun', 'lavender']

function normalizeOpportunity(item, index = 0) {
  const department = item.department?.name || item.department || ''
  const supervisor = item.supervisor?.name || item.supervisor || ''
  const requiredSkills = Array.isArray(item.requiredSkills)
    ? item.requiredSkills.join(', ')
    : item.requiredSkills

  return {
    ...item,
    code: item.code || item.id,
    tone: item.tone || tones[index % tones.length],
    department,
    supervisor,
    researchArea: item.researchArea || department,
    requiredSkills: requiredSkills || 'Not specified',
    positions: item.positions || item.positionsAvailable || 1,
    deadline: item.deadline ? item.deadline.slice(0, 10) : '',
  }
}

async function request(path, options) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.message || body.error || 'The request could not be completed.')
  }

  return response.status === 204 ? null : response.json()
}

export async function getOpportunities() {
  const result = await request('/opportunities')
  return result.data.map(normalizeOpportunity)
}

export async function getOpportunity(id) {
  const result = await request(`/opportunities/${id}`)
  return normalizeOpportunity(result.data)
}

export async function createOpportunity(payload) {
  const result = await request('/opportunities', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return normalizeOpportunity(result.data)
}

export async function updateOpportunity(id, payload) {
  const result = await request(`/opportunities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
  return normalizeOpportunity(result.data)
}

export async function updateOpportunityStatus(id, status) {
  const result = await request(`/opportunities/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
  return normalizeOpportunity(result.data)
}

export async function deleteOpportunity(id) {
  await request(`/opportunities/${id}`, { method: 'DELETE' })
}