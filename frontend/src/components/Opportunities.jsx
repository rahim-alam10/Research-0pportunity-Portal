import { opportunities } from '../data/opportunities'
import OpportunityCard from './OpportunityCard'

function Opportunities() {
  return (
    <section className="opportunities-section" id="opportunities">
      <div className="opportunities-heading">
        <div>
          <p className="eyebrow">Available now</p>
        </div>
        <p className="section-note">Browse open research opportunities and find a project that matches your curiosity.</p>
      </div>

      <div className="opportunity-grid">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.code} opportunity={opportunity} />
        ))}
      </div>
    </section>
  )
}

export default Opportunities
