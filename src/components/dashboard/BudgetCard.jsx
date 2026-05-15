import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Chip,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

export default function BudgetCard({ order }) {
  const [expanded, setExpanded] = useState(false)

  const fmt = (v) => `${v.toLocaleString('ru-RU')} ₽`
  const pct = (order.budgetFinal / order.budgetOriginal) * 100

  if (!order.budgetBreakdown?.length) {
    return (
      <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <MonetizationOnIcon color="secondary" /> Бюджет проекта
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Данные по бюджету отсутствуют.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
        <MonetizationOnIcon color="secondary" /> Бюджет проекта
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">Первоначальная смета</Typography>
        <Typography variant="body2" fontWeight={600}>{fmt(order.budgetOriginal)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">После оптимизации PBS</Typography>
        <Typography variant="body2" fontWeight={600} color="success.main">{fmt(order.budgetFinal)}</Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 10,
          borderRadius: 5,
          mb: 1.5,
          bgcolor: 'error.light',
          '& .MuiLinearProgress-bar': { bgcolor: 'success.main', borderRadius: 5 },
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography variant="body1" color="success.main" fontWeight={700}>
          💚 Вы сэкономили: {fmt(order.budgetSavings)}
        </Typography>
        <Chip
          label={`−${order.budgetSavingsPercent}%`}
          color="success"
          size="small"
          sx={{ borderRadius: 6, fontWeight: 700 }}
        />
      </Box>

      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          color: 'text.secondary',
          '&:hover': { color: 'text.primary' },
          mt: 1,
        }}
      >
        <Typography variant="body2" fontWeight={500}>Детализация</Typography>
        <IconButton size="small" sx={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>
          <ExpandMoreIcon />
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <TableContainer sx={{ mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Позиция</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Было</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Стало</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Экономия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.budgetBreakdown.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.item}</TableCell>
                  <TableCell align="right">{fmt(row.originalPrice)}</TableCell>
                  <TableCell align="right">{fmt(row.pbsPrice)}</TableCell>
                  <TableCell align="right" sx={{ color: 'success.main', fontWeight: 600 }}>
                    −{fmt(row.originalPrice - row.pbsPrice)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Paper>
  )
}
