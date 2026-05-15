import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Container, Paper, Typography, TextField, Button, Box, Tabs, Tab, Alert, Divider, Link } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import BadgeIcon from '@mui/icons-material/Badge'

export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const [client, setClient] = useState({ name: 'Иван Петров', email: 'ivan@example.com' })
  const [employee, setEmployee] = useState({ name: 'Ион Мельник', code: '' })
  const [error, setError] = useState('')

  const handleClientLogin = (e) => {
    e.preventDefault()
    if (!client.name || !client.email) { setError('Заполните все поля'); return }
    navigate(`/dashboard?name=${encodeURIComponent(client.name)}&email=${encodeURIComponent(client.email)}`)
  }

  const handleEmployeeLogin = (e) => {
    e.preventDefault()
    if (!employee.name) { setError('Введите имя'); return }
    navigate(`/employee/dashboard?name=${encodeURIComponent(employee.name)}`)
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)' }}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ p: 4, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ width: 64, height: 64, borderRadius: '16px', bgcolor: 'rgba(198,168,98,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <RestaurantMenuIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Личный кабинет</Typography>
            <Typography variant="body2" color="text.secondary">Войдите, чтобы управлять бронированиями</Typography>
          </Box>

          <Tabs value={tab} onChange={(_, v) => { setTab(v); setError('') }} variant="fullWidth" sx={{ mb: 3, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600 } }}>
            <Tab label="Клиент" />
            <Tab label="Сотрудник" icon={<BadgeIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
          </Tabs>

          {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>{error}</Alert>}

          {tab === 0 ? (
            <Box component="form" onSubmit={handleClientLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField fullWidth label="Ваше имя" size="small" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} required />
              <TextField fullWidth label="Email" size="small" type="email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} required />
              <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ py: 1.3 }}>Войти как клиент</Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleEmployeeLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField fullWidth label="Имя сотрудника" size="small" value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} required />
              <TextField fullWidth label="Код сотрудника" size="small" value={employee.code} onChange={(e) => setEmployee({ ...employee, code: e.target.value })} />
              <Button type="submit" variant="contained" color="secondary" size="large" fullWidth sx={{ color: 'white', py: 1.3 }}>Войти как сотрудник</Button>
            </Box>
          )}

          <Divider sx={{ my: 2.5 }} />
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Нет аккаунта?{' '}
            <Link href="#" underline="hover" sx={{ color: 'secondary.main', cursor: 'pointer', fontWeight: 600 }}>Зарегистрироваться</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
