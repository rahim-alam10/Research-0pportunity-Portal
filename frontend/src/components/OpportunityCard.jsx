import { Link } from 'react-router-dom'

function OpportunityCard({ opportunity }) {
  return (
    <article className={`opportunity-card ${opportunity.tone}`}>
      <div className="opportunity-topline">
        <span>{opportunity.code}</span>
        <span className="open-status"><i /> {opportunity.status}</span>
      </div>
      <p className="opportunity-department">{opportunity.department}</p>
      <h3>{opportunity.title}</h3>
      <p className="opportunity-description">{opportunity.description}</p>
      <div className="opportunity-details">
        <span>Supervisor<strong>{opportunity.supervisor}</strong></span>
        <span>Duration<strong>{opportunity.duration}</strong></span>
      </div>
      <Link className="opportunity-link" to={`/opportunities/${opportunity.code}`}>
        View opportunity <span aria-hidden="true">&#8594;</span>
      </Link>
    </article>
  )
}

export default OpportunityCard
