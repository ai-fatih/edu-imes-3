import { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import MenuBookIcon from '@mui/icons-material/MenuBook'

const articles = [
  {
    category: 'Алкоголь',
    items: [
      {
        title: 'Как выбрать вино на банкет',
        content: 'Для банкета на 50+ человек выбирайте вино в категории «столовое» — оно не уступает премиальному в массовом потреблении. Соотношение красного к белому: 60/40 для зимы, 40/60 для лета. Средний расход: 1 бутылка на 3 человека за час.',
      },
      {
        title: 'Сколько алкоголя нужно на мероприятие',
        content: 'Универсальная формула: (кол-во гостей × часы × коэффициент). Для свадьбы: 0.18 бут. вина/чел/час, 0.12 игристого, 0.06 крепкого. Для корпоратива: больше крепкого (0.1) и пива (0.15), меньше игристого (0.06). Всегда закладывайте +10% запаса.',
      },
      {
        title: '10 вопросов к поставщику алкоголя',
        content: '1. Есть ли сертификаты происхождения? 2. Возврат неиспользованного? 3. Доставка и подъём на этаж? 4. Охлаждение перед подачей? 5. Отсрочка платежа? 6. Разбитые бутылки — замена? 7. Минимальная партия? 8. Сроки поставки? 9. Образцы для дегустации? 10. Цена фиксируется на какой срок?',
      },
    ],
  },
  {
    category: 'Меню',
    items: [
      {
        title: 'Как площадки накручивают цены на меню',
        content: '5 основных схем: 1) «Воздух» в меню — позиции с наценкой 500%+ (фуа-гра, трюфель). 2) Замена продукта — в спецификации дорогой продукт, по факту дешёвый. 3) Недовес — порции на 10-20% меньше заявленных. 4) Двойная наценка на алкоголь — до 300% от закупки. 5) Обязательный «сервисный сбор» 10-15%, который не идёт официантам.',
      },
      {
        title: 'Холодные закуски: расчёт на человека',
        content: 'Оптимально: 5-7 видов холодных закусок, 200-250 г на человека. Ассорти мясное — 50 г/чел, сырная тарелка — 40 г/чел, овощи — 60 г/чел, рыба — 40 г/чел. Не заказывайте фуа-гра на банкет — гости не оценят, а площадка накрутит 400%.',
      },
      {
        title: 'Горячее: банкет vs фуршет',
        content: 'Банкет: 2 вида горячего (мясо + рыба/птица), 250-300 г на человека. Фуршет: 1 вид горячего миниатюрами, 150 г на человека. Разница в стоимости: банкетное горячее дороже на 30-40% из-за порционной подачи. PBS рекомендует: для свадьбы — банкет, для корпоратива — фуршет.',
      },
    ],
  },
  {
    category: 'Площадки',
    items: [
      {
        title: 'Чек-лист выезда на площадку',
        content: '1. Состояние кухни: вентиляция, чистота, пожарная безопасность. 2. Холодильное оборудование: температура, объём. 3. Склад: условия хранения продуктов. 4. Зал: рассадка, акустика, освещение. 5. Туалетные комнаты: количество на гостей, чистота. 6. Грузовой лифт. 7. Парковка. 8. Запасные выходы. 9. Наличие генератора. 10. Договорная база: штрафы за отмену, форс-мажор.',
      },
      {
        title: 'Как проверять договор с площадкой',
        content: 'Обращайте внимание: 1) Штраф за отмену — не более 30% за 14 дней. 2) Форс-мажор — полный возврат. 3) Ответственность за отравление — лежит на площадке. 4) Право замены блюд — только с согласия заказчика. 5) Залог за оборудование — адекватная сумма. 6) Время на подготовку и уборку — включено в аренду.',
      },
      {
        title: 'Рейтинг площадок Москвы (внутренний)',
        content: 'PBS ведёт чёрный и белый списки площадок по результатам выездов. Критерии: честность сметы, качество продуктов, соблюдение договорённостей, отзывы клиентов. Свяжитесь с PBS для консультации по конкретной площадке.',
      },
    ],
  },
  {
    category: 'Обслуживание',
    items: [
      {
        title: 'Сколько нужно официантов',
        content: 'Банкет: 1 официант на 10-12 гостей. Фуршет: 1 на 15-20 гостей. Коктейль: 1 на 25-30. Важно: площадки часто ставят 1 на 15 при банкете — это нарушение, гости будут ждать. Прописывайте норму в договоре.',
      },
      {
        title: 'Тайминг подачи блюд',
        content: 'Оптимальный тайминг: Аперитив (30 мин) → Холодные закуски (40 мин) → Горячие закуски (20 мин) → Основное блюдо (40 мин) → Десерт (20 мин) → Чай/кофе (30 мин). Между подачами — пауза не более 10 мин. Если площадка затягивает — это способ сэкономить на персонале.',
      },
    ],
  },
]

export default function KnowledgeBase() {
  const [search, setSearch] = useState('')

  const filtered = articles
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.content.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.items.length > 0)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
        pt: { xs: 10, md: 12 },
        pb: 6,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <MenuBookIcon color="secondary" /> База знаний F&B
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Статьи, чек-листы и калькуляторы от PBS
          </Typography>
        </Box>

        <TextField
          fullWidth
          size="small"
          placeholder="Поиск по статьям..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 3 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        {filtered.map((cat) => (
          <Box key={cat.category} sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
              {cat.category}
            </Typography>
            {cat.items.map((a) => (
              <Accordion
                key={a.title}
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.100',
                  borderRadius: '12px !important',
                  mb: 1,
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2" fontWeight={600}>{a.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {a.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}
      </Container>
    </Box>
  )
}
