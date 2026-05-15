import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container, Paper, Typography, TextField, Button, Box,
  Alert, Link, Divider
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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e8eaf6 100%)',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            border: '1px solid',
            borderColor: 'grey.100',
            borderRadius: 3,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 64, height: 64,
                borderRadius: '16px',
                bgcolor: 'rgba(198,168,98,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto', mb: 2,
              }}
            >
              <RestaurantMenuIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              Личный кабинет
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Войдите, чтобы управлять бронированиями
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth
              label="Email"
              size="small"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              fullWidth
              label="Пароль"
              size="small"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ py: 1.3 }}
            >
              Войти
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Нет аккаунта?{' '}
            <Link href="#" underline="hover" sx={{ color: 'secondary.main', cursor: 'pointer', fontWeight: 600 }}>
              Зарегистрироваться
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
