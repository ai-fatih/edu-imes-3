import { useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote'
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Checkbox,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LiquorIcon from '@mui/icons-material/Liquor'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EventNoteIcon from '@mui/icons-material/EventNote'
import AssessmentIcon from '@mui/icons-material/Assessment'

const stageConfig = [
  { key: 'menu', label: 'МЕНЮ', icon: <MenuBookIcon /> },
  { key: 'alcohol', label: 'АЛКОГОЛЬ', icon: <LiquorIcon /> },
  { key: 'venue', label: 'ВЫЕЗД НА ПЛОЩАДКУ', icon: <LocationOnIcon /> },
  { key: 'control', label: 'КОНТРОЛЬ МЕРОПРИЯТИЯ', icon: <EventNoteIcon /> },
  { key: 'report', label: 'ПОСТ-ОТЧЁТ', icon: <AssessmentIcon /> },
]

function StatusIcon({ status }) {
  if (status === 'done') return <CheckCircleIcon color="success" />
  if (status === 'active')
    return (
      <AutorenewIcon
        color="secondary"
        sx={{ animation: 'spin 2s linear infinite' }}
      />
    )
  return <RadioButtonUncheckedIcon color="disabled" />
}

function StatusText({ stage }) {
  if (stage.status === 'done')
    return `Завершён${stage.date ? ` · ${stage.date}` : ''}`
  if (stage.status === 'active') return 'В работе'
  if (stage.date) return `Запланирован: ${stage.date}`
  return 'Ожидает'
}

function SeverityChip({ severity }) {
  const map = {
    high: { label: 'Высокий', color: 'error' },
    mid: { label: 'Средний', color: 'warning' },
    low: { label: 'Низкий', color: 'info' },
  }
  const s = map[severity] || { label: severity, color: 'default' }
  return (
    <Chip
      label={s.label}
      color={s.color}
      size="small"
      variant="outlined"
      sx={{ borderRadius: 6, fontSize: '0.7rem' }}
    />
  )
}

function StageMenu({ order }) {
  const [view, setView] = useState('pbs')
  const menus = order.menus
  if (!menus)
    return (
      <Typography variant="body2" color="text.secondary">
        Данные меню загружаются.
      </Typography>
    )

  const menuSavings = order.budgetBreakdown
    ? order.budgetBreakdown
        .filter((r) =>
          ['Горячие закуски', 'Холодные закуски', 'Десерты', 'Горячие блюда', 'Закуски', 'Десерты и фрукты'].includes(
            r.item,
          ),
        )
        .reduce((s, r) => s + (r.originalPrice - r.pbsPrice), 0)
    : 0

  return (
    <Box>
      <Typography
        variant="body2"
        color="success.main"
        fontWeight={600}
        sx={{ mb: 1.5 }}
      >
        ✅ Версия PBS утверждена
        {menuSavings > 0 &&
          `. Экономия на меню: ${menuSavings.toLocaleString('ru-RU')} ₽`}
      </Typography>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(e, v) => v && setView(v)}
        size="small"
        sx={{ mb: 2 }}
      >
        <ToggleButton
          value="original"
          sx={{ borderRadius: '8px 0 0 8px', fontSize: '0.75rem', px: 2 }}
        >
          Оригинал
        </ToggleButton>
        <ToggleButton
          value="pbs"
          sx={{ borderRadius: '0 8px 8px 0', fontSize: '0.75rem', px: 2 }}
        >
          PBS оптимизация
        </ToggleButton>
      </ToggleButtonGroup>

      {menus[view].map((cat, i) => (
        <Box key={i} sx={{ mb: 1.5 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 0.5, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 0.5 }}
          >
            {cat.category}
          </Typography>
          {cat.items.map((item, j) => (
            <Typography key={j} variant="body2" sx={{ pl: 1, mb: 0.25 }}>
              • {item}
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
  )
}

function StageAlcohol({ stage, order }) {
  const plan = order.alcoholPlan
  if (!plan?.items?.length)
    return (
      <Typography variant="body2" color="text.secondary">
        Расчёт алкоголя не готов.
      </Typography>
    )
  const totalSupplier = plan.items.reduce(
    (s, i) => s + i.supplierPrice * i.qty,
    0,
  )
  const totalMarket = plan.items.reduce((s, i) => s + i.marketPrice * i.qty, 0)
  return (
    <Box>
      {stage.status === 'active' && (
        <Typography
          variant="body2"
          color="secondary.main"
          fontWeight={600}
          sx={{ mb: 1.5 }}
        >
          🔄 Закупка согласована. Поставщик: {plan.supplierName}
        </Typography>
      )}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                Позиция
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 700, fontSize: '0.75rem' }}
              >
                Кол-во
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 700, fontSize: '0.75rem' }}
              >
                Закуп
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 700, fontSize: '0.75rem' }}
              >
                В ресторане
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 700, fontSize: '0.75rem' }}
              >
                Экономия
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plan.items.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.qty} шт.</TableCell>
                <TableCell align="right">
                  {item.supplierPrice.toLocaleString('ru-RU')} ₽
                </TableCell>
                <TableCell align="right">
                  {item.marketPrice.toLocaleString('ru-RU')} ₽
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: 'success.main', fontWeight: 600 }}
                >
                  −
                  {(
                    (item.marketPrice - item.supplierPrice) *
                    item.qty
                  ).toLocaleString('ru-RU')}{' '}
                  ₽
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Итого</TableCell>
              <TableCell />
              <TableCell
                align="right"
                sx={{ fontWeight: 700, color: 'success.main' }}
              >
                {totalSupplier.toLocaleString('ru-RU')} ₽
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                {totalMarket.toLocaleString('ru-RU')} ₽
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 700, color: 'success.main' }}
              >
                −{(totalMarket - totalSupplier).toLocaleString('ru-RU')} ₽
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
        <Chip
          icon={<LiquorIcon />}
          label="Полный расчёт"
          color="secondary"
          size="small"
          sx={{ borderRadius: 8, color: 'white' }}
        />
        {stage.status === 'active' && (
          <Chip
            label="Подтвердить закупку"
            variant="outlined"
            size="small"
            sx={{ borderRadius: 8 }}
          />
        )}
      </Box>
    </Box>
  )
}

function StageVenue({ order }) {
  const vi = order.venueInspection
  if (!vi)
    return (
      <Typography variant="body2" color="text.secondary">
        Данные осмотра площадки не готовы.
      </Typography>
    )
  return (
    <Box>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
        Площадка: {vi.venueName}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Оценка:
        </Typography>
        {vi.rating &&
          [1, 2, 3, 4, 5].map((i) => (
            <Box
              key={i}
              component="span"
              sx={{
                color: i <= vi.rating ? 'secondary.main' : 'grey.300',
                fontSize: 18,
              }}
            >
              ★
            </Box>
          ))}
      </Box>
      {vi.findings?.length > 0 && (
        <>
          <Typography
            variant="body2"
            color="warning.main"
            fontWeight={600}
            sx={{ mb: 0.5 }}
          >
            ⚠ Найдено замечаний: {vi.findings.length}
          </Typography>
          {vi.findings.map((f, i) => (
            <Box
              key={i}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}
            >
              <Checkbox checked={f.resolved} size="small" disabled sx={{ p: 0 }} />
              <Typography variant="body2">{f.issue}</Typography>
              <SeverityChip severity={f.severity} />
            </Box>
          ))}
        </>
      )}
      {vi.notes && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, fontStyle: 'italic' }}
        >
          {vi.notes}
        </Typography>
      )}
      <Chip
        icon={<LocationOnIcon />}
        label="Результаты осмотра"
        variant="outlined"
        size="small"
        sx={{ borderRadius: 8, mt: 1 }}
      />
    </Box>
  )
}

function StageReport({ order }) {
  const r = order.postReport
  if (!r)
    return (
      <Box sx={{ py: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Пост-отчёт ещё не готов.
        </Typography>
      </Box>
    )

  const gradeColors = { A: 'success', B: 'warning', C: 'error' }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="body2" fontWeight={500}>
          Общая оценка:
        </Typography>
        <Chip
          label={r.overallGrade}
          color={gradeColors[r.overallGrade] || 'default'}
          sx={{ fontWeight: 700, borderRadius: 8, fontSize: '0.9rem' }}
        />
      </Box>

      {r.violations?.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            color="error.main"
            sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            Нарушения
          </Typography>
          {r.violations.map((v, i) => (
            <Box
              key={i}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}
            >
              <Checkbox checked={v.resolved} disabled size="small" sx={{ p: 0 }} />
              <Typography variant="body2">{v.description}</Typography>
              <SeverityChip severity={v.severity} />
            </Box>
          ))}
        </Box>
      )}

      {r.alcoholReturned && r.alcoholReturned.bottles > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            Возврат алкоголя
          </Typography>
          <Typography variant="body2">
            {r.alcoholReturned.bottles} бут. на сумму{' '}
            {r.alcoholReturned.value.toLocaleString('ru-RU')} ₽
          </Typography>
        </Box>
      )}

      {r.recommendations?.length > 0 && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            Рекомендации
          </Typography>
          {r.recommendations.map((rec, i) => (
            <Typography key={i} variant="body2" sx={{ pl: 1 }}>
              • {rec}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  )
}

function StageDefault() {
  return (
    <Box sx={{ py: 2, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Этот этап будет доступен после завершения предыдущих.
      </Typography>
    </Box>
  )
}

function StageContent({ stage, order, onChangeRequest }) {
  return (
    <Box>
      {(() => {
        switch (stage.key) {
          case 'menu': return <StageMenu order={order} />
          case 'alcohol': return <StageAlcohol stage={stage} order={order} />
          case 'venue': return <StageVenue order={order} />
          case 'report': return <StageReport order={order} />
          default: return <StageDefault />
        }
      })()}
      {onChangeRequest && (
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'grey.100' }}>
          <Chip
            icon={<EditNoteIcon />}
            label="Запросить изменение по этому этапу"
            variant="outlined"
            size="small"
            onClick={() => onChangeRequest(stage.key)}
            sx={{ borderRadius: 8, cursor: 'pointer' }}
          />
        </Box>
      )}
    </Box>
  )
}

export default function StageTimeline({ order, onChangeRequest }) {
  if (!order?.stages?.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        Этапы проекта не заданы.
      </Typography>
    )
  }

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <EventNoteIcon color="secondary" /> Этапы проекта
      </Typography>
      {order.stages.map((stage) => {
        const config = stageConfig.find((s) => s.key === stage.key)
        return (
          <Accordion
            key={stage.key}
            defaultExpanded={stage.status === 'active'}
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'grey.100',
              borderRadius: '12px !important',
              mb: 1.5,
              '&:before': { display: 'none' },
              '&.Mui-expanded': { mb: 1.5 },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                borderRadius: 2,
                '&.Mui-expanded': {
                  borderBottom: '1px solid',
                  borderColor: 'grey.100',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  flexGrow: 1,
                }}
              >
                <StatusIcon status={stage.status} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {config?.label || stage.label || stage.key}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    <StatusText stage={stage} />
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 3 }}>
              <StageContent stage={stage} order={order} onChangeRequest={onChangeRequest} />
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Box>
  )
}
