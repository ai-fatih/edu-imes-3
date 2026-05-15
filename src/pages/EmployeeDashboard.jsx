import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Container, Typography, Grid, Paper, Box, Button, Chip, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Drawer, IconButton, Divider, TextField, MenuItem, Avatar, Tooltip,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import CloseIcon from '@mui/icons-material/Close'
import EventIcon from '@mui/icons-material/Event'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import CancelIcon from '@mui/icons-material/Cancel'
import SendIcon from '@mui/icons-material/Send'
import { useApp } from '../store/AppContext'

const statuses = ['new', 'confirmed', 'in_progress', 'completed', 'cancelled']

export default function EmployeeDashboard() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { orders, updateStatus, addComment, updateNotes, STATUS_LABELS, STATUS_COLORS } = useApp()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filter, setFilter] = useState('all')
  const [commentText, setCommentText] = useState('')
  const [notesText, setNotesText] = useState('')

  const empName = params.get('name') || 'Анна Менеджер'

  const filtered = useMemo(() => {
    if (filter === 'all') return orders
    return orders.filter(o => o.status === filter)
  }, [orders, filter])

  const stats = useMemo(() => [
    { label: 'Всего заявок', value: orders.length, icon: <EventIcon />, color: 'primary.main' },
    { label: 'Новые', value: orders.filter(o => o.status === 'new').length, icon: <NewReleasesIcon />, color: 'info.main' },
    { label: 'В работе', value: orders.filter(o => o.status === 'in_progress' || o.status === 'confirmed').length, icon: <PendingActionsIcon />, color: 'warning.main' },
    { label: 'Выполнено', value: orders.filter(o => o.status === 'completed').length, icon: <CheckCircleIcon />, color: 'success.main' },
  ], [orders])

  const openOrder = (order) => {
    setSelectedOrder(order)
    setNotesText(order.employeeNotes)
    setCommentText('')
  }

  const handleStatusChange = (id, newStatus) => {
    updateStatus(id, newStatus)
    if (selectedOrder?.id === id) setSelectedOrder({ ...selectedOrder, status: newStatus })
  }

  const handleAddComment = () => {
    if (!commentText.trim() || !selectedOrder) return
    addComment(selectedOrder.id, commentText.trim(), 'employee', empName)
    setCommentText('')
    setSelectedOrder({
      ...selectedOrder,
      comments: [...selectedOrder.comments, {
        id: `c${Date.now()}`, text: commentText.trim(),
        author: 'employee', authorName: empName, createdAt: new Date().toISOString(),
      }]
    })
  }

  const handleSaveNotes = () => {
    if (!selectedOrder) return
    updateNotes(selectedOrder.id, notesText)
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)', pt: { xs: 10, md: 12 }, pb: 6 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>Панель управления</Typography>
              <Chip label="CRM" color="secondary" size="small" sx={{ borderRadius: 6, color: 'white' }} />
            </Box>
            <Typography variant="body1" color="text.secondary">
              {empName} · Professional Banquet Service
            </Typography>
          </Box>
          <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={() => navigate('/')} sx={{ borderRadius: 10 }}>
            Выйти
          </Button>
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {stats.map((s) => (
            <Grid item xs={6} sm={3} key={s.label}>
              <Paper elevation={0} sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
                <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>{s.icon}</Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>{s.value}</Typography>
                  <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
          {['all', ...statuses].map(s => (
            <Chip
              key={s}
              label={s === 'all' ? 'Все' : STATUS_LABELS[s]}
              onClick={() => setFilter(s)}
              color={filter === s ? STATUS_COLORS[s] === 'error' ? 'error' : STATUS_COLORS[s] || 'primary' : 'default'}
              variant={filter === s ? 'filled' : 'outlined'}
              size="small"
              sx={{ borderRadius: 8, fontWeight: 500 }}
            />
          ))}
        </Box>

        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'grey.100', borderRadius: 3, overflow: 'hidden' }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['Заказ', 'Клиент', 'Мероприятие', 'Дата', 'Гости', 'Статус'].map(h => (
                    <TableCell key={h} sx={{ fontWeight: 700, color: 'text.primary', bgcolor: 'grey.50', fontSize: '0.8rem' }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map(order => (
                  <TableRow
                    key={order.id}
                    hover
                    onClick={() => openOrder(order)}
                    sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'rgba(198,168,98,0.05)' }, transition: '0.15s' }}
                  >
                    <TableCell><Typography variant="body2" fontWeight={600}>{order.id}</Typography></TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.clientName}</Typography>
                      <Typography variant="caption" color="text.secondary">{order.clientPhone}</Typography>
                    </TableCell>
                    <TableCell><Typography variant="body2">{order.eventType}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{order.eventDate}</Typography></TableCell>
                    <TableCell><Typography variant="body2">{order.guests}</Typography></TableCell>
                    <TableCell>
                      <Chip label={STATUS_LABELS[order.status]} color={STATUS_COLORS[order.status]} size="small" variant="outlined" sx={{ borderRadius: 8, fontSize: '0.75rem' }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      <Drawer
        anchor="right"
        open={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 480 }, p: 0 } }}
      >
        {selectedOrder && (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2.5, borderBottom: '1px solid', borderColor: 'grey.100' }}>
              <Box>
                <Typography variant="h6" fontWeight={700}>{selectedOrder.id}</Typography>
                <Typography variant="caption" color="text.secondary">{selectedOrder.eventType}</Typography>
              </Box>
              <IconButton onClick={() => setSelectedOrder(null)}><CloseIcon /></IconButton>
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto', p: 2.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Paper elevation={0} sx={{ p: 2.5, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Информация о клиенте</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                  {[
                    ['Имя', selectedOrder.clientName], ['Телефон', selectedOrder.clientPhone],
                    ['Email', selectedOrder.clientEmail], ['Гостей', selectedOrder.guests],
                    ['Дата', selectedOrder.eventDate], ['Статус', STATUS_LABELS[selectedOrder.status]],
                  ].map(([label, value]) => (
                    <Box key={label}>
                      <Typography variant="caption" color="text.secondary">{label}</Typography>
                      <Typography variant="body2" fontWeight={500}>{value || '—'}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Сообщение клиента</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                  {selectedOrder.message || 'Нет сообщения'}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Статус заказа</Typography>
                <TextField select fullWidth size="small" value={selectedOrder.status} onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}>
                  {statuses.map(s => <MenuItem key={s} value={s}>{STATUS_LABELS[s]}</MenuItem>)}
                </TextField>
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Заметка сотрудника</Typography>
                <TextField fullWidth multiline rows={3} size="small" value={notesText} onChange={(e) => setNotesText(e.target.value)} placeholder="Внутренняя заметка..." />
                <Button size="small" variant="outlined" sx={{ mt: 1 }} onClick={handleSaveNotes}>Сохранить заметку</Button>
              </Box>

              <Divider />

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Комментарии</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2, maxHeight: 300, overflow: 'auto' }}>
                  {selectedOrder.comments.length === 0 ? (
                    <Typography variant="caption" color="text.secondary">Пока нет комментариев</Typography>
                  ) : (
                    selectedOrder.comments.map(c => (
                      <Box key={c.id} sx={{ display: 'flex', gap: 1.5 }}>
                        <Avatar sx={{ width: 28, height: 28, fontSize: 11, bgcolor: c.author === 'employee' ? 'secondary.main' : c.author === 'system' ? 'grey.400' : 'primary.main' }}>
                          {c.author === 'employee' ? 'С' : c.author === 'system' ? 'ℹ' : 'К'}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            {c.authorName || 'Система'} · {new Date(c.createdAt).toLocaleString('ru')}
                          </Typography>
                          <Typography variant="body2">{c.text}</Typography>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField fullWidth size="small" placeholder="Написать комментарий..." value={commentText} onChange={(e) => setCommentText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddComment() } }} />
                  <Tooltip title="Отправить"><IconButton color="secondary" onClick={handleAddComment} disabled={!commentText.trim()}><SendIcon /></IconButton></Tooltip>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  )
}
