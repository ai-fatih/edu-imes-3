import { Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { AppProvider } from './store/AppContext'
import { ThemeProvider } from './store/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import BlockView from './pages/BlockView'
import KnowledgeBase from './pages/KnowledgeBase'
import GuestView from './pages/GuestView'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AppProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="/block-view" element={<BlockView />} />
            <Route path="/knowledge" element={<KnowledgeBase />} />
            <Route path="/event/:token" element={<GuestView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </AppProvider>
    </ThemeProvider>
  )
}
