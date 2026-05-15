import { Box, Paper, Typography, Chip } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'

export default function VenueSummary({ venueInspection }) {
  if (!venueInspection) return null

  const { venueName, date, rating, findings, notes } = venueInspection
  const highCount = findings?.filter((f) => f.severity === 'high').length || 0
  const unresolvedCount = findings?.filter((f) => !f.resolved).length || 0

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: '1px solid',
        borderColor: 'grey.100',
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 2.5,
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '14px',
          bgcolor: 'rgba(198, 168, 98, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'secondary.main',
          flexShrink: 0,
        }}
      >
        <LocationOnIcon />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 0.5 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {venueName}
          </Typography>
          {rating &&
            [1, 2, 3, 4, 5].map((i) => (
              <Box
                key={i}
                component="span"
                sx={{ color: i <= rating ? 'secondary.main' : 'grey.300', fontSize: 16 }}
              >
                ★
              </Box>
            ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {date && (
            <Typography variant="caption" color="text.secondary">
              Осмотр: {date}
            </Typography>
          )}
          {findings?.length > 0 && (
            <Chip
              label={`${findings.length} замечаний${highCount > 0 ? ` (${highCount} высоких)` : ''}`}
              color={unresolvedCount > 0 ? 'warning' : 'success'}
              size="small"
              variant="outlined"
              sx={{ borderRadius: 6, fontSize: '0.7rem' }}
            />
          )}
          {findings?.length === 0 && (
            <Chip label="Без замечаний" color="success" size="small" variant="outlined" sx={{ borderRadius: 6, fontSize: '0.7rem' }} />
          )}
        </Box>
        {notes && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontStyle: 'italic', fontSize: '0.8rem' }}>
            {notes}
          </Typography>
        )}
      </Box>
    </Paper>
  )
}
