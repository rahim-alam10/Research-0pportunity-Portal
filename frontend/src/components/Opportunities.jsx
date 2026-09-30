import { useEffect, useState } from 'react'
import { opportunities } from '../data/opportunities'
import { getOpportunities } from '../data/api'
import OpportunityCard from './OpportunityCard'

function Opportunities() {
  const [items, setItems] = useState(opportunities)
  const [error, setError] = useState('')

  useEffect(() => {
    getOpportunities()
      .then(setItems)
      .catch(() => setError('Showing the saved opportunities. Start the backend to manage them.'))
  }, [])

  return (
    <section className="opportunities-section" id="opportunities">
      <div className="opportunities-heading">
        <div>
          <p className="eyebrow">Available now</p>
        </div>
        <p className="section-note">Browse open research opportunities and find a project that matches your curiosity.</p>
      </div>

      {error && <p className="form-success" role="status">{error}</p>}

      <div className="opportunity-grid">
        {items.map((opportunity) => (
          <OpportunityCard key={opportunity.code} opportunity={opportunity} />
        ))}
      </div>
    </section>
  )
}

export default Opportunities
