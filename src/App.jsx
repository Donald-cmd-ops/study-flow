import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './pages/Sign In/SignIn'
import SignUp from './pages/Sign Up/SignUp'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './pages/dashboard/dashboard'
import Forum from './pages/Forum/forum'
import Quizzlets from './pages/Quizzlets/quizzlets'
import Tasks from './pages/Tasks/tasks'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} /> 
        <Route path="/signIn" element={<SignIn />} /> 
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/signUp" element={<SignUp />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/forum" element={<Forum />} /> 
        <Route path="/quizzlets" element={<Quizzlets />} /> 
        <Route path="/tasks" element={<Tasks />} /> 
      </Routes>
    </Router>
  )
}

export default App
