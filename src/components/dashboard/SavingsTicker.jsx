import { useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import SavingsIcon from '@mui/icons-material/Savings'

export default function SavingsTicker({ totalSavings }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!totalSavings) return
    const duration = 1500
    const steps = 60
    const increment = totalSavings / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= totalSavings) {
        setDisplay(totalSavings)
        clearInterval(interval)
      } else {
        setDisplay(Math.round(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [totalSavings])

  if (!totalSavings) return null

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
        gap: 2,
        bgcolor: 'rgba(76, 175, 80, 0.04)',
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '14px',
          bgcolor: 'rgba(76, 175, 80, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'success.main',
          flexShrink: 0,
        }}
      >
        <SavingsIcon />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          PBS сэкономил вам за всё время
        </Typography>
        <Typography variant="h5" fontWeight={700} color="success.main">
          {display.toLocaleString('ru-RU')} ₽
        </Typography>
      </Box>
    </Paper>
  )
}
