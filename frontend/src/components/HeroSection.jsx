
function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Research API / Assignment 01</p>
          <h1>Turn curiosity into a <em>research opportunity.</em></h1>
          <p className="hero-lede">
            A focused workspace for creating, discovering, and managing student research opportunities.
            Every endpoint is ready to prove its behavior.
          </p>
        </div>

        <div className="request-card" aria-label="API status preview">
          <div className="request-card-top">
            <span className="window-dots"><i /><i /><i /></span>
            <span className="request-label">API / health check</span>
            <span className="status-badge"><span /> online</span>
          </div>
          <div className="request-body">
            <div className="request-line"><span className="method">GET</span><span>/api/opportunities</span></div>
            <div className="response-block">
              <div><span className="response-key">status</span><span className="response-value">200 OK</span></div>
              <div><span className="response-key">records</span><span className="response-value accent">03 found</span></div>
              <div><span className="response-key">updated</span><span className="response-value">just now</span></div>
            </div>
            <div className="mini-chart" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /></div>
          </div>
          <div className="request-card-footer"><span>Research opportunities</span><strong>Open for discovery</strong></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
