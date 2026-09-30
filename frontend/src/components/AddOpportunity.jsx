import { useState } from 'react'

const initialForm = {
  researchTitle: '',
  researchDescription: '',
  researchArea: '',
  facultyMember: '',
  department: '',
  requiredSkills: '',
  positions: '',
  deadline: '',
}

function AddOpportunity() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setSubmitted(false)
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="add-opportunity-page">
      <div className="add-opportunity-heading">
        <p className="eyebrow">Create an opportunity</p>
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
        </div>

        <div className="form-actions">
          <button className="btn btn-dark hero-button" type="submit">Publish opportunity <span aria-hidden="true">&#8594;</span></button>
          {submitted && <p className="form-success" role="status">Opportunity details are ready to publish.</p>}
        </div>
      </form>
    </main>
  )
}

export default AddOpportunity
