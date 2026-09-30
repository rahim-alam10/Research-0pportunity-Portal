const opportunities = [
  {
    code: 'RO-001',
    title: 'Campus Air Quality Mapping',
    department: 'Environmental Science',
    description: 'Collect and visualize air-quality readings across high-traffic campus spaces.',
    supervisor: 'Dr. Maya Patel',
    duration: '8 weeks',
    status: 'Open',
    tone: 'coral',
  },
  {
    code: 'RO-002',
    title: 'Accessible Learning Interfaces',
    department: 'Human-Computer Interaction',
    description: 'Study how students navigate accessible course tools and turn findings into design guidance.',
    supervisor: 'Prof. Noah Williams',
    duration: '10 weeks',
    status: 'Open',
    tone: 'mint',
  },
  {
    code: 'RO-003',
    title: 'Local History Digital Archive',
    department: 'Digital Humanities',
    description: 'Help preserve oral histories by organizing, tagging, and presenting community records.',
    supervisor: 'Dr. Amina Hassan',
    duration: '6 weeks',
    status: 'Open',
    tone: 'sun',
  },
]

function Opportunities() {
  return (
    <section className="opportunities-section" id="opportunities">
      <div className="opportunities-heading">
        <div>
          <p className="eyebrow">Available now</p>
          <h2>Find your next<br /><em>question to pursue.</em></h2>
        </div>
        <p className="section-note">Browse open research opportunities and find a project that matches your curiosity.</p>
      </div>

      <div className="opportunity-grid">
        {opportunities.map((opportunity) => (
          <article className={`opportunity-card ${opportunity.tone}`} key={opportunity.code}>
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
            <a className="opportunity-link" href={`#${opportunity.code}`}>View opportunity <span aria-hidden="true">&#8594;</span></a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Opportunities
