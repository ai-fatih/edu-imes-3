# Приложения

## Приложение A. Дневник практики

| Дата | День | Деятельность | Отметка рук. |
|------|------|-------------|--------------|
| 05.05 | 1 | Вводное собрание. Знакомство с компанией PBS, распределение ролей | |
| 06.05 | 2 | Интервью с заказчиком. Выявление текущих проблем и потребностей | |
| 07.05 | 3 | Анализ конкурентов. Изучение сайтов других event-компаний | |
| 08.05 | 4 | Сбор и формализация требований. Составление ТЗ | |
| 11.05 | 5 | Выбор технологического стека. Настройка проекта (React + Vite + MUI) | |
| 12.05 | 6 | Прототипирование интерфейсов в Figma | |
| 13.05 | 7 | Моделирование данных. Разработка архитектуры компонентов | |
| 14.05 | 8 | Разработка лендинга (Hero, Services, About, Contact) | |
| 15.05 | 9 | Разработка формы заказа с современным UX | |
| 18.05 | 10 | Разработка навигации и темы MUI | |
| 19.05 | 11 | Разработка страницы входа и личного кабинета клиента | |
| 20.05 | 12 | Разработка CRM-панели сотрудника | |
| 21.05 | 13 | Интеграция состояния (Context + localStorage) | |
| 22.05 | 14 | Тестирование функциональности. Исправление замечаний | |
| 03.06 | 15 | Редизайн UI/UX. Scroll-анимации, визуальная форма заказа | |
| 04.06 | 16 | Финальное тестирование. Подготовка документации | |
| 05.06 | 17 | Оформление отчёта. Публикация на Vercel. Защита | |

---

## Приложение B. Фрагменты кода

### B.1 Главный компонент приложения (App.jsx)

```jsx
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { AppProvider } from './store/AppContext'
import theme from './theme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </AppProvider>
    </ThemeProvider>
  )
}
```

### B.2 Контекст состояния (AppContext.jsx — ключевые части)

```jsx
const STORAGE_KEY = 'pbs_orders'

function ordersReducer(state, action) {
  switch (action.type) {
    case 'ADD_ORDER':
      return [action.payload, ...state]
    case 'UPDATE_STATUS':
      return state.map(o => o.id === action.payload.id ? {
        ...o,
        status: action.payload.status,
        comments: [...o.comments, {
          id: `c${Date.now()}`,
          text: `Статус изменён на «${STATUS_LABELS[action.payload.status]}»`,
          author: 'system',
          createdAt: new Date().toISOString(),
        }]
      } : o)
    case 'ADD_COMMENT':
      return state.map(o => o.id === action.payload.id
        ? { ...o, comments: [...o.comments, action.payload.comment] }
        : o)
    default:
      return state
  }
}
```

### B.3 Форма заказа (OrderModal.jsx — визуальный выбор типа)

```jsx
const presetEvents = [
  { value: 'Свадьба', icon: <CelebrationIcon />, color: '#e91e63' },
  { value: 'Корпоратив', icon: <BusinessIcon />, color: '#1565c0' },
  { value: 'День рождения', icon: <CakeIcon />, color: '#ff6f00' },
  { value: 'Бизнес-форум', icon: <ForumIcon />, color: '#2e7d32' },
  { value: 'Кейтеринг', icon: <LunchDiningIcon />, color: '#6a1b9a' },
  { value: 'Другое', icon: <MoreHorizIcon />, color: '#757575' },
]

{presetEvents.map((ev) => (
  <Box onClick={() => selectType(ev.value)} sx={{
    display: 'flex', alignItems: 'center', gap: 0.75,
    px: 2, py: 1.25, borderRadius: 3, cursor: 'pointer',
    border: '2px solid',
    borderColor: form.eventType === ev.value ? ev.color : 'grey.200',
    '&:hover': { borderColor: ev.color },
    transition: 'all 0.2s ease',
  }}>
    {ev.icon}
    <Typography variant="body2" fontWeight={form.eventType === ev.value ? 700 : 500}>
      {ev.value}
    </Typography>
  </Box>
))}
```

### B.4 Хук анимации (useInView.js)

```jsx
import { useEffect, useRef, useState } from 'react'

export default function useInView({ threshold = 0.15, triggerOnce = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) observer.unobserve(el)
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, triggerOnce])

  return [ref, inView]
}
```

---

## Приложение C. Скриншоты интерфейса

*Скриншоты будут добавлены после финального деплоя.*

| Экран | Описание |
|-------|----------|
| `screenshot-1.png` | Главная страница (Hero-блок) |
| `screenshot-2.png` | Секция услуг и о компании |
| `screenshot-3.png` | Форма заказа (модальное окно) |
| `screenshot-4.png` | Страница входа (вкладки) |
| `screenshot-5.png` | Личный кабинет клиента |
| `screenshot-6.png` | CRM-панель сотрудника с сайдбаром |
| `screenshot-7.png` | Мобильная версия (Navbar drawer) |
| `screenshot-8.png` | Страница 404 |

---

## Приложение D. Схема навигации по сайту

```
┌──────────┐
│  Лендинг  │ ← Главная страница
│  (/)      │
└────┬─────┘
     │
     ├──→ Hero → [Заказать мероприятие] → OrderModal
     │
     ├──→ Услуги (#services)
     │
     ├──→ О компании (#about)
     │
     ├──→ Контакты (#contact)
     │
     └──→ Navbar → [Личный кабинет] → /login
                          │
                          └──→ [CRM] → /login (вкладка Сотрудник)
                                         │
                    ┌─────────────────────┤
                    ▼                     ▼
            ┌──────────────┐    ┌──────────────────┐
            │ /dashboard   │    │ /employee/       │
            │ (клиент)     │    │   dashboard      │
            │              │    │ (сотрудник/CRM)  │
            └──────────────┘    └──────────────────┘
```
