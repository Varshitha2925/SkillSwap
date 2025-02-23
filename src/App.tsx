
import './App.css'
import Login from './pages/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} /></Routes>
    </Router>
  )
}

export default App
