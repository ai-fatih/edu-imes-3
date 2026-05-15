import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import AddIcon from '@mui/icons-material/Add'
import EventIcon from '@mui/icons-material/Event'
import RepeatIcon from '@mui/icons-material/Repeat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import StarIcon from '@mui/icons-material/Star'
import { useApp } from '../store/AppContext'
import useNotificationReminder from '../hooks/useNotificationReminder'
import OrderModal from '../components/OrderModal'
import ManagerCard from '../components/dashboard/ManagerCard'
import StatsCards from '../components/dashboard/StatsCards'
import BudgetCard from '../components/dashboard/BudgetCard'
import StageTimeline from '../components/dashboard/StageTimeline'
import DocumentVault from '../components/dashboard/DocumentVault'
import StageChat from '../components/dashboard/StageChat'
import SavingsTicker from '../components/dashboard/SavingsTicker'
import EventCountdown from '../components/dashboard/EventCountdown'
import EventDayCard from '../components/dashboard/EventDayCard'
import VenueSummary from '../components/dashboard/VenueSummary'
import ChangeRequestModal from '../components/dashboard/ChangeRequestModal'
import CalendarSync from '../components/dashboard/CalendarSync'
import NpsModal from '../components/dashboard/NpsModal'

export default function Dashboard() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { orders, addComment, updateNps } = useApp()
  const [modalMode, setModalMode] = useState(null)
  const [changeRequestOpen, setChangeRequestOpen] = useState(false)
  const [changeRequestStage, setChangeRequestStage] = useState('menu')
  const [npsOpen, setNpsOpen] = useState(false)
  const reminder = useNotificationReminder()

  const name = params.get('name') || 'Клиент'
  const email = params.get('email') || ''
  const projectId = params.get('project')

  const myOrders = orders.filter(
    (o) => o.clientEmail === email || (!email && o.clientName === name),
  )

  const activeOrder =
    (projectId && myOrders.find((o) => o.id === projectId)) ||
    myOrders.find((o) => o.status !== 'completed' && o.status !== 'cancelled') ||
    myOrders[0]

  const [reminderSet, setReminderSet] = useState(
    () => !!activeOrder && (() => {
      try { return !!localStorage.getItem('bs_reminder_' + activeOrder.id) }
      catch { return false }
    })(),
  )

  const showNps =
    activeOrder?.status === 'completed' && activeOrder?.nps === null

  const totalSavings = myOrders.reduce(
    (s, o) => s + (o.budgetSavings || 0),
    0,
  )

  const handleChangeRequest = (text, stageKey) => {
    addComment(activeOrder.id, text, 'client', name, stageKey)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
        pt: { xs: 10, md: 12 },
        pb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Здравствуйте, {name}!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              Professional Banquet Service — ваш F&B-контроль
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ color: 'white', borderRadius: 10 }}
              startIcon={<AddIcon />}
              onClick={() => setModalMode('new')}
            >
              Новый проект
            </Button>
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
        </Box>

        {!activeOrder ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              border: '1px solid',
              borderColor: 'grey.100',
              borderRadius: 3,
            }}
          >
            <EventIcon sx={{ fontSize: 48, color: 'grey.300', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              У вас пока нет проектов
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Создайте первый проект — и он появится здесь
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ color: 'white' }}
              onClick={() => setModalMode('new')}
            >
              Создать проект
            </Button>
          </Paper>
        ) : (
          <>
            {/* Event Day Card — показывается только в день мероприятия */}
            <Box sx={{ mb: 3 }}>
              <EventDayCard order={activeOrder} />
            </Box>

            {/* Manager card row */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: 8 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: '1px solid',
                    borderColor: 'grey.100',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    height: '100%',
                  }}
                >
                  <EventIcon color="secondary" sx={{ fontSize: 32 }} />
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      {activeOrder.eventType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activeOrder.eventDate} · {activeOrder.guests} гостей · {activeOrder.id}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <ManagerCard
                  managerName={activeOrder.managerName}
                  managerPhone={activeOrder.managerPhone}
                />
              </Grid>
            </Grid>

            {/* Stats cards */}
            <Box sx={{ mb: 3 }}>
              <StatsCards order={activeOrder} />
            </Box>

            {/* Savings ticker */}
            {totalSavings > 0 && (
              <Box sx={{ mb: 3 }}>
                <SavingsTicker totalSavings={totalSavings} />
              </Box>
            )}

            {/* Countdown + Venue Summary row */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: activeOrder.venueInspection ? 6 : 12 }}>
                <EventCountdown order={activeOrder} />
              </Grid>
              {activeOrder.venueInspection && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <VenueSummary venueInspection={activeOrder.venueInspection} />
                </Grid>
              )}
            </Grid>

            {/* Budget section */}
            <Box sx={{ mb: 3 }}>
              <BudgetCard order={activeOrder} />
            </Box>

            {/* Rebooking + Change request + Reminder + Calendar + NPS */}
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                mb: 3,
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={<RepeatIcon />}
                onClick={() => setModalMode('rebook')}
                sx={{ borderRadius: 10 }}
              >
                Планируете ещё мероприятие?
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => {
                  setChangeRequestStage('menu')
                  setChangeRequestOpen(true)
                }}
                sx={{ borderRadius: 10 }}
              >
                Запросить изменение
              </Button>
              <Button
                variant="outlined"
                size="small"
                color={reminderSet ? 'success' : 'inherit'}
                startIcon={<NotificationsIcon />}
                onClick={() => {
                  if (reminderSet) {
                    reminder.cancelReminder(activeOrder.id)
                    setReminderSet(false)
                  } else {
                    reminder.scheduleReminder(activeOrder.id, activeOrder.eventDate, 7)
                    setReminderSet(true)
                  }
                }}
                sx={{ borderRadius: 10 }}
              >
                {reminderSet
                  ? 'Напоминание установлено'
                  : 'Напомнить за 7 дней'}
              </Button>
              <CalendarSync order={activeOrder} />
              {showNps && (
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  startIcon={<StarIcon />}
                  onClick={() => setNpsOpen(true)}
                  sx={{ borderRadius: 10 }}
                >
                  Оценить работу
                </Button>
              )}
            </Box>

            {/* Stage timeline */}
            <Box sx={{ mb: 3 }}>
              <StageTimeline
                order={activeOrder}
                onChangeRequest={(stageKey) => {
                  setChangeRequestStage(stageKey)
                  setChangeRequestOpen(true)
                }}
              />
            </Box>

            {/* Documents */}
            {activeOrder.documents?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <DocumentVault documents={activeOrder.documents} />
              </Box>
            )}

            {/* Chat */}
            <Box sx={{ mb: 3 }}>
              <StageChat
                order={activeOrder}
                onSend={(text, stageKey) =>
                  addComment(activeOrder.id, text, 'client', name, stageKey)
                }
              />
            </Box>
          </>
        )}
      </Container>

      {/* Order modal (new or rebook) */}
      <OrderModal
        key={modalMode || 'closed'}
        open={modalMode !== null}
        onClose={() => setModalMode(null)}
        initialData={
          modalMode === 'rebook' && activeOrder
            ? {
                clientName: activeOrder.clientName,
                clientPhone: activeOrder.clientPhone,
                clientEmail: activeOrder.clientEmail,
              }
            : undefined
        }
      />

      {/* Change request modal */}
      <ChangeRequestModal
        open={changeRequestOpen}
        onClose={() => setChangeRequestOpen(false)}
        defaultStage={changeRequestStage}
        onSubmit={handleChangeRequest}
      />

      {/* NPS modal */}
      <NpsModal
        open={npsOpen}
        onClose={() => setNpsOpen(false)}
        order={activeOrder}
        onSubmit={(id, nps, npsComment) => updateNps(id, nps, npsComment)}
      />
    </Box>
  )
}
