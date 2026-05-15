import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material'

export default function TopIssues({ orders }) {
  const issues = {}
  orders.forEach((o) => {
    if (!o.postReport?.violations) return
    o.postReport.violations.forEach((v) => {
      const desc = v.description
      if (!issues[desc]) issues[desc] = { description: desc, count: 0, severity: v.severity }
      issues[desc].count++
    })
  })

  const data = Object.values(issues)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  if (!data.length) return null

  const severityColors = { high: 'error', mid: 'warning', low: 'info' }

  return (
    <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>⚠️ Частые нарушения</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Нарушение</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Раз</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Серьёзность</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => (
              <TableRow key={i}>
                <TableCell>{v.description}</TableCell>
                <TableCell align="right">{v.count}</TableCell>
                <TableCell>
                  <Chip
                    label={v.severity === 'high' ? 'Высокий' : v.severity === 'mid' ? 'Средний' : 'Низкий'}
                    color={severityColors[v.severity] || 'default'}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 6, fontSize: '0.65rem' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
