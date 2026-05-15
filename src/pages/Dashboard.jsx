import { useNavigate } from 'react-router-dom'
import {
  Container, Typography, Grid, Paper, Box, Button, Chip, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Card, CardContent
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import EventIcon from '@mui/icons-material/Event'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingActionsIcon from '@mui/icons-material/PendingActions'

const bookings = [
  { id: 1, event: 'Корпоратив ООО "Ромашка"', date: '15.06.2026', guests: 120, status: 'confirmed', amount: '450 000 ₽' },
  { id: 2, event: 'Свадьба Ивановых', date: '22.06.2026', guests: 80, status: 'pending', amount: '320 000 ₽' },
  { id: 3, event: 'День рождения', date: '05.07.2026', guests: 30, status: 'pending', amount: '95 000 ₽' },
  { id: 4, event: 'Бизнес-форум', date: '10.07.2026', guests: 200, status: 'confirmed', amount: '680 000 ₽' },
]

const statusConfig = {
  confirmed: { label: 'Подтверждено', color: 'success', icon: <CheckCircleIcon fontSize="small" /> },
  pending: { label: 'В ожидании', color: 'warning', icon: <PendingActionsIcon fontSize="small" /> },
}

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        pt: { xs: 10, md: 12 },
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>Мои бронирования</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              Добро пожаловать в личный кабинет
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={() => navigate('/')}
            sx={{ borderRadius: 10 }}
          >
            Выйти
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { label: 'Всего бронирований', value: bookings.length, icon: <EventIcon />, color: 'primary.main' },
            { label: 'Подтверждено', value: bookings.filter(b => b.status === 'confirmed').length, icon: <CheckCircleIcon />, color: 'success.main' },
            { label: 'В ожидании', value: bookings.filter(b => b.status === 'pending').length, icon: <PendingActionsIcon />, color: 'warning.main' },
          ].map((s) => (
            <Grid item xs={12} sm={4} key={s.label}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2.5,
                  border: '1px solid',
                  borderColor: 'grey.100',
                  borderRadius: 3,
                  transition: '0.2s',
                  '&:hover': { borderColor: 'secondary.light', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
                }}
              >
                <Box
                  sx={{
                    width: 52, height: 52, borderRadius: '14px',
                    bgcolor: `${s.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: s.color,
                  }}
                >
                  {s.icon}
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={700}>{s.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{s.label}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'grey.100',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: 'text.primary', bgcolor: 'grey.50' }}>Мероприятие</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.primary', bgcolor: 'grey.50' }}>Дата</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.primary', bgcolor: 'grey.50' }}>Гости</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.primary', bgcolor: 'grey.50' }}>Статус</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'text.primary', bgcolor: 'grey.50' }}>Сумма</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((b) => {
                  const st = statusConfig[b.status]
                  return (
                    <TableRow
                      key={b.id}
                      sx={{ '&:hover': { bgcolor: 'grey.50' }, transition: '0.15s' }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>{b.event}</TableCell>
                      <TableCell>{b.date}</TableCell>
                      <TableCell>{b.guests}</TableCell>
                      <TableCell>
                        <Chip icon={st.icon} label={st.label} color={st.color} size="small" variant="outlined" sx={{ borderRadius: 8 }} />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>{b.amount}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Card sx={{ mt: 4, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Новое бронирование
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, maxWidth: 400 }}>
              Чтобы забронировать новое мероприятие, свяжитесь с нашим менеджером
            </Typography>
            <Button variant="contained" color="secondary" sx={{ color: 'white', borderRadius: 10 }}>
              Связаться с менеджером
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
