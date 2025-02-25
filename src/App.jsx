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
import ForumPost from './pages/Forum/post_page'
import Discussion from './pages/Forum/discussion'
import AddTask from './pages/Tasks/addTask'
import TaskView from './pages/Tasks/taskView'
import Logger from './pages/producitivty_logger/logger'
import Draw from './pages/drawing/drawing_board' 

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
        <Route path="/forum/post" element={<ForumPost />} /> 
        <Route path="/forum/:threadID" element={<Discussion />} />
        <Route path="/tasks/add" element={<AddTask />} />
        <Route path="/tasks/:taskID" element={<TaskView />} />
        <Route path="/logger" element={<Logger />} />
        <Route path="/draw" element={<Draw />} />
      </Routes>
    </Router>
  )
}

export default App
