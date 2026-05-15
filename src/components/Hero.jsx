import { Box, Container, Typography, Button, Grid } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export default function Hero() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0d1150 0%, #1a237e 40%, #283593 70%, #1a237e 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%', left: '-20%',
          width: '800px', height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198,168,98,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-30%', right: '-10%',
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198,168,98,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%', right: '8%',
          width: 120, height: 120,
          border: '2px solid rgba(198,168,98,0.15)',
          borderRadius: '50%',
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%', left: '5%',
          width: 80, height: 80,
          border: '2px solid rgba(198,168,98,0.1)',
          borderRadius: '50%',
          display: { xs: 'none', md: 'block' },
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              variant="h1"
              sx={{
                color: 'white',
                mb: 2,
                animation: 'fadeInUp 0.8s ease',
                '@keyframes fadeInUp': {
                  from: { opacity: 0, transform: 'translateY(30px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              Идеальные мероприятия
              <Box component="span" sx={{ color: 'secondary.main', display: 'block' }}>
                начинаются с нас
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1.15rem',
                mb: 5,
                maxWidth: 540,
                lineHeight: 1.8,
                animation: 'fadeInUp 0.8s ease 0.15s both',
              }}
            >
              Professional Banquet Service — профессиональная организация банкетов,
              корпоративов, свадеб и частных мероприятий «под ключ» в Москве и области.
            </Typography>
            <Box
              sx={{
                display: 'flex', gap: 2, flexWrap: 'wrap',
                animation: 'fadeInUp 0.8s ease 0.3s both',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{
                  color: 'white',
                  px: 5,
                  py: 1.5,
                  fontSize: '1.05rem',
                }}
              >
                Заказать мероприятие
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={scrollToServices}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.4)',
                  px: 5,
                  py: 1.5,
                  fontSize: '1.05rem',
                  '&:hover': {
                    borderColor: 'secondary.main',
                    color: 'secondary.light',
                    bgcolor: 'rgba(198,168,98,0.08)',
                  },
                }}
              >
                Наши услуги
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Box
              sx={{
                width: 340, height: 340,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, rgba(198,168,98,0.12), rgba(198,168,98,0.03))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid rgba(198,168,98,0.2)',
                position: 'relative',
                animation: 'fadeInScale 0.8s ease 0.4s both',
                '@keyframes fadeInScale': {
                  from: { opacity: 0, transform: 'scale(0.9)' },
                  to: { opacity: 1, transform: 'scale(1)' },
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: 380, height: 380,
                  borderRadius: '50%',
                  border: '1px solid rgba(198,168,98,0.08)',
                },
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{ color: 'secondary.light', fontWeight: 300, lineHeight: 1.2 }}
                >
                  С 2008
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255,255,255,0.6)', mt: 0.5, letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.8rem' }}
                >
                  года
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll indicator */}
      <Box
        onClick={scrollToServices}
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'pointer',
          animation: 'bounce 2s ease infinite',
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
            '50%': { transform: 'translateX(-50%) translateY(8px)' },
          },
          '&:hover': { color: 'secondary.main' },
        }}
      >
        <Typography variant="caption" sx={{ fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase' }}>
          Листайте
        </Typography>
        <KeyboardArrowDownIcon />
      </Box>
    </Box>
  )
}
