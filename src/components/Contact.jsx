import { useState } from 'react'
import { Container, Typography, Grid, Paper, Box, TextField, Button, Snackbar, Alert } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const initialForm = { name: '', phone: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [snack, setSnack] = useState({ open: false, severity: 'success', text: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      setSnack({ open: true, severity: 'error', text: 'Заполните имя и телефон' })
      return
    }
    setSnack({ open: true, severity: 'success', text: 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.' })
    setForm(initialForm)
  }

  return (
    <Box id="contact" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 2 }}>
          Свяжитесь с нами
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 6 }}>
          Оставьте заявку, и мы перезвоним в течение 15 минут
        </Typography>
        <Grid container spacing={4} maxWidth={900} mx="auto">
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                { icon: <PhoneIcon />, title: 'Телефон', value: '+7 (495) 123-45-67' },
                { icon: <EmailIcon />, title: 'Email', value: 'info@probanquet.ru' },
                { icon: <LocationOnIcon />, title: 'Адрес', value: 'г. Москва, ул. Тверская, 15' },
              ].map((item) => (
                <Paper key={item.title} elevation={0} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, border: '1px solid', borderColor: 'grey.200' }}>
                  <Box sx={{ color: 'secondary.main' }}>{item.icon}</Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">{item.title}</Typography>
                    <Typography variant="body1" fontWeight={600}>{item.value}</Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'grey.200' }}>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Ваше имя" size="small" name="name" value={form.name} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Телефон" size="small" name="phone" value={form.phone} onChange={handleChange} />
                  </Grid>
                </Grid>
                <TextField fullWidth label="Email" size="small" name="email" value={form.email} onChange={handleChange} />
                <TextField fullWidth label="Сообщение" multiline rows={4} size="small" name="message" value={form.message} onChange={handleChange} />
                <Button type="submit" variant="contained" color="secondary" size="large" sx={{ color: 'white', alignSelf: 'flex-start' }}>
                  Отправить заявку
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={snack.open} autoHideDuration={5000} onClose={() => setSnack({ ...snack, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })} variant="filled">
          {snack.text}
        </Alert>
      </Snackbar>
    </Box>
  )
}
