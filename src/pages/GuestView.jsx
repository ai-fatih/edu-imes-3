import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Typography, Box, Paper, Chip, Divider } from '@mui/material'
import EventIcon from '@mui/icons-material/Event'
import PeopleIcon from '@mui/icons-material/People'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import WineBarIcon from '@mui/icons-material/WineBar'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useApp } from '../store/AppContext'

export default function GuestView() {
  const { token } = useParams()
  const { orders } = useApp()

  const order = useMemo(() => {
    return orders.find((o) => {
      const expected = btoa(o.id).replace(/=/g, '')
      return token === expected
    })
  }, [orders, token])

  if (!order) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 12, pb: 6 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
            Ссылка недействительна
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Мероприятие не найдено. Проверьте ссылку или свяжитесь с организатором.
          </Typography>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0ebe3', pt: 8, pb: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'grey.200' }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 4, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700}>
              {order.eventType}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
              {order.eventDate} · {order.guests} гостей
            </Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            {order.venueInspection && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <LocationOnIcon color="secondary" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {order.venueInspection.venueName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Площадка проведения
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />
              </>
            )}

            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <RestaurantMenuIcon color="secondary" /> Меню
            </Typography>

            {order.menus?.pbs ? (
              order.menus.pbs.map((cat, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 0.5, mb: 0.5 }}>
                    {cat.category}
                  </Typography>
                  {cat.items.map((item, j) => (
                    <Typography key={j} variant="body2" sx={{ pl: 1, mb: 0.25 }}>
                      • {item.replace(/\(.*?\)/g, '').trim()}
                    </Typography>
                  ))}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">Меню уточняется</Typography>
            )}

            {order.alcoholPlan?.items?.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WineBarIcon color="secondary" /> Алкоголь
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {order.alcoholPlan.items.map((item, i) => (
                    <Chip
                      key={i}
                      label={`${item.name} × ${item.qty}`}
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 8 }}
                    />
                  ))}
                </Box>
              </>
            )}

            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip icon={<EventIcon />} label={`Начало: 18:00`} variant="outlined" sx={{ borderRadius: 8 }} />
              <Chip icon={<PeopleIcon />} label={`${order.guests} гостей`} variant="outlined" sx={{ borderRadius: 8 }} />
            </Box>
          </Box>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Professional Banquet Service — ваш F&B-контроль
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
