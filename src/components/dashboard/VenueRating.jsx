import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material'

export default function VenueRating({ orders }) {
  const venues = {}
  orders.forEach((o) => {
    const vi = o.venueInspection
    if (!vi?.venueName) return
    if (!venues[vi.venueName]) {
      venues[vi.venueName] = { name: vi.venueName, ratings: [], findings: 0 }
    }
    venues[vi.venueName].ratings.push(vi.rating || 3)
    venues[vi.venueName].findings += vi.findings?.length || 0
  })

  const data = Object.values(venues).map((v) => ({
    name: v.name,
    avgRating: v.ratings.reduce((s, r) => s + r, 0) / v.ratings.length,
    totalFindings: v.findings,
    status: v.avgRating >= 4.5 ? 'whitelist' : v.avgRating >= 3 ? 'neutral' : 'blacklist',
  }))

  if (!data.length) return null

  const statusColors = { whitelist: 'success', neutral: 'warning', blacklist: 'error' }
  const statusLabels = { whitelist: 'Белый список', neutral: 'Нейтрально', blacklist: 'Чёрный список' }

  return (
    <Paper elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>🏪 Рейтинг площадок</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Площадка</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Рейтинг</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Замечания</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v) => (
              <TableRow key={v.name}>
                <TableCell>{v.name}</TableCell>
                <TableCell align="right">{v.avgRating.toFixed(1)} ★</TableCell>
                <TableCell align="right">{v.totalFindings}</TableCell>
                <TableCell>
                  <Chip
                    label={statusLabels[v.status]}
                    color={statusColors[v.status]}
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
