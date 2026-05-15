import { Box, Paper, Typography, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import EventIcon from '@mui/icons-material/Event'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const stageLabels = {
  menu: 'Утверждение меню',
  alcohol: 'Подтверждение алкоголя',
  venue: 'Выезд на площадку',
  control: 'Контроль мероприятия',
  report: 'Пост-отчёт',
}

export default function EventCountdown({ order }) {
  if (!order?.eventDate) return null

  const msToEvent = new Date(order.eventDate) - new Date()
  const daysUntil = Math.ceil(msToEvent / (1000 * 60 * 60 * 24))

  if (daysUntil <= 0) return null

  const deadlines =
    order.stages
      ?.filter((s) => s.date && s.status !== 'done')
      .map((s) => {
        const ms = new Date(s.date) - new Date()
        const days = Math.ceil(ms / (1000 * 60 * 60 * 24))
        return {
          label: stageLabels[s.key] || s.label || s.key,
          date: s.date,
          days,
          urgent: days <= 3,
        }
      }) || []

  return (
    <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: deadlines.length > 0 ? 2 : 0 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '14px',
            bgcolor: 'rgba(26, 35, 126, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.main',
            flexShrink: 0,
          }}
        >
          <EventIcon />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ lineHeight: 1 }}>
            {daysUntil} <Typography component="span" variant="h6" color="text.secondary" fontWeight={400}>дн.</Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary">до события</Typography>
        </Box>
      </Box>

      {deadlines.length > 0 && (
        <List disablePadding dense>
          {deadlines.map((d, i) => (
            <ListItem key={i} disablePadding sx={{ py: 0.3 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <AccessTimeIcon sx={{ fontSize: 16, color: d.urgent ? 'error.main' : 'text.secondary' }} />
              </ListItemIcon>
              <ListItemText
                primary={d.label}
                secondary={d.date}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
              <Chip
                label={d.days <= 0 ? 'Сегодня!' : `${d.days} дн.`}
                color={d.urgent ? 'error' : 'default'}
                size="small"
                variant={d.urgent ? 'filled' : 'outlined'}
                sx={{ borderRadius: 6, fontSize: '0.65rem', fontWeight: 600, minWidth: 52 }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  )
}
