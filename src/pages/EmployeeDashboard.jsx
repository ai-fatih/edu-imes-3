import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Drawer,
  IconButton,
  Divider,
  TextField,
  MenuItem,
  Avatar,
  Tooltip,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import CloseIcon from '@mui/icons-material/Close'
import EventIcon from '@mui/icons-material/Event'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import SavingsIcon from '@mui/icons-material/Savings'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import SendIcon from '@mui/icons-material/Send'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LiquorIcon from '@mui/icons-material/Liquor'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EventNoteIcon from '@mui/icons-material/EventNote'
import AssessmentIcon from '@mui/icons-material/Assessment'
import StarIcon from '@mui/icons-material/Star'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useApp } from '../store/AppContext'
import {
  RevenueChart,
  SavingsChart,
  PipelineChart,
  GradeChart,
  NpsChart,
} from '../components/dashboard/MetricsCharts'
import VenueRating from '../components/dashboard/VenueRating'
import TopIssues from '../components/dashboard/TopIssues'

const stageMeta = {
  menu: { label: 'Меню', icon: <MenuBookIcon sx={{ fontSize: 16 }} />, color: 'primary' },
  alcohol: { label: 'Алкоголь', icon: <LiquorIcon sx={{ fontSize: 16 }} />, color: 'secondary' },
  venue: { label: 'Выезд', icon: <LocationOnIcon sx={{ fontSize: 16 }} />, color: 'info' },
  control: { label: 'Контроль', icon: <EventNoteIcon sx={{ fontSize: 16 }} />, color: 'warning' },
  report: { label: 'Отчёт', icon: <AssessmentIcon sx={{ fontSize: 16 }} />, color: 'success' },
}

const statuses = ['new', 'confirmed', 'in_progress', 'completed', 'cancelled']

export default function EmployeeDashboard() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { orders, updateStatus, addComment, updateNotes, STATUS_LABELS, STATUS_COLORS } = useApp()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filter, setFilter] = useState('all')
  const [stageFilter, setStageFilter] = useState('all')
  const [commentText, setCommentText] = useState('')
  const [notesText, setNotesText] = useState('')

  const empName = params.get('name') || 'Ион Мельник'

  const pipelineCounts = useMemo(() => {
    const counts = { menu: 0, alcohol: 0, venue: 0, control: 0, report: 0 }
    orders.forEach((o) => {
      if (o.stage && counts[o.stage] !== undefined && o.status !== 'completed' && o.status !== 'cancelled') {
        counts[o.stage]++
      }
    })
    return counts
  }, [orders])

  const totalSavings = useMemo(
    () => orders.reduce((s, o) => s + (o.budgetSavings || 0), 0),
    [orders],
  )

  const totalRevenue = useMemo(
    () => orders.reduce((s, o) => s + (o.budgetSavings ? Math.round(o.budgetSavings * 0.15) : 0), 0),
    [orders],
  )

  const avgNps = useMemo(() => {
    const rated = orders.filter((o) => o.nps != null)
    if (!rated.length) return null
    const promoters = rated.filter((o) => o.nps >= 9).length
    const detractors = rated.filter((o) => o.nps <= 6).length
    return Math.round(((promoters - detractors) / rated.length) * 100)
  }, [orders])

  const avgDuration = useMemo(() => {
    const completed = orders.filter((o) => o.status === 'completed' && o.createdAt)
    if (!completed.length) return null
    const days = completed.reduce((s, o) => {
      const end = o.eventDate ? new Date(o.eventDate) : new Date()
      const start = new Date(o.createdAt)
      return s + Math.round((end - start) / (1000 * 60 * 60 * 24))
    }, 0)
    return Math.round(days / completed.length)
  }, [orders])

  const activeProjects = useMemo(
    () => orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length,
    [orders],
  )

  const filtered = useMemo(() => {
    let result = orders
    if (filter !== 'all') result = result.filter((o) => o.status === filter)
    if (stageFilter !== 'all') result = result.filter((o) => o.stage === stageFilter)
    return result
  }, [orders, filter, stageFilter])

  const stats = useMemo(
    () => [
      { label: 'Всего проектов', value: orders.length, icon: <EventIcon />, color: 'primary.main' },
      { label: 'Активных', value: activeProjects, icon: <PendingActionsIcon />, color: 'warning.main' },
      { label: 'Выручка', value: `${totalRevenue.toLocaleString('ru-RU')} ₽`, icon: <TrendingUpIcon />, color: 'secondary.main' },
      { label: 'Экономия клиентам', value: `${totalSavings.toLocaleString('ru-RU')} ₽`, icon: <SavingsIcon />, color: 'success.main' },
      ...(avgNps !== null ? [{ label: 'NPS', value: avgNps, icon: <StarIcon />, color: avgNps >= 50 ? 'success.main' : avgNps >= 0 ? 'warning.main' : 'error.main' }] : []),
      ...(avgDuration !== null ? [{ label: 'Средняя длительность', value: `${avgDuration} дн.`, icon: <AccessTimeIcon />, color: 'info.main' }] : []),
    ],
    [orders, activeProjects, totalSavings, totalRevenue, avgNps, avgDuration],
  )

  const openOrder = (order) => {
    setSelectedOrder(order)
    setNotesText(order.employeeNotes || '')
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
      comments: [
        ...selectedOrder.comments,
        {
          id: `c${Date.now()}`,
          text: commentText.trim(),
          author: 'employee',
          authorName: empName,
          createdAt: new Date().toISOString(),
        },
      ],
    })
  }

  const handleSaveNotes = () => {
    if (!selectedOrder) return
    updateNotes(selectedOrder.id, notesText)
  }

  const pipelineTotal = Object.values(pipelineCounts).reduce((s, v) => s + v, 0)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
        pt: { xs: 10, md: 12 },
        pb: 6,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                PBS Command Center
              </Typography>
              <Chip label="CRM" color="secondary" size="small" sx={{ borderRadius: 6, color: 'white' }} />
            </Box>
            <Typography variant="body1" color="text.secondary">
              {empName} · Professional Banquet Service
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

        {/* Metrics */}
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {stats.map((s) => (
            <Grid size={{ xs: 6, sm: 4 }} key={s.label}>
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
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    bgcolor: `${s.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: s.color,
                    flexShrink: 0,
                  }}
                >
                  {s.icon}
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>{s.value}</Typography>
                  <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Pipeline */}
        {pipelineTotal > 0 && (
          <Paper
            elevation={0}
            sx={{ p: 2.5, mb: 3, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
              <TrendingUpIcon color="secondary" fontSize="small" /> Pipeline по этапам
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
              {Object.entries(stageMeta).map(([key, meta]) => (
                <Chip
                  key={key}
                  icon={meta.icon}
                  label={`${meta.label}: ${pipelineCounts[key]}`}
                  color={pipelineCounts[key] > 0 ? meta.color : 'default'}
                  variant={pipelineCounts[key] > 0 ? 'filled' : 'outlined'}
                  size="small"
                  sx={{ borderRadius: 8, fontWeight: 600 }}
                  onClick={() => setStageFilter(stageFilter === key ? 'all' : key)}
                />
              ))}
            </Box>
            {stageFilter !== 'all' && (
              <Box sx={{ mt: 1 }}>
                <Chip
                  label="Сбросить фильтр"
                  size="small"
                  variant="outlined"
                  onDelete={() => setStageFilter('all')}
                  sx={{ borderRadius: 8 }}
                />
              </Box>
            )}
          </Paper>
        )}

        {/* Charts */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <RevenueChart orders={orders} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <SavingsChart orders={orders} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <PipelineChart orders={orders} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <GradeChart orders={orders} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <NpsChart orders={orders} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <VenueRating orders={orders} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TopIssues orders={orders} />
          </Grid>
        </Grid>

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
          {['all', ...statuses].map((s) => (
            <Chip
              key={s}
              label={s === 'all' ? 'Все' : STATUS_LABELS[s]}
              onClick={() => setFilter(s)}
              color={filter === s ? (STATUS_COLORS[s] === 'error' ? 'error' : STATUS_COLORS[s] || 'primary') : 'default'}
              variant={filter === s ? 'filled' : 'outlined'}
              size="small"
              sx={{ borderRadius: 8, fontWeight: 500 }}
            />
          ))}
        </Box>

        {/* Table */}
        <Paper
          elevation={0}
          sx={{ border: '1px solid', borderColor: 'grey.100', borderRadius: 3, overflow: 'hidden' }}
        >
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {['Заказ', 'Клиент', 'Мероприятие', 'Этап', 'Дата', 'Гости', 'Экономия', 'Статус'].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 700, color: 'text.primary', bgcolor: 'grey.50', fontSize: '0.8rem' }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((order) => (
                  <TableRow
                    key={order.id}
                    hover
                    onClick={() => openOrder(order)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(198,168,98,0.05)' },
                      transition: '0.15s',
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>{order.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.clientName}</Typography>
                      <Typography variant="caption" color="text.secondary">{order.clientPhone}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.eventType}</Typography>
                    </TableCell>
                    <TableCell>
                      {order.stage && stageMeta[order.stage] ? (
                        <Chip
                          icon={stageMeta[order.stage].icon}
                          label={stageMeta[order.stage].label}
                          color={stageMeta[order.stage].color}
                          size="small"
                          variant="outlined"
                          sx={{ borderRadius: 8, fontSize: '0.7rem' }}
                        />
                      ) : (
                        <Typography variant="caption" color="text.secondary">—</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.eventDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.guests}</Typography>
                    </TableCell>
                    <TableCell>
                      {order.budgetSavings ? (
                        <Typography variant="body2" color="success.main" fontWeight={600}>
                          {order.budgetSavings.toLocaleString('ru-RU')} ₽
                        </Typography>
                      ) : (
                        <Typography variant="caption" color="text.secondary">—</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={STATUS_LABELS[order.status]}
                        color={STATUS_COLORS[order.status]}
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: 8, fontSize: '0.75rem' }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        PaperProps={{ sx: { width: { xs: '100%', sm: 480 }, p: 0 } }}
      >
        {selectedOrder && (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2.5,
                borderBottom: '1px solid',
                borderColor: 'grey.100',
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight={700}>{selectedOrder.id}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedOrder.eventType} · {selectedOrder.clientName}
                </Typography>
              </Box>
              <IconButton onClick={() => setSelectedOrder(null)}><CloseIcon /></IconButton>
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto', p: 2.5, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Client info */}
              <Paper elevation={0} sx={{ p: 2.5, bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Информация о клиенте</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                  {[
                    ['Имя', selectedOrder.clientName],
                    ['Телефон', selectedOrder.clientPhone],
                    ['Email', selectedOrder.clientEmail],
                    ['Гостей', selectedOrder.guests],
                    ['Дата', selectedOrder.eventDate],
                    ['Статус', STATUS_LABELS[selectedOrder.status]],
                  ].map(([label, value]) => (
                    <Box key={label}>
                      <Typography variant="caption" color="text.secondary">{label}</Typography>
                      <Typography variant="body2" fontWeight={500}>{value || '—'}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>

              {/* Stage info */}
              {selectedOrder.stage && stageMeta[selectedOrder.stage] && (
                <Paper elevation={0} sx={{ p: 2.5, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Текущий этап</Typography>
                  <Chip
                    icon={stageMeta[selectedOrder.stage].icon}
                    label={stageMeta[selectedOrder.stage].label}
                    color={stageMeta[selectedOrder.stage].color}
                    variant="filled"
                    size="small"
                    sx={{ borderRadius: 8 }}
                  />
                  {selectedOrder.budgetSavings ? (
                    <Box sx={{ mt: 1.5 }}>
                      <Typography variant="caption" color="text.secondary">Экономия по проекту</Typography>
                      <Typography variant="body1" color="success.main" fontWeight={700}>
                        {selectedOrder.budgetSavings.toLocaleString('ru-RU')} ₽ ({selectedOrder.budgetSavingsPercent}%)
                      </Typography>
                    </Box>
                  ) : null}
                </Paper>
              )}

              {/* Message */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Сообщение клиента</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
                  {selectedOrder.message || 'Нет сообщения'}
                </Typography>
              </Box>

              <Divider />

              {/* Status control */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Статус заказа</Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                >
                  {statuses.map((s) => (
                    <MenuItem key={s} value={s}>{STATUS_LABELS[s]}</MenuItem>
                  ))}
                </TextField>
              </Box>

              <Divider />

              {/* Employee notes */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Заметка сотрудника</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Внутренняя заметка..."
                />
                <Button size="small" variant="outlined" sx={{ mt: 1 }} onClick={handleSaveNotes}>
                  Сохранить заметку
                </Button>
              </Box>

              <Divider />

              {/* Comments */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Комментарии</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2, maxHeight: 300, overflow: 'auto' }}>
                  {selectedOrder.comments.length === 0 ? (
                    <Typography variant="caption" color="text.secondary">Пока нет комментариев</Typography>
                  ) : (
                    selectedOrder.comments.map((c) => (
                      <Box key={c.id} sx={{ display: 'flex', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 28,
                            height: 28,
                            fontSize: 11,
                            bgcolor: c.author === 'employee' ? 'secondary.main' : c.author === 'system' ? 'grey.400' : 'primary.main',
                          }}
                        >
                          {c.author === 'employee' ? 'С' : c.author === 'system' ? 'ℹ' : 'К'}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            {c.authorName || 'Система'}
                            {c.stageKey && stageMeta[c.stageKey] ? ` · ${stageMeta[c.stageKey].label}` : ''}
                            {' · '}
                            {new Date(c.createdAt).toLocaleString('ru')}
                          </Typography>
                          <Typography variant="body2">{c.text}</Typography>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Написать комментарий..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleAddComment()
                      }
                    }}
                  />
                  <Tooltip title="Отправить">
                    <IconButton color="secondary" onClick={handleAddComment} disabled={!commentText.trim()}>
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  )
}
