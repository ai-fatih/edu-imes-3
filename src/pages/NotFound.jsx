import { useNavigate } from 'react-router-dom'
import { Container, Typography, Button, Box } from '@mui/material'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="sm">
        <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: 'secondary.main', mb: 3 }} />
        <Typography variant="h1" sx={{ color: 'primary.main', fontWeight: 800, mb: 1 }}>404</Typography>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>Страница не найдена</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
          Запрашиваемая страница не существует или была перемещена.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ color: 'white', px: 5 }}
          onClick={() => navigate('/')}
        >
          На главную
        </Button>
      </Container>
    </Box>
  )
}
