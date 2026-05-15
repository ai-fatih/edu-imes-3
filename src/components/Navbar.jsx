import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, Divider,
  Container
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

const navItems = [
  { label: 'Главная', path: '/' },
  { label: 'Услуги', path: '/#services' },
  { label: 'О нас', path: '/#about' },
  { label: 'Контакты', path: '/#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

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
    <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'white', color: 'primary.main' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <RestaurantMenuIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
              PROFESSIONAL BANQUET SERVICE
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleNav(item.path)}
                sx={{ color: 'text.primary', '&:hover': { color: 'secondary.main' } }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 2, color: 'white' }}
              onClick={() => navigate('/login')}
            >
              Личный кабинет
            </Button>
          </Box>

          <IconButton
            sx={{ display: { md: 'none' } }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }}>
          <Typography variant="h6" sx={{ px: 2, mb: 2, fontWeight: 700 }}>
            Меню
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton onClick={() => handleNav(item.path)}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => { setMobileOpen(false); navigate('/login') }}>
                <ListItemText primary="Личный кабинет" sx={{ color: 'secondary.main', fontWeight: 600 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}
