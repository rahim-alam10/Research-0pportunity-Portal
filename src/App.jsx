import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Opportunities from './components/Opportunities'
import TestPlan from './components/TestPlan'

function NotFound() {
  return <p>Page not found.</p>
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<><HeroSection /><TestPlan /></>} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/add-opportunity" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
