import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./Pages/LandingPage"
import HomePage from "./Pages/HomePage"
import BlogPage from "./Pages/BlogPage"
import Auth from "./Pages/Auth/Auth"
import { AuthProvider } from "./context/AuthContext"
import AIChatPage from "./Pages/AIChatPage"


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/:type" element={<Auth />} />
          <Route path="/blogpage" element={<BlogPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/chatwithai' element={<AIChatPage />} />

          {/* <Route element={<ProtectedRoute />}>
          </Route>
           */}
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
