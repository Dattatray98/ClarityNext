import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./Pages/LandingPage"
import HomePage from "./Pages/HomePage"
import BlogPage from "./Pages/BlogPage"
import Auth from "./Pages/Auth/Auth"
import { AuthProvider } from "./context/AuthContext"
import AIChatPage from "./Pages/AIChatPage"
import ProtectedRoute from "./Components/ProtectedRoute"


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<Landing />} />

          {/* Authentication route */}
          <Route path="/auth/:type" element={<Auth />} />

          {/* Protected routes, can be accessed only logged in users*/}
          <Route element={<ProtectedRoute />}>
            <Route path="/blogpage" element={<BlogPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path='/chatwithai' element={<AIChatPage />} />

          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
