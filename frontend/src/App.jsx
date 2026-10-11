import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Opportunities from './components/Opportunities'
import TestPlan from './components/TestPlan'
import AddOpportunity from './components/AddOpportunity'
import OpportunityDetails from './components/OpportunityDetails'

function NotFound() {
  return (
    <main className="opportunity-detail-page">
      <p className="eyebrow">Error 404</p>
      <h1>Page not found</h1>
      <p className="section-note">The page you requested does not exist.</p>
    </main>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/opportunities/:code" element={<OpportunityDetails />} />
        <Route path="/test-plan" element={<TestPlan />} />
        <Route path="/add-opportunities" element={<AddOpportunity />} />
        <Route path="/add-opportunity" element={<AddOpportunity />} />
        <Route path="/add-opportunity/:code" element={<AddOpportunity />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
