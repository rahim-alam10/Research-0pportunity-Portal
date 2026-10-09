import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createOpportunity, getOpportunity, updateOpportunity } from '../data/api'

const initialForm = {
  researchTitle: '',
  researchDescription: '',
  researchArea: '',
  facultyMember: '',
  department: '',
  requiredSkills: '',
  positions: '',
  deadline: '',
  duration: '',
  status: 'Open',
}

function AddOpportunity() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!code) return

    getOpportunity(code).then((opportunity) => setForm({
      researchTitle: opportunity.title,
      researchDescription: opportunity.description,
      researchArea: opportunity.researchArea,
      facultyMember: opportunity.supervisor,
      department: opportunity.department,
      requiredSkills: opportunity.requiredSkills,
      positions: opportunity.positions,
      deadline: opportunity.deadline,
      duration: opportunity.duration,
      status: opportunity.status,
    })).catch(() => {})
  }, [code])

  function handleChange(event) {
    const { name, value } = event.target
    setSubmitted(false)
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    const payload = {
      title: form.researchTitle,
      description: form.researchDescription,
      department: form.department,
      supervisor: form.facultyMember,
      duration: form.duration || 'To be confirmed',
      researchArea: form.researchArea,
      requiredSkills: form.requiredSkills,
      positionsAvailable: Number(form.positions),
      deadline: form.deadline,
      status: form.status,
    }

    const save = code ? updateOpportunity(code, payload) : createOpportunity(payload)
    save.then(() => {
      setSubmitted(true)
      setTimeout(() => navigate(code ? `/opportunities/${code}` : '/opportunities'), 500)
    }).catch((requestError) => setError(requestError.message))
  }

  return (
    <main className="add-opportunity-page">
      <div className="add-opportunity-heading">
        <p className="eyebrow">{code ? 'Update an opportunity' : 'Create an opportunity'}</p>
      </div>

      <form className="opportunity-form" onSubmit={handleSubmit}>
        <div className="form-section-label">01 / Research brief</div>
        <div className="form-grid form-grid-wide">
          <label className="form-field form-field-wide">
            Research title
            <input name="researchTitle" value={form.researchTitle} onChange={handleChange} required />
          </label>
          <label className="form-field form-field-wide">
            Research description
            <textarea name="researchDescription" value={form.researchDescription} onChange={handleChange} rows="5" required />
          </label>
          <label className="form-field">
            Research area
            <input name="researchArea" value={form.researchArea} onChange={handleChange} required />
          </label>
          <label className="form-field">
            Department
            <input name="department" value={form.department} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-section-label">02 / Supervision</div>
        <div className="form-grid">
          <label className="form-field">
            Faculty member&apos;s name
            <input name="facultyMember" value={form.facultyMember} onChange={handleChange} required />
          </label>
          <label className="form-field">
            Required skills
            <input name="requiredSkills" value={form.requiredSkills} onChange={handleChange} placeholder="e.g. Python, interviews, GIS" required />
          </label>
        </div>

        <div className="form-section-label">03 / Availability</div>
        <div className="form-grid">
          <label className="form-field">
            Number of available positions
            <input type="number" min="1" name="positions" value={form.positions} onChange={handleChange} required />
          </label>
          <label className="form-field">
            Application deadline
            <input type="date" name="deadline" value={form.deadline} onChange={handleChange} required />
          </label>
          <label className="form-field">
            Status
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </label>
          <label className="form-field">
            Duration
            <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 8 weeks" required />
          </label>
        </div>

        <div className="form-actions">
          <button className="btn btn-dark hero-button" type="submit">{code ? 'Save changes' : 'Publish opportunity'} <span aria-hidden="true">&#8594;</span></button>
          {submitted && <p className="form-success" role="status">Opportunity details are ready to publish.</p>}
          {error && <p className="form-error" role="alert">{error}</p>}
        </div>
      </form>
    </main>
  )
}

export default AddOpportunity
