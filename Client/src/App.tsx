import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./Pages/LandingPage"
import HomePage from "./Pages/HomePage"
import BlogPage from "./Pages/BlogPage"
import Auth from "./Pages/Auth/Auth"
import { AuthProvider } from "./context/AuthContext"
import AIChatPage from "./Pages/AIChatPage"
import ProtectedRoute from "./Components/ProtectedRoute"
import FeaturesPage from "./Pages/FeaturesPage"


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<Landing />} />

          {/* Features route */}
          <Route path="/features" element={<FeaturesPage />} />

          {/* Authentication route */}
          <Route path="/auth/:type" element={<Auth />} />

          {/* Protected routes, can be accessed only logged in users*/}
          <Route element={<ProtectedRoute />}>
            
            {/* Blog page route */}
            <Route path="/blogpage" element={<BlogPage />} />

            {/* Home / dashboard route */}
            <Route path="/home" element={<HomePage />} />

            {/* Chat with ai route */}
            <Route path='/chatwithai' element={<AIChatPage />} />

          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
