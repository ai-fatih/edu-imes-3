import { useNavigate } from 'react-router-dom'
import { Container, Typography, Button, Box } from '@mui/material'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Box sx={{ minHeight: 'calc(100vh - 300px)', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <Container maxWidth="sm">
        <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: 'secondary.main', mb: 2 }} />
        <Typography variant="h3" sx={{ mb: 1 }}>404</Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>Страница не найдена</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Запрашиваемая страница не существует или была перемещена.
        </Typography>
        <Button variant="contained" color="secondary" size="large" sx={{ color: 'white' }} onClick={() => navigate('/')}>
          На главную
        </Button>
      </Container>
    </Box>
  )
}
