import { Link } from 'react-router-dom'
import { opportunities } from '../data/opportunities'
import OpportunityCard from './OpportunityCard'

function HomeOpportunities() {
  return (
    <section className="home-opportunities" aria-labelledby="home-opportunities-title">
      <div className="home-opportunities-heading">
        <div>
          <p className="eyebrow">Start exploring</p>
        </div>
        <div className="hero-actions">
            <a className="btn btn-dark hero-button" href="/opportunities">Explore opportunities <span aria-hidden="true">&#8594;</span></a>
        </div>
      </div>
      <div className="opportunity-grid">
        {opportunities.slice(0, 3).map((opportunity) => (
          <OpportunityCard key={opportunity.code} opportunity={opportunity} />
        ))}
      </div>
    </section>
  )
}

export default HomeOpportunities
