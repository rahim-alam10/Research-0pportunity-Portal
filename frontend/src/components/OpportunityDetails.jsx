import { Link, useParams } from 'react-router-dom'
import { opportunities } from '../data/opportunities'

function formatDeadline(deadline) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${deadline}T00:00:00`))
}

function OpportunityDetails() {
  const { code } = useParams()
  const opportunity = opportunities.find((item) => item.code === code)

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
          <button className="btn btn-dark hero-button detail-apply-button" type="button">Apply for this opportunity <span aria-hidden="true">&#8594;</span></button>
        </aside>
      </div>
    </main>
  )
}

export default OpportunityDetails