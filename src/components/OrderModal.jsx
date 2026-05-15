import { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, Button, TextField,
  Grid, Box, Typography, IconButton, Slider
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import EditIcon from '@mui/icons-material/Edit'
import WineBarIcon from '@mui/icons-material/WineBar'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useApp } from '../store/AppContext'

const presetEvents = [
  { value: 'Составление меню', icon: <MenuBookIcon />, color: '#e91e63' },
  { value: 'Корректировка меню', icon: <EditIcon />, color: '#1565c0' },
  { value: 'Расчёт алкоголя', icon: <WineBarIcon />, color: '#ff6f00' },
  { value: 'Закуп алкоголя', icon: <LocalShippingIcon />, color: '#2e7d32' },
  { value: 'Выезд на площадку', icon: <LocationOnIcon />, color: '#6a1b9a' },
  { value: 'Другое', icon: <MoreHorizIcon />, color: '#757575' },
]

const guestsMarks = [
  { value: 10, label: '10' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 200, label: '200' },
  { value: 500, label: '500' },
]

const emptyForm = {
  clientName: '', clientPhone: '', clientEmail: '',
  eventType: '', eventTypeOther: '', eventDate: '', guests: 30, message: '',
}

export default function OrderModal({ open, onClose }) {
  const { addOrder } = useApp()
  const [form, setForm] = useState(emptyForm)
  const [animating, setAnimating] = useState(false)

  const h = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const selectType = (val) => {
    setForm({ ...form, eventType: val === 'Другое' ? '' : val, eventTypeOther: val === 'Другое' ? form.eventTypeOther : '' })
  }

  const isCustom = form.eventType === '' && form.eventTypeOther
  const effectiveType = form.eventType === '' ? form.eventTypeOther : form.eventType
  const canSubmit = form.clientName && form.clientPhone && (form.eventType || form.eventTypeOther) && form.eventDate

  const submit = () => {
    if (!canSubmit) return
    addOrder({ ...form, eventType: effectiveType, status: 'new', guests: form.guests })
    setAnimating(true)
    setTimeout(() => {
      setAnimating(false)
      setForm(emptyForm)
      onClose()
    }, 600)
  }

  const onCloseWrapped = () => { setForm(emptyForm); onClose() }

  return (
    <Dialog open={open} onClose={onCloseWrapped} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, position: 'relative' } }}>
      <IconButton onClick={onCloseWrapped} sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1, color: 'grey.400', '&:hover': { color: 'text.primary' } }}>
        <CloseIcon />
      </IconButton>

      <DialogTitle sx={{ pb: 0, pt: 3, pr: 6 }}>
        <Typography variant="h5" fontWeight={700}>Заказать мероприятие</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Заполните форму — мы перезвоним в течение 15 минут</Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Ваше имя" size="small" name="clientName" value={form.clientName} onChange={h} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Телефон" size="small" name="clientPhone" value={form.clientPhone} onChange={h} required />
            </Grid>
          </Grid>
          <TextField fullWidth label="Email" size="small" name="clientEmail" value={form.clientEmail} onChange={h} type="email" />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: 'text.secondary', fontSize: '0.85rem' }}>
              Тип мероприятия *
            </Typography>
            <Grid container spacing={1.5}>
              {presetEvents.map((ev) => (
                <Grid item key={ev.value}>
                  <Box
                    onClick={() => selectType(ev.value)}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 0.75,
                      px: 2, py: 1.25, borderRadius: 3,
                      border: '2px solid',
                      borderColor: form.eventType === ev.value ? ev.color : 'grey.200',
                      bgcolor: form.eventType === ev.value ? `${ev.color}10` : 'transparent',
                      color: form.eventType === ev.value ? ev.color : 'text.secondary',
                      cursor: 'pointer', userSelect: 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': { borderColor: ev.color, bgcolor: `${ev.color}08` },
                    }}
                  >
                    <Box sx={{ fontSize: 18, display: 'flex', lineHeight: 1 }}>{ev.icon}</Box>
                    <Typography variant="body2" sx={{ fontWeight: form.eventType === ev.value ? 700 : 500, whiteSpace: 'nowrap' }}>
                      {ev.value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            {isCustom && (
              <TextField
                fullWidth size="small" label="Укажите тип мероприятия" name="eventTypeOther"
                value={form.eventTypeOther} onChange={h} sx={{ mt: 1.5 }}
                autoFocus
              />
            )}
          </Box>

          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} sm={5}>
              <TextField fullWidth label="Дата" size="small" name="eventDate" value={form.eventDate} onChange={h} type="date" InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Box sx={{ px: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <RestaurantIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    Количество гостей: <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>{form.guests}</Box>
                  </Typography>
                </Box>
                <Slider
                  value={form.guests}
                  onChange={(_, v) => setForm({ ...form, guests: v })}
                  min={1} max={500}
                  marks={guestsMarks}
                  sx={{
                    color: 'secondary.main',
                    '& .MuiSlider-markLabel': { fontSize: '0.7rem' },
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <TextField fullWidth label="Пожелания" size="small" name="message" value={form.message} onChange={h} multiline rows={3} />
        </Box>
      </DialogContent>

      <Box sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button
          onClick={submit}
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          disabled={!canSubmit}
          sx={{
            color: 'white', py: 1.5, fontSize: '1rem', fontWeight: 700,
            borderRadius: 2,
            position: 'relative', overflow: 'hidden',
            '&::after': !animating ? {} : {
              content: '""',
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
              animation: 'shimmer 0.6s ease',
            },
            '@keyframes shimmer': {
              '0%': { transform: 'translateX(-100%)' },
              '100%': { transform: 'translateX(100%)' },
            },
            '&:hover:not(:disabled)': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(198,168,98,0.4)',
            },
            '&:active:not(:disabled)': {
              transform: 'translateY(0)',
            },
            transition: 'all 0.25s ease',
          }}
        >
          {animating ? '✓ Отправлено!' : 'Отправить заявку'}
        </Button>
      </Box>
    </Dialog>
  )
}
