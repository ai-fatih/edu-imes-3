import { Paper, Typography } from '@mui/material'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

export function RevenueChart({ orders }) {
  const byMonth = {}
  orders.forEach((o) => {
    const m = o.createdAt ? new Date(o.createdAt).toLocaleString('ru', { month: 'short', year: '2-digit' }) : 'unknown'
    byMonth[m] = (byMonth[m] || 0) + (o.budgetSavings ? Math.round(o.budgetSavings * 0.15) : 0)
  })
  const data = Object.entries(byMonth).map(([month, revenue]) => ({ month, revenue }))

  if (!data.length) return null
  return (
    <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>📈 Выручка по месяцам</Typography>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="month" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Bar dataKey="revenue" fill="#c6a862" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
}

export function SavingsChart({ orders }) {
  const data = orders
    .filter((o) => o.budgetSavings)
    .map((o) => ({ name: o.clientName?.split(' ')[0] || o.id, savings: o.budgetSavings }))

  if (!data.length) return null
  return (
    <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>📊 Экономия по проектам</Typography>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis type="number" fontSize={12} />
          <YAxis dataKey="name" type="category" fontSize={12} width={60} />
          <Tooltip />
          <Bar dataKey="savings" fill="#4caf50" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
}

export function PipelineChart({ orders }) {
  const stages = ['menu', 'alcohol', 'venue', 'control', 'report']
  const labels = { menu: 'Меню', alcohol: 'Алкоголь', venue: 'Выезд', control: 'Контроль', report: 'Отчёт' }
  const data = stages.map((s) => ({
    name: labels[s],
    count: orders.filter((o) => o.stage === s && o.status !== 'completed' && o.status !== 'cancelled').length,
  }))

  return (
    <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>🔄 Pipeline по этапам</Typography>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis type="number" fontSize={12} />
          <YAxis dataKey="name" type="category" fontSize={12} width={70} />
          <Tooltip />
          <Bar dataKey="count" fill="#1a237e" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
}

export function GradeChart({ orders }) {
  const counts = { A: 0, B: 0, C: 0 }
  orders.forEach((o) => {
    if (o.postReport?.overallGrade) counts[o.postReport.overallGrade]++
  })
  const data = Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }))

  if (!data.length) return null
  return (
    <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>🏆 Распределение оценок</Typography>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
            {data.map((_, i) => (
              <Cell key={i} fill={[ '#4caf50', '#ff9800', '#f44336' ][i] || '#ccc'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  )
}

export function NpsChart({ orders }) {
  const rated = orders.filter((o) => o.nps != null)
  if (!rated.length) return null
  const promoters = rated.filter((o) => o.nps >= 9).length
  const detractors = rated.filter((o) => o.nps <= 6).length
  const passives = rated.length - promoters - detractors
  const nps = rated.length ? Math.round(((promoters - detractors) / rated.length) * 100) : 0
  const data = [
    { name: 'Промоутеры', value: promoters, color: '#4caf50' },
    { name: 'Нейтралы', value: passives, color: '#ff9800' },
    { name: 'Критики', value: detractors, color: '#f44336' },
  ].filter((d) => d.value > 0)

  return (
    <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>⭐ NPS: {nps}</Typography>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} label>
            {data.map((_, i) => (
              <Cell key={i} fill={data[i].color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  )
}
