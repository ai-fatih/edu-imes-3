import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Container, Typography, Grid, Paper, Box, Button, Chip, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent,
  Accordion, AccordionSummary, AccordionDetails, Avatar, Divider
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import EventIcon from '@mui/icons-material/Event'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChatIcon from '@mui/icons-material/Chat'
import AddIcon from '@mui/icons-material/Add'
import { useApp } from '../store/AppContext'
import OrderModal from '../components/OrderModal'

export default function Dashboard() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { orders, STATUS_LABELS, STATUS_COLORS } = useApp()
  const [orderOpen, setOrderOpen] = useState(false)

  const name = params.get('name') || 'Клиент'
  const email = params.get('email') || ''

  const myOrders = orders.filter(o => o.clientEmail === email || (!email && o.clientName === name))

  const stats = [
    { label: 'Всего заказов', value: myOrders.length, icon: <EventIcon />, color: 'primary.main' },
    { label: 'В работе', value: myOrders.filter(o => o.status === 'new' || o.status === 'confirmed' || o.status === 'in_progress').length, icon: <PendingActionsIcon />, color: 'warning.main' },
    { label: 'Выполнено', value: myOrders.filter(o => o.status === 'completed').length, icon: <CheckCircleIcon />, color: 'success.main' },
  ]

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', pt: { xs: 10, md: 12 }, pb: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>Здравствуйте, {name}!</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>Ваши бронирования в Professional Banquet Service</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button variant="contained" color="secondary" sx={{ color: 'white', borderRadius: 10 }} startIcon={<AddIcon />} onClick={() => setOrderOpen(true)}>
              Новый заказ
            </Button>
            <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={() => navigate('/')} sx={{ borderRadius: 10 }}>
              Выйти
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((s) => (
            <Grid item xs={12} sm={4} key={s.label}>
              <Paper elevation={0} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2.5, border: '1px solid', borderColor: 'grey.100', borderRadius: 3, transition: '0.2s', '&:hover': { borderColor: 'secondary.light' } }}>
                <Box sx={{ width: 52, height: 52, borderRadius: '14px', bgcolor: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{s.icon}</Box>
                <Box>
                  <Typography variant="h4" fontWeight={700}>{s.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{s.label}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {myOrders.length === 0 ? (
          <Paper elevation={0} sx={{ p: 6, textAlign: 'center', border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
            <EventIcon sx={{ fontSize: 48, color: 'grey.300', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>У вас пока нет заказов</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Создайте первый заказ — и он появится здесь</Typography>
            <Button variant="contained" color="secondary" sx={{ color: 'white' }} onClick={() => setOrderOpen(true)}>Создать заказ</Button>
          </Paper>
        ) : (
          myOrders.map(order => (
            <Accordion
              key={order.id}
              elevation={0}
              sx={{ border: '1px solid', borderColor: 'grey.100', borderRadius: '12px !important', mb: 2, '&:before': { display: 'none' }, '&.Mui-expanded': { mb: 2 } }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ borderRadius: 2, '&.Mui-expanded': { borderBottom: '1px solid', borderColor: 'grey.100' } }}>
                <Grid container spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle2" fontWeight={600}>{order.eventType}</Typography>
                    <Typography variant="caption" color="text.secondary">{order.id}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body2" color="text.secondary">Дата</Typography>
                    <Typography variant="body2" fontWeight={500}>{order.eventDate}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body2" color="text.secondary">Гости</Typography>
                    <Typography variant="body2" fontWeight={500}>{order.guests}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Chip label={STATUS_LABELS[order.status]} color={STATUS_COLORS[order.status]} size="small" variant="outlined" sx={{ borderRadius: 8 }} />
                  </Grid>
                  <Grid item xs={6} sm={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {order.comments.length > 0 && (
                      <Chip icon={<ChatIcon />} label={`${order.comments.length}`} size="small" variant="outlined" sx={{ borderRadius: 8 }} />
                    )}
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{order.message}</Typography>

                {order.comments.length > 0 && (
                  <>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle2" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ChatIcon fontSize="small" /> История заказа
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {order.comments.map(c => (
                        <Box key={c.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                          <Avatar sx={{ width: 28, height: 28, fontSize: 12, bgcolor: c.author === 'employee' ? 'secondary.main' : c.author === 'system' ? 'grey.400' : 'primary.main' }}>
                            {c.author === 'employee' ? 'С' : c.author === 'system' ? 'ℹ' : 'К'}
                          </Avatar>
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                              {c.authorName || (c.author === 'system' ? 'Система' : c.author === 'employee' ? 'Сотрудник' : 'Клиент')} · {new Date(c.createdAt).toLocaleString('ru')}
                            </Typography>
                            <Typography variant="body2">{c.text}</Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Container>
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </Box>
  )
}
