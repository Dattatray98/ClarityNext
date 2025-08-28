import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./Pages/LandingPage"
import HomePage from "./Pages/HomePage"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
