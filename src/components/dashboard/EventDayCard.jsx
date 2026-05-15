import { Box, Paper, Typography, Chip, Divider } from '@mui/material'
import CelebrationIcon from '@mui/icons-material/Celebration'
import PhoneIcon from '@mui/icons-material/Phone'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import WbSunnyIcon from '@mui/icons-material/WbSunny'

export default function EventDayCard({ order }) {
  if (!order?.eventDate) return null

  const eventDate = new Date(order.eventDate)
  const today = new Date()
  const isToday =
    eventDate.getFullYear() === today.getFullYear() &&
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getDate() === today.getDate()

  if (!isToday) return null

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: '2px solid',
        borderColor: 'secondary.main',
        borderRadius: 3,
        background: 'linear-gradient(135deg, rgba(198,168,98,0.08) 0%, rgba(198,168,98,0.02) 100%)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <CelebrationIcon color="secondary" sx={{ fontSize: 32 }} />
        <Box>
          <Typography variant="h5" fontWeight={700} color="secondary.main">
            Сегодня — День X!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {order.eventType} · {order.guests} гостей
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTimeIcon fontSize="small" color="action" />
          <Box>
            <Typography variant="caption" color="text.secondary">Начало</Typography>
            <Typography variant="body2" fontWeight={600}>18:00</Typography>
          </Box>
        </Box>
        {order.managerPhone && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon fontSize="small" color="action" />
            <Box>
              <Typography variant="caption" color="text.secondary">Менеджер</Typography>
              <Typography variant="body2" fontWeight={600}>{order.managerPhone}</Typography>
            </Box>
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WbSunnyIcon fontSize="small" color="action" />
          <Box>
            <Typography variant="caption" color="text.secondary">Погода</Typography>
            <Typography variant="body2" fontWeight={600}>+22°C · Ясно</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip label="Тайминг мероприятия" color="secondary" size="small" sx={{ borderRadius: 8, color: 'white' }} />
        <Chip label="Контакты площадки" variant="outlined" size="small" sx={{ borderRadius: 8 }} />
      </Box>
    </Paper>
  )
}
