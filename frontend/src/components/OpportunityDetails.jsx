import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteOpportunity, getOpportunity, updateOpportunityStatus } from '../data/api'

function formatDeadline(deadline) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${deadline}T00:00:00`))
}

function OpportunityDetails() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [opportunity, setOpportunity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    getOpportunity(code)
      .then(setOpportunity)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [code])

  async function handleClose() {
    setBusy(true)
    setError('')
    try {
      setOpportunity(await updateOpportunityStatus(code, 'Closed'))
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete this research opportunity?')) return

    setBusy(true)
    setError('')
    try {
      await deleteOpportunity(code)
      navigate('/opportunities')
    } catch (requestError) {
      setError(requestError.message)
      setBusy(false)
    }
  }

  if (loading) {
    return <main className="opportunity-detail-page"><p className="eyebrow">Loading opportunity...</p></main>
  }

  if (!opportunity) {
    return (
      <main className="opportunity-detail-page">
        <p className="eyebrow">Opportunity not found</p>
        <h1>That research brief is no longer available.</h1>
        <Link className="text-link" to="/opportunities">Back to opportunities <span aria-hidden="true">&#8594;</span></Link>
      </main>
    )
  }

  return (
    <main className={`opportunity-detail-page ${opportunity.tone}`}>
      <div className="opportunity-detail-topline">
        <Link className="back-link" to="/opportunities">&#8592; All opportunities</Link>
        <span>{opportunity.code} / {opportunity.status}</span>
      </div>

      <header className="opportunity-detail-heading">
        <div>
          <p className="eyebrow">{opportunity.researchArea}</p>
          <h1>{opportunity.title}</h1>
        </div>
        <p className="detail-department">{opportunity.department}</p>
      </header>

      <div className="opportunity-detail-layout">
        <section className="detail-description" aria-labelledby="description-title">
          <p className="detail-label" id="description-title">Research description</p>
          <p>{opportunity.description}</p>
        </section>

        <aside className="detail-sidebar" aria-label="Opportunity information">
          <div className="detail-group">
            <p className="detail-label">Faculty member&apos;s name</p>
            <p className="detail-value">{opportunity.supervisor}</p>
          </div>
          <div className="detail-group">
            <p className="detail-label">Department</p>
            <p className="detail-value">{opportunity.department}</p>
          </div>
          <div className="detail-group">
            <p className="detail-label">Required skills</p>
            <p className="detail-value">{opportunity.requiredSkills}</p>
          </div>
          <div className="detail-stats">
            <div className="detail-group">
              <p className="detail-label">Available positions</p>
              <p className="detail-stat">{opportunity.positions}</p>
            </div>
            <div className="detail-group">
              <p className="detail-label">Application deadline</p>
              <p className="detail-value">{formatDeadline(opportunity.deadline)}</p>
            </div>
          </div>
          <div className="detail-actions">
            <Link className="btn btn-dark hero-button" to={`/add-opportunity/${opportunity.code}`}>Edit opportunity <span aria-hidden="true">&#8594;</span></Link>
            {opportunity.status === 'Open' && <button className="btn btn-outline-dark hero-button" disabled={busy} onClick={handleClose} type="button">Close opportunity</button>}
            <button className="btn btn-outline-danger hero-button" disabled={busy} onClick={handleDelete} type="button">Delete opportunity</button>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
        </aside>
      </div>
    </main>
  )
}

export default OpportunityDetails