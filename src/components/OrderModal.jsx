import { useState } from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
  Grid, MenuItem, Box, Typography
} from '@mui/material'
import { useApp } from '../store/AppContext'

const eventTypes = ['Свадьба', 'Корпоратив', 'День рождения', 'Бизнес-форум', 'Кейтеринг', 'Мастер-класс', 'Другое']

const emptyForm = {
  clientName: '', clientPhone: '', clientEmail: '',
  eventType: '', eventDate: '', guests: '', message: '',
}

export default function OrderModal({ open, onClose }) {
  const { addOrder } = useApp()
  const [form, setForm] = useState(emptyForm)

  const h = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = () => {
    if (!form.clientName || !form.clientPhone || !form.eventType || !form.eventDate) return
    addOrder({ ...form, status: 'new', guests: Number(form.guests) || 0 })
    setForm(emptyForm)
    onClose()
  }

  const onCloseWrapped = () => { setForm(emptyForm); onClose() }

  return (
    <Dialog open={open} onClose={onCloseWrapped} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" fontWeight={700}>Заказать мероприятие</Typography>
        <Typography variant="body2" color="text.secondary">Заполните форму — мы перезвоним в течение 15 минут</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Ваше имя" size="small" name="clientName" value={form.clientName} onChange={h} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Телефон" size="small" name="clientPhone" value={form.clientPhone} onChange={h} required />
            </Grid>
          </Grid>
          <TextField fullWidth label="Email" size="small" name="clientEmail" value={form.clientEmail} onChange={h} type="email" />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Тип мероприятия" size="small" name="eventType" value={form.eventType} onChange={h} select required>
                {eventTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Дата" size="small" name="eventDate" value={form.eventDate} onChange={h} type="date" InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Гостей" size="small" name="guests" value={form.guests} onChange={h} type="number" />
            </Grid>
          </Grid>
          <TextField fullWidth label="Пожелания" size="small" name="message" value={form.message} onChange={h} multiline rows={3} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onCloseWrapped} variant="outlined" sx={{ color: 'text.secondary' }}>Отмена</Button>
        <Button onClick={submit} variant="contained" color="secondary" sx={{ color: 'white', px: 4 }} disabled={!form.clientName || !form.clientPhone || !form.eventType || !form.eventDate}>
          Отправить заявку
        </Button>
      </DialogActions>
    </Dialog>
  )
}
