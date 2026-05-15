import { Box, Paper, Typography, Grid } from '@mui/material'
import SavingsIcon from '@mui/icons-material/Savings'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import EventIcon from '@mui/icons-material/Event'

export default function StatsCards({ order }) {
  if (!order?.stages) return null

  const completedStages = order.stages.filter((s) => s.status === 'done').length
  const totalStages = order.stages.length
  const progressPct = Math.round((completedStages / totalStages) * 100)

  const msToEvent = new Date(order.eventDate) - new Date()
  const daysUntil = Math.ceil(msToEvent / (1000 * 60 * 60 * 24))
  const countdownLabel =
    daysUntil > 0
      ? `${daysUntil} дн.`
      : daysUntil === 0
        ? 'Сегодня!'
        : `Прошло ${Math.abs(daysUntil)} дн.`

  const formatCurrency = (amount) => `${amount.toLocaleString('ru-RU')} ₽`

  const cards = [
    {
      icon: <SavingsIcon />,
      value: formatCurrency(order.budgetSavings),
      label: 'Экономия',
      sub: `−${order.budgetSavingsPercent}% от сметы`,
      color: 'success.main',
    },
    {
      icon: <TrendingUpIcon />,
      value: `${completedStages}/${totalStages}`,
      label: 'Прогресс',
      sub: `${progressPct}% завершено`,
      color: 'secondary.main',
    },
    {
      icon: <EventIcon />,
      value: countdownLabel,
      label: 'До события',
      sub: order.eventDate,
      color: 'primary.main',
    },
  ]

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid size={{ xs: 12, sm: 4 }} key={card.label}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              border: '1px solid',
              borderColor: 'grey.100',
              borderRadius: 3,
              transition: '0.2s',
              '&:hover': { borderColor: 'secondary.light' },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                bgcolor: `${card.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: card.color,
                flexShrink: 0,
              }}
            >
              {card.icon}
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {card.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {card.sub}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
