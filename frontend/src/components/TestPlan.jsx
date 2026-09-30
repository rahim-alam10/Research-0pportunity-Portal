const testSteps = [
  { number: '01', label: 'Create opportunities', detail: '3 records', tone: 'coral' },
  { number: '02', label: 'Retrieve all', detail: 'GET /opportunities', tone: 'mint' },
  { number: '03', label: 'Retrieve by ID', detail: 'GET /:id', tone: 'sun' },
  { number: '04', label: 'Update an opportunity', detail: 'PUT /:id', tone: 'lavender' },
  { number: '05', label: 'Close an opportunity', detail: 'Open -> Closed', tone: 'coral' },
  { number: '06', label: 'Delete an opportunity', detail: 'DELETE /:id', tone: 'mint' },
  { number: '07', label: 'Confirm 404 response', detail: 'Deleted ID', tone: 'sun' },
  { number: '08', label: 'Reject invalid data', detail: 'Validation error', tone: 'lavender' },
]

function TestPlan() {
  return (
    <>
      <section className="test-plan-section" id="test-plan">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Verification checklist</p>
            <h2>Eight requests.<br /><em>One complete story.</em></h2>
          </div>
          <p className="section-note">The completed backend API must be demonstrated in Postman or Bruno from creation through validation.</p>
        </div>
        <div className="steps-grid">
          {testSteps.map((step) => (
            <article className={`step-card ${step.tone}`} key={step.number}>
              <span className="step-number">{step.number}</span>
              <div><h3>{step.label}</h3><p>{step.detail}</p></div>
              <span className="step-arrow" aria-hidden="true">&#8599;</span>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

export default TestPlan
