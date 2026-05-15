import { useCallback } from 'react'

const REMINDER_PREFIX = 'bs_reminder_'

export default function useNotificationReminder() {
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      alert('Ваш браузер не поддерживает уведомления')
      return false
    }
    if (Notification.permission === 'granted') return true
    if (Notification.permission === 'denied') {
      alert('Уведомления заблокированы. Разрешите их в настройках браузера.')
      return false
    }
    const result = await Notification.requestPermission()
    return result === 'granted'
  }, [])

  const scheduleReminder = useCallback(
    (orderId, eventDate, daysBefore = 7) => {
      const key = REMINDER_PREFIX + orderId
      if (localStorage.getItem(key)) return false

      const eventTime = new Date(eventDate).getTime()
      const now = Date.now()
      const msBefore = daysBefore * 24 * 60 * 60 * 1000
      const reminderTime = eventTime - msBefore

      if (reminderTime <= now) {
        if (requestPermission()) {
          new Notification('Professional Banquet Service', {
            body: `До мероприятия осталось ${daysBefore} дней!`,
            icon: '/favicon.svg',
          })
          localStorage.setItem(key, '1')
          return true
        }
        return false
      }

      const delay = reminderTime - now
      const timeoutId = setTimeout(async () => {
        const granted = await requestPermission()
        if (granted) {
          new Notification('Professional Banquet Service', {
            body: `Напоминание: до мероприятия ${daysBefore} дней!`,
            icon: '/favicon.svg',
          })
          localStorage.setItem(key, '1')
        }
      }, delay)

      return timeoutId
    },
    [requestPermission],
  )

  const cancelReminder = useCallback((orderId) => {
    const key = REMINDER_PREFIX + orderId
    localStorage.removeItem(key)
  }, [])

  const isReminderSet = useCallback((orderId) => {
    return !!localStorage.getItem(REMINDER_PREFIX + orderId)
  }, [])

  return { requestPermission, scheduleReminder, cancelReminder, isReminderSet }
}
