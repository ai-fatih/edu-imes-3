import { useState } from 'react'
import { Container, Typography, Grid, Paper, Box, TextField, Button, Snackbar, Alert } from '@mui/material'
import useInView from '../hooks/useInView'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const initialForm = { name: '', phone: '', email: '', message: '' }

const contactInfo = [
  { icon: <PhoneIcon />, title: 'Телефон', value: '+7 (964) 72-888-44' },
  { icon: <EmailIcon />, title: 'Email', value: 'ion-melnik@bk.ru' },
  { icon: <AccountCircleIcon />, title: 'Основатель', value: 'Ион Мельник' },
]

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [snack, setSnack] = useState({ open: false, severity: 'success', text: '' })
  const [ref, inView] = useInView({ threshold: 0.1 })

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
    <Box id="contact" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box ref={ref} sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2, fontSize: '0.8rem' }}
          >
            Связь
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
            Свяжитесь с нами
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto' }}>
            Оставьте заявку, и мы перезвоним в течение 15 минут
          </Typography>
        </Box>
        <Grid
          container
          spacing={6}
          maxWidth={960}
          mx="auto"
          sx={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease',
          }}
        >
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {contactInfo.map((item) => (
                <Paper
                  key={item.title}
                  elevation={0}
                  sx={{
                    p: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    border: '1px solid',
                    borderColor: 'grey.100',
                    borderRadius: 2,
                    transition: '0.2s',
                    '&:hover': { borderColor: 'secondary.light', bgcolor: 'grey.50' },
                  }}
                >
                  <Box
                    sx={{
                      width: 44, height: 44,
                      borderRadius: '12px',
                      bgcolor: 'rgba(198,168,98,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'secondary.main',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {item.value}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                border: '1px solid',
                borderColor: 'grey.100',
                borderRadius: 3,
              }}
            >
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Ваше имя" size="small" name="name" value={form.name} onChange={handleChange} required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Телефон" size="small" name="phone" value={form.phone} onChange={handleChange} required />
                  </Grid>
                </Grid>
                <TextField fullWidth label="Email" size="small" name="email" value={form.email} onChange={handleChange} type="email" />
                <TextField fullWidth label="Сообщение" multiline rows={4} size="small" name="message" value={form.message} onChange={handleChange} />
                <Button type="submit" variant="contained" color="secondary" size="large" sx={{ color: 'white', alignSelf: 'flex-start', px: 5 }}>
                  Отправить заявку
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={snack.open} autoHideDuration={5000} onClose={() => setSnack({ ...snack, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })} variant="filled" sx={{ borderRadius: 2 }}>
          {snack.text}
        </Alert>
      </Snackbar>
    </Box>
  )
}
