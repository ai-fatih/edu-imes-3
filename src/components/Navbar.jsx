import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, Divider,
  Container
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import CloseIcon from '@mui/icons-material/Close'

const navItems = [
  { label: 'Главная', path: '/' },
  { label: 'Услуги', path: '/#services' },
  { label: 'О нас', path: '/#about' },
  { label: 'Контакты', path: '/#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const showScrolled = scrolled || !isHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (path) => {
    setMobileOpen(false)
    if (path.startsWith('/#')) {
      if (location.pathname === '/') {
        const id = path.slice(2)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/' + path)
      }
    } else {
      navigate(path)
    }
  }

  return (
    <AppBar
      position="fixed"
      elevation={showScrolled ? 2 : 0}
      sx={{
        bgcolor: showScrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: showScrolled ? 'blur(12px)' : 'none',
        color: showScrolled ? 'primary.main' : 'white',
        transition: 'all 0.3s ease',
        boxShadow: showScrolled ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 64, md: 72 } }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <RestaurantMenuIcon sx={{ color: showScrolled ? 'secondary.main' : 'secondary.light', fontSize: 30 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                fontSize: { xs: '0.85rem', sm: '1rem' },
                color: showScrolled ? 'primary.main' : 'white',
              }}
            >
              PRO BANQUET
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleNav(item.path)}
                sx={{
                  color: showScrolled ? 'text.primary' : 'white',
                  opacity: 0.85,
                  '&:hover': { opacity: 1, color: showScrolled ? 'secondary.main' : 'secondary.light', bgcolor: 'transparent' },
                  transition: '0.2s',
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant={showScrolled ? 'contained' : 'outlined'}
              color="secondary"
              sx={{
                ml: 2,
                color: showScrolled ? 'white' : 'white',
                borderColor: showScrolled ? undefined : 'rgba(255,255,255,0.5)',
                '&:hover': { borderColor: 'white' },
              }}
              onClick={() => navigate('/login')}
            >
              Личный кабинет
            </Button>
            <Button
              variant={showScrolled ? 'outlined' : 'text'}
              size="small"
              sx={{
                ml: 1,
                color: showScrolled ? 'text.secondary' : 'rgba(255,255,255,0.7)',
                fontSize: '0.8rem',
                '&:hover': { color: showScrolled ? 'secondary.main' : 'white' },
              }}
              onClick={() => navigate('/login')}
            >
              CRM
            </Button>
          </Box>

          <IconButton
            sx={{ display: { md: 'none' }, color: showScrolled ? 'primary.main' : 'white' }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 280, bgcolor: 'primary.main', color: 'white' } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => handleNav(item.path)} sx={{ px: 3, py: 1.5 }}>
                <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mx: 2 }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => { setMobileOpen(false); navigate('/login') }}
              sx={{ px: 3, py: 1.5 }}
            >
              <ListItemText
                primary="Личный кабинет"
                primaryTypographyProps={{ fontWeight: 700, sx: { color: 'secondary.light' } }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => { setMobileOpen(false); navigate('/login') }}
              sx={{ px: 3, py: 1.5 }}
            >
              <ListItemText
                primary="Панель управления (CRM)"
                primaryTypographyProps={{ fontWeight: 500, sx: { opacity: 0.7 } }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  )
}
