import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Opportunities from './components/Opportunities'
import TestPlan from './components/TestPlan'
import AddOpportunity from './components/AddOpportunity'
import OpportunityDetails from './components/OpportunityDetails'

function NotFound() {
  return <p>Page not found.</p>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
