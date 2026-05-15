import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AppProvider } from './store/AppContext'
import theme from './theme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import BlockView from './pages/BlockView'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </AppProvider>
    </ThemeProvider>
  )
}
