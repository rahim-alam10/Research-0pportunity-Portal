import cors from 'cors'
import express from 'express'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = process.env.PORT || 3000
const dataFile = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'data',
  'opportunities.json',
)

const requiredFields = ['title', 'department', 'description', 'supervisor', 'duration']

app.use(cors())
app.use(express.json())

async function readOpportunities() {
  return JSON.parse(await fs.readFile(dataFile, 'utf8'))
}

async function writeOpportunities(opportunities) {
  await fs.writeFile(dataFile, `${JSON.stringify(opportunities, null, 2)}\n`)
}

function validateOpportunity(payload) {
  const missingFields = requiredFields.filter(
    (field) => typeof payload[field] !== 'string' || payload[field].trim() === '',
  )

  if (missingFields.length) {
    return `Missing or empty fields: ${missingFields.join(', ')}`
  }

  if (payload.status !== undefined && !['Open', 'Closed'].includes(payload.status)) {
    return 'Status must be either Open or Closed'
  }

  return null
}

function nextId(opportunities) {
  const highestId = opportunities.reduce((highest, opportunity) => {
    const number = Number(opportunity.id.replace('RO-', ''))
    return Number.isNaN(number) ? highest : Math.max(highest, number)
  }, 0)

  return `RO-${String(highestId + 1).padStart(3, '0')}`
}

function notFound(response) {
  return response.status(404).json({ error: 'Opportunity not found' })
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/opportunities', async (_request, response, next) => {
  try {
    const data = await readOpportunities()
    response.json({ count: data.length, data })
  } catch (error) {
    next(error)
  }
})

app.get('/api/opportunities/:id', async (request, response, next) => {
  try {
    const data = await readOpportunities()
    const opportunity = data.find((item) => item.id === request.params.id)
    if (!opportunity) return notFound(response)
    response.json({ data: opportunity })
  } catch (error) {
    next(error)
  }
})

app.post('/api/opportunities', async (request, response, next) => {
  try {
    const validationError = validateOpportunity(request.body)
    if (validationError) return response.status(400).json({ error: validationError })

    const data = await readOpportunities()
    const opportunity = {
      id: nextId(data),
      title: request.body.title.trim(),
      department: request.body.department.trim(),
      description: request.body.description.trim(),
      supervisor: request.body.supervisor.trim(),
      duration: request.body.duration.trim(),
      status: request.body.status || 'Open',
    }

    data.push(opportunity)
    await writeOpportunities(data)
    response.status(201).json({ data: opportunity })
  } catch (error) {
    next(error)
  }
})

app.put('/api/opportunities/:id', async (request, response, next) => {
  try {
    const validationError = validateOpportunity(request.body)
    if (validationError) return response.status(400).json({ error: validationError })

    const data = await readOpportunities()
    const index = data.findIndex((item) => item.id === request.params.id)
    if (index === -1) return notFound(response)

    const opportunity = {
      id: request.params.id,
      title: request.body.title.trim(),
      department: request.body.department.trim(),
      description: request.body.description.trim(),
      supervisor: request.body.supervisor.trim(),
      duration: request.body.duration.trim(),
      status: request.body.status || 'Open',
    }

    data[index] = opportunity
    await writeOpportunities(data)
    response.json({ data: opportunity })
  } catch (error) {
    next(error)
  }
})

app.patch('/api/opportunities/:id/status', async (request, response, next) => {
  try {
    if (!['Open', 'Closed'].includes(request.body.status)) {
      return response.status(400).json({ error: 'Status must be either Open or Closed' })
    }

    const data = await readOpportunities()
    const opportunity = data.find((item) => item.id === request.params.id)
    if (!opportunity) return notFound(response)

    opportunity.status = request.body.status
    await writeOpportunities(data)
    response.json({ data: opportunity })
  } catch (error) {
    next(error)
  }
})

app.delete('/api/opportunities/:id', async (request, response, next) => {
  try {
    const data = await readOpportunities()
    const remaining = data.filter((item) => item.id !== request.params.id)
    if (remaining.length === data.length) return notFound(response)

    await writeOpportunities(remaining)
    response.status(204).send()
  } catch (error) {
    next(error)
  }
})

app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
})

app.listen(port, () => {
  console.log(`Research Opportunity API running at http://localhost:${port}`)
})
