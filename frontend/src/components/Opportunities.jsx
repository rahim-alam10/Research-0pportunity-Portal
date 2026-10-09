import { useEffect, useState } from 'react'
import { getOpportunities } from '../data/api'
import OpportunityCard from './OpportunityCard'

function Opportunities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getOpportunities()
      .then(setItems)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="opportunities-section" id="opportunities">
      <div className="opportunities-heading">
        <div>
          <p className="eyebrow">Available now</p>
        </div>
        <p className="section-note">Browse open research opportunities and find a project that matches your curiosity.</p>
      </div>

      {loading && <p className="form-success" role="status">Loading opportunities...</p>}
      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="opportunity-grid">
        {items.map((opportunity) => (
          <OpportunityCard key={opportunity.code} opportunity={opportunity} />
        ))}
      </div>
    </section>
  )
}

export default Opportunities
