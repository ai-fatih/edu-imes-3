import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'pbs_orders'

const sampleOrders = [
  {
    id: 'ORD-001', clientName: 'Иван Петров', clientPhone: '+7 (916) 555-12-34',
    clientEmail: 'ivan@example.com', eventType: 'Свадьба',
    eventDate: '22.06.2026', guests: 80,
    message: 'Хотим свадьбу на 80 человек в загородном стиле',
    status: 'in_progress', createdAt: '2026-05-10T10:30:00.000Z',
    comments: [
      { id: 'c1', text: 'Заявка принята. Подбираем площадки.', author: 'employee', authorName: 'Анна Менеджер', createdAt: '2026-05-10T11:00:00.000Z' },
      { id: 'c2', text: 'Рассматриваем варианты шатра и банкетного зала.', author: 'employee', authorName: 'Анна Менеджер', createdAt: '2026-05-11T09:00:00.000Z' },
    ],
    employeeNotes: 'Клиент хочет шатер или банкетный зал. Бюджет до 500к.',
  },
  {
    id: 'ORD-002', clientName: 'Мария Соколова', clientPhone: '+7 (903) 555-67-89',
    clientEmail: 'maria@example.com', eventType: 'Корпоратив',
    eventDate: '15.12.2026', guests: 120,
    message: 'Нужен корпоратив для IT-компании с ведущим',
    status: 'confirmed', createdAt: '2026-05-12T14:00:00.000Z',
    comments: [
      { id: 'c3', text: 'Подтверждено. Площадка: Лофт «Индустрия».', author: 'employee', authorName: 'Анна Менеджер', createdAt: '2026-05-13T10:00:00.000Z' },
    ],
    employeeNotes: 'Корпоратив в декабре. Нужна программа с ведущим.',
  },
  {
    id: 'ORD-003', clientName: 'Иван Петров', clientPhone: '+7 (916) 555-12-34',
    clientEmail: 'ivan@example.com', eventType: 'День рождения',
    eventDate: '05.07.2026', guests: 30,
    message: 'День рождения на 30 человек, нужен кейтеринг',
    status: 'new', createdAt: '2026-05-14T16:00:00.000Z',
    comments: [], employeeNotes: '',
  },
  {
    id: 'ORD-004', clientName: 'Алексей Смирнов', clientPhone: '+7 (495) 777-88-99',
    clientEmail: 'alex@example.com', eventType: 'Бизнес-форум',
    eventDate: '10.07.2026', guests: 200,
    message: 'Форум на 200 человек с презентациями и кофе-брейком',
    status: 'new', createdAt: '2026-05-15T09:00:00.000Z',
    comments: [], employeeNotes: '',
  },
  {
    id: 'ORD-005', clientName: 'Иван Петров', clientPhone: '+7 (916) 555-12-34',
    clientEmail: 'ivan@example.com', eventType: 'Мастер-класс',
    eventDate: '18.08.2026', guests: 15,
    message: 'Кулинарный мастер-класс на 15 человек',
    status: 'completed', createdAt: '2026-04-01T08:00:00.000Z',
    comments: [
      { id: 'c4', text: 'Мероприятие проведено успешно. Клиент доволен.', author: 'employee', authorName: 'Анна Менеджер', createdAt: '2026-04-18T17:00:00.000Z' },
    ],
    employeeNotes: 'Проведено на площадке заказчика.',
  },
]

const STATUS_LABELS = {
  new: 'Новая', confirmed: 'Подтверждена', in_progress: 'В работе',
  completed: 'Выполнена', cancelled: 'Отменена',
}

const STATUS_COLORS = {
  new: 'info', confirmed: 'primary', in_progress: 'warning',
  completed: 'success', cancelled: 'error',
}

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : sampleOrders
  } catch { return sampleOrders }
}

function ordersReducer(state, action) {
  switch (action.type) {
    case 'ADD_ORDER':
      return [action.payload, ...state]
    case 'UPDATE_STATUS': {
      const { id, status } = action.payload
      return state.map(o => o.id === id ? { ...o, status, comments: [...o.comments, {
        id: `c${Date.now()}`, text: `Статус изменён на «${STATUS_LABELS[status]}»`,
        author: 'system', authorName: '', createdAt: new Date().toISOString(),
      }]} : o)
    }
    case 'ADD_COMMENT': {
      const { id, comment } = action.payload
      return state.map(o => o.id === id ? { ...o, comments: [...o.comments, comment] } : o)
    }
    case 'UPDATE_NOTES': {
      const { id, notes } = action.payload
      return state.map(o => o.id === id ? { ...o, employeeNotes: notes } : o)
    }
    default:
      return state
  }
}

const Ctx = createContext(null)

export function AppProvider({ children }) {
  const [orders, dispatch] = useReducer(ordersReducer, [], loadOrders)

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(orders)) }, [orders])

  const addOrder = useCallback((order) => {
    dispatch({ type: 'ADD_ORDER', payload: { ...order, id: `ORD-${String(orders.length + 1).padStart(3, '0')}`, comments: [], employeeNotes: '', createdAt: new Date().toISOString() } })
  }, [orders.length])

  const updateStatus = useCallback((id, status) => dispatch({ type: 'UPDATE_STATUS', payload: { id, status } }), [])
  const addComment = useCallback((id, text, author, authorName) => dispatch({
    type: 'ADD_COMMENT', payload: { id, comment: { id: `c${Date.now()}`, text, author, authorName, createdAt: new Date().toISOString() } },
  }), [])
  const updateNotes = useCallback((id, notes) => dispatch({ type: 'UPDATE_NOTES', payload: { id, notes } }), [])

  return (
    <Ctx.Provider value={{ orders, addOrder, updateStatus, addComment, updateNotes, STATUS_LABELS, STATUS_COLORS }}>
      {children}
    </Ctx.Provider>
  )
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
