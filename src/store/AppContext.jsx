import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'bs_orders'

const sampleOrders = [
  {
    id: 'ORD-001',
    clientName: 'Иван Петров',
    clientPhone: '+7 (916) 555-12-34',
    clientEmail: 'ivan@example.com',
    eventType: 'Свадьба',
    eventDate: '2026-06-22',
    guests: 80,
    message: 'Нужно банкетное меню для свадьбы на 80 человек. Хотим алкоголь закупить самостоятельно через вас.',
    status: 'in_progress',
    stage: 'alcohol',
    stages: [
      { key: 'menu', label: 'Составление меню', status: 'done', date: '2026-05-14' },
      { key: 'alcohol', label: 'Подбор алкоголя', status: 'active', date: null },
      { key: 'venue', label: 'Выезд на площадку', status: 'pending', date: '2026-05-20' },
      { key: 'control', label: 'Контроль мероприятия', status: 'pending', date: null },
      { key: 'report', label: 'Пост-отчёт', status: 'pending', date: null },
    ],
    managerName: 'Ион Мельник',
    managerPhone: '+7 (964) 72-888-44',
    budgetOriginal: 450000,
    budgetFinal: 320000,
    budgetSavings: 130000,
    budgetSavingsPercent: 29,
    budgetBreakdown: [
      { item: 'Алкоголь', originalPrice: 180000, pbsPrice: 87000 },
      { item: 'Горячие закуски', originalPrice: 85000, pbsPrice: 62000 },
      { item: 'Холодные закуски', originalPrice: 65000, pbsPrice: 48000 },
      { item: 'Десерты', originalPrice: 45000, pbsPrice: 38000 },
      { item: 'Обслуживание', originalPrice: 75000, pbsPrice: 55000 },
    ],
    menus: {
      original: [
        { category: 'Холодные закуски', items: ['Ассорти мясное — 3200₽', 'Фуа-гра с бриошью — 4800₽', 'Лосось слабосолёный — 2800₽'] },
        { category: 'Горячие закуски', items: ['Креветки темпура — 6400₽', 'Говядина веллингтон — 12000₽'] },
        { category: 'Десерты', items: ['Чизкейк Нью-Йорк — 4500₽', 'Шоколадный фондан — 3800₽'] },
      ],
      pbs: [
        { category: 'Холодные закуски', items: ['Ассорти мясное — 3200₽', 'Тартар из лосося — 3200₽ (было 4800)', 'Лосось слабосолёный — 2800₽'] },
        { category: 'Горячие закуски', items: ['Креветки темпура — 6400₽', 'Стейк из говядины — 7800₽ (было 12000)'] },
        { category: 'Десерты', items: ['Чизкейк Нью-Йорк — 4500₽', 'Шоколадный фондан — 3800₽'] },
      ],
    },
    alcoholPlan: {
      items: [
        { name: 'Johnnie Walker Black Label', qty: 12, supplierPrice: 2500, marketPrice: 8500 },
        { name: 'Sofitel Champagne', qty: 8, supplierPrice: 3200, marketPrice: 12000 },
        { name: 'Martini Bianco', qty: 6, supplierPrice: 1200, marketPrice: 3500 },
        { name: 'Вино красное Италия', qty: 15, supplierPrice: 1800, marketPrice: 5200 },
        { name: 'Вино белое Франция', qty: 15, supplierPrice: 1600, marketPrice: 4800 },
      ],
      supplierName: 'ООО "Винный дом"',
    },
    venueInspection: {
      venueName: 'Лофт «Индустрия»',
      date: '2026-05-20',
      rating: 4,
      findings: [
        { category: 'Кухня', issue: 'Недостаточная вентиляция', severity: 'mid', resolved: true },
        { category: 'Склад', issue: 'Температура хранения выше нормы', severity: 'high', resolved: false },
        { category: 'Зал', issue: 'Не хватает розеток для доп. оборудования', severity: 'low', resolved: true },
      ],
      notes: 'В целом площадка хорошая, но нужен контроль холодильников в день мероприятия.',
    },
    postReport: {
      overallGrade: 'B',
      violations: [
        { description: 'Замена охлаждённой рыбы на заморозку', severity: 'high', resolved: true },
        { description: 'Официант на 4 стола вместо 3 по договору', severity: 'mid', resolved: true },
        { description: 'Подача десертов с опозданием 15 мин', severity: 'low', resolved: false },
      ],
      alcoholReturned: { bottles: 3, value: 12000 },
      timingDeviations: [],
      recommendations: [
        'Усилить контроль кухни перед следующим мероприятием',
        'Закрепить в договоре штраф за замену продуктов',
      ],
    },
    nps: null,
    npsComment: '',
    documents: [
      { name: 'Смета_площадки.pdf', type: 'estimate_original', url: null },
      { name: 'Смета_оптимизация_PBS.pdf', type: 'estimate_pbs', url: null },
      { name: 'Меню_оригинал.pdf', type: 'menu_original', url: null },
      { name: 'Меню_финал.pdf', type: 'menu_final', url: null },
      { name: 'Расчёт_алкоголя.pdf', type: 'alcohol_calc', url: null },
    ],
    createdAt: '2026-05-10T10:30:00.000Z',
    comments: [
      { id: 'c1', text: 'Заявка принята. Начинаем составление меню.', author: 'employee', authorName: 'Ион Мельник', createdAt: '2026-05-10T11:00:00.000Z', stageKey: 'menu' },
      { id: 'c2', text: 'Подготовили три варианта меню. Заменили фуа-гра на тартар из лосося — экономия 800₽ с порции.', author: 'employee', authorName: 'Ион Мельник', createdAt: '2026-05-11T09:00:00.000Z', stageKey: 'menu' },
      { id: 'c3', text: 'Меню утвердили. Переходим к расчёту алкоголя.', author: 'employee', authorName: 'Ион Мельник', createdAt: '2026-05-12T14:00:00.000Z', stageKey: 'menu' },
      { id: 'c4', text: 'Вино подтверждаю, давайте красное и белое поровну.', author: 'client', authorName: 'Иван Петров', createdAt: '2026-05-13T10:00:00.000Z', stageKey: 'alcohol' },
      { id: 'c5', text: 'Принято. Дозакажем по 6 бутылок. Цена: 1800 vs 5200 в ресторане.', author: 'employee', authorName: 'Ион Мельник', createdAt: '2026-05-13T10:30:00.000Z', stageKey: 'alcohol' },
    ],
  },
  {
    id: 'ORD-002',
    clientName: 'Мария Соколова',
    clientPhone: '+7 (903) 555-67-89',
    clientEmail: 'maria@example.com',
    eventType: 'Корпоратив',
    eventDate: '2026-07-15',
    guests: 120,
    message: 'Нужен полный расчёт и закуп алкоголя для корпоратива IT-компании. Премиальный сегмент.',
    status: 'in_progress',
    stage: 'menu',
    stages: [
      { key: 'menu', label: 'Составление меню', status: 'active', date: null },
      { key: 'alcohol', label: 'Подбор алкоголя', status: 'pending', date: null },
      { key: 'venue', label: 'Выезд на площадку', status: 'done', date: '2026-05-10' },
      { key: 'control', label: 'Контроль мероприятия', status: 'pending', date: null },
      { key: 'report', label: 'Пост-отчёт', status: 'pending', date: null },
    ],
    managerName: 'Ион Мельник',
    managerPhone: '+7 (964) 72-888-44',
    budgetOriginal: 620000,
    budgetFinal: 458000,
    budgetSavings: 162000,
    budgetSavingsPercent: 26,
    budgetBreakdown: [
      { item: 'Алкоголь', originalPrice: 210000, pbsPrice: 115000 },
      { item: 'Горячие блюда', originalPrice: 180000, pbsPrice: 138000 },
      { item: 'Закуски', originalPrice: 110000, pbsPrice: 85000 },
      { item: 'Десерты и фрукты', originalPrice: 60000, pbsPrice: 52000 },
      { item: 'Обслуживание', originalPrice: 60000, pbsPrice: 48000 },
    ],
    menus: {
      original: [
        { category: 'Закуски', items: ['Брускетты (5 видов) — 8000₽', 'Овощная тарелка — 4500₽', 'Пармская ветчина с дыней — 6500₽'] },
        { category: 'Горячее', items: ['Рибай-стейк — 25000₽', 'Лосось на гриле — 18000₽'] },
        { category: 'Десерты', items: ['Чизкейк — 7000₽', 'Тирамису — 6000₽'] },
      ],
      pbs: [
        { category: 'Закуски', items: ['Брускетты (3 вида) — 5500₽ (было 8000)', 'Овощная тарелка — 4500₽', 'Сырная тарелка — 3500₽ (добавлено)'] },
        { category: 'Горячее', items: ['Стейк из говядины — 18000₽ (было 25000)', 'Лосось на гриле — 18000₽'] },
        { category: 'Десерты', items: ['Чизкейк — 7000₽', 'Тирамису — 6000₽'] },
      ],
    },
    alcoholPlan: {
      items: [
        { name: 'Hennessy XO', qty: 6, supplierPrice: 8500, marketPrice: 22000 },
        { name: 'Moët & Chandon', qty: 10, supplierPrice: 4500, marketPrice: 14000 },
        { name: 'Jameson Whiskey', qty: 8, supplierPrice: 1800, marketPrice: 5500 },
        { name: 'Вино красное Чили', qty: 20, supplierPrice: 1400, marketPrice: 3800 },
        { name: 'Вино белое Новая Зеландия', qty: 20, supplierPrice: 1500, marketPrice: 4200 },
      ],
      supplierName: 'ООО "Винный дом"',
    },
    venueInspection: {
      venueName: 'Конгресс-Отель',
      date: '2026-05-10',
      rating: 5,
      findings: [],
      notes: 'Отличная площадка. Всё соответствует стандартам. Рекомендуем для премиальных мероприятий.',
    },
    postReport: {
      overallGrade: 'A',
      violations: [],
      alcoholReturned: { bottles: 0, value: 0 },
      timingDeviations: [],
      recommendations: ['Продолжать сотрудничество с Конгресс-Отелем'],
    },
    nps: null,
    npsComment: '',
    documents: [
      { name: 'Смета_площадки.pdf', type: 'estimate_original', url: null },
      { name: 'Анализ_меню_PBS.pdf', type: 'menu_analysis', url: null },
      { name: 'Акт_осмотра.pdf', type: 'inspection_act', url: null },
    ],
    createdAt: '2026-05-12T14:00:00.000Z',
    comments: [
      { id: 'c6', text: 'Сделали первичный анализ меню площадки. Нашли завышение на 26%.', author: 'employee', authorName: 'Ион Мельник', createdAt: '2026-05-13T10:00:00.000Z', stageKey: 'menu' },
      { id: 'c7', text: 'Выезд на площадку прошёл отлично. Конгресс-Отель — 5/5.', author: 'employee', authorName: 'Ион Мельник', createdAt: '2026-05-10T16:00:00.000Z', stageKey: 'venue' },
    ],
  },
]

const STATUS_LABELS = {
  new: 'Новая',
  confirmed: 'Подтверждена',
  in_progress: 'В работе',
  completed: 'Выполнена',
  cancelled: 'Отменена',
}

const STATUS_COLORS = {
  new: 'info',
  confirmed: 'primary',
  in_progress: 'warning',
  completed: 'success',
  cancelled: 'error',
}

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : sampleOrders
  } catch {
    return sampleOrders
  }
}

function ordersReducer(state, action) {
  switch (action.type) {
    case 'ADD_ORDER':
      return [action.payload, ...state]
    case 'UPDATE_STATUS': {
      const { id, status } = action.payload
      return state.map((o) =>
        o.id === id
          ? {
              ...o,
              status,
              comments: [
                ...o.comments,
                {
                  id: `c${Date.now()}`,
                  text: `Статус изменён на «${STATUS_LABELS[status]}»`,
                  author: 'system',
                  authorName: '',
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : o,
      )
    }
    case 'ADD_COMMENT': {
      const { id, comment } = action.payload
      return state.map((o) =>
        o.id === id ? { ...o, comments: [...o.comments, comment] } : o,
      )
    }
    case 'UPDATE_NOTES': {
      const { id, notes } = action.payload
      return state.map((o) =>
        o.id === id ? { ...o, employeeNotes: notes } : o,
      )
    }
    case 'UPDATE_NPS': {
      const { id, nps, npsComment } = action.payload
      return state.map((o) =>
        o.id === id ? { ...o, nps, npsComment } : o,
      )
    }
    default:
      return state
  }
}

const Ctx = createContext(null)

export function AppProvider({ children }) {
  const [orders, dispatch] = useReducer(ordersReducer, [], loadOrders)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  }, [orders])

  const addOrder = useCallback(
    (order) => {
      dispatch({
        type: 'ADD_ORDER',
        payload: {
          ...order,
          id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
          comments: [],
          employeeNotes: '',
          createdAt: new Date().toISOString(),
          stage: 'menu',
          stages: [
            { key: 'menu', label: 'Составление меню', status: 'active', date: null },
            { key: 'alcohol', label: 'Подбор алкоголя', status: 'pending', date: null },
            { key: 'venue', label: 'Выезд на площадку', status: 'pending', date: null },
            { key: 'control', label: 'Контроль мероприятия', status: 'pending', date: null },
            { key: 'report', label: 'Пост-отчёт', status: 'pending', date: null },
          ],
          managerName: 'Ион Мельник',
          managerPhone: '+7 (964) 72-888-44',
          budgetOriginal: 0,
          budgetFinal: 0,
          budgetSavings: 0,
          budgetSavingsPercent: 0,
          budgetBreakdown: [],
          alcoholPlan: { items: [], supplierName: '' },
          venueInspection: null,
          menus: null,
        },
      })
    },
    [orders.length],
  )

  const updateStatus = useCallback(
    (id, status) => dispatch({ type: 'UPDATE_STATUS', payload: { id, status } }),
    [],
  )

  const addComment = useCallback(
    (id, text, author, authorName, stageKey) => {
      dispatch({
        type: 'ADD_COMMENT',
        payload: {
          id,
          comment: {
            id: `c${Date.now()}`,
            text,
            author,
            authorName,
            createdAt: new Date().toISOString(),
            stageKey: stageKey || null,
          },
        },
      })
    },
    [],
  )

  const updateNotes = useCallback(
    (id, notes) => dispatch({ type: 'UPDATE_NOTES', payload: { id, notes } }),
    [],
  )

  const updateNps = useCallback(
    (id, nps, npsComment) =>
      dispatch({ type: 'UPDATE_NPS', payload: { id, nps, npsComment } }),
    [],
  )

  return (
    <Ctx.Provider
      value={{
        orders,
        addOrder,
        updateStatus,
        addComment,
        updateNotes,
        updateNps,
        STATUS_LABELS,
        STATUS_COLORS,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
