import { Box, Button } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

function generateIcs(order) {
  const fmt = (d) => {
    const s = new Date(d).toISOString()
    return s.replace(/[-:]/g, '').split('.')[0] + 'Z'
  }
  const dt = order.eventDate
  const start = fmt(dt)
  const end = fmt(new Date(new Date(dt).getTime() + 4 * 60 * 60 * 1000))
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PBS//Calendar//RU',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${order.eventType} — PBS`,
    `DESCRIPTION:Мероприятие: ${order.eventType}\\nГостей: ${order.guests}\\nМенеджер: ${order.managerName || ''}\\nТел: ${order.managerPhone || ''}`,
    `LOCATION:Уточняется`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

export default function CalendarSync({ order }) {
  if (!order?.eventDate) return null

  const handleDownload = () => {
    const ics = generateIcs(order)
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${order.eventType}_${order.eventDate}.ics`.replace(/[^a-zA-Z0-9._-]/g, '_')
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Box>
      <Button
        variant="outlined"
        size="small"
        startIcon={<CalendarMonthIcon />}
        onClick={handleDownload}
        sx={{ borderRadius: 10 }}
      >
        Добавить в календарь (.ics)
      </Button>
    </Box>
  )
}
