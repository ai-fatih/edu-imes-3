import { Box, Paper, Typography, Avatar } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

export default function ManagerCard({ managerName, managerPhone }) {
  const initials = managerName
    ? managerName.split(' ').map(n => n[0]).join('')
    : '??'

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        border: '1px solid',
        borderColor: 'grey.100',
        borderRadius: 3,
        bgcolor: 'rgba(198, 168, 98, 0.05)',
      }}
    >
      <Avatar
        sx={{
          width: 52,
          height: 52,
          bgcolor: 'secondary.main',
          color: 'white',
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {initials}
      </Avatar>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <PersonIcon sx={{ fontSize: 14 }} /> Ваш личный менеджер
        </Typography>
        <Typography variant="subtitle1" fontWeight={700}>
          {managerName || 'Не назначен'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {managerPhone || '—'}
        </Typography>
      </Box>
    </Paper>
  )
}
