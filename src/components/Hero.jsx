import { Box, Container, Typography, Button, Grid } from '@mui/material'

export default function Hero() {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(198,168,98,0.15) 0%, transparent 50%)',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '3.2rem' }, lineHeight: 1.2, mb: 3 }}
            >
              Идеальные мероприятия
              <Box component="span" sx={{ color: 'secondary.main', display: 'block' }}>
                начинаются с нас
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 4, opacity: 0.9, maxWidth: 560 }}>
              Professional Banquet Service — профессиональная организация банкетов,
              корпоративов, свадеб и частных мероприятий «под ключ» в Москве и области.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" color="secondary" size="large" sx={{ color: 'white', px: 4 }}>
                Заказать мероприятие
              </Button>
              <Button variant="outlined" size="large" sx={{ color: 'white', borderColor: 'white', px: 4, '&:hover': { borderColor: 'secondary.main', color: 'secondary.main' } }}>
                Наши услуги
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Box
              sx={{
                width: 380, height: 380, borderRadius: '50%',
                bgcolor: 'rgba(198,168,98,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid rgba(198,168,98,0.3)',
              }}
            >
              <Typography variant="h3" sx={{ color: 'secondary.main', textAlign: 'center', fontWeight: 300 }}>
                С 2008<br />года
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
