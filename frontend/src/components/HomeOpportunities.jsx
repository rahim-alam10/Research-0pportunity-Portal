import { useEffect, useState } from 'react'
import { getOpportunities } from '../data/api'
import OpportunityCard from './OpportunityCard'

function HomeOpportunities() {
  const [opportunities, setOpportunities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getOpportunities()
      .then((items) => setOpportunities(items.slice(0, 3)))
      .catch((requestError) => setError(requestError.message))
  }, [])

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
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="opportunity-grid">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.code} opportunity={opportunity} />
        ))}
      </div>
    </section>
  )
}

export default HomeOpportunities
