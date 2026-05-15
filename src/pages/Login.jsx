import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container, Paper, Typography, TextField, Button, Box,
  Alert, Divider, Link
} from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Заполните все поля')
      return
    }
    navigate('/dashboard')
  }

  return (
    <Box sx={{ minHeight: 'calc(100vh - 300px)', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="xs">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <RestaurantMenuIcon sx={{ color: 'secondary.main', fontSize: 48 }} />
          <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
            Личный кабинет
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Войдите, чтобы управлять бронированиями
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'grey.200' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth label="Email" size="small" type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              fullWidth label="Пароль" size="small" type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Войти
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Нет аккаунта?{' '}
            <Link href="#" underline="hover" sx={{ color: 'secondary.main', cursor: 'pointer' }}>
              Зарегистрироваться
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
