import { Box, Container, Typography, Button, Paper } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

export default function Hero({ onOrder }) {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0d1150 0%, #1a237e 50%, #283593 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-30%', right: '-20%',
          width: '700px', height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198,168,98,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-25%', left: '-15%',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(198,168,98,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Box sx={{ position: 'absolute', top: '18%', left: '10%', width: 60, height: 60, borderRadius: '50%', border: '2px solid rgba(198,168,98,0.06)', display: { xs: 'none', md: 'block' } }} />
      <Box sx={{ position: 'absolute', bottom: '25%', right: '12%', width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(198,168,98,0.05)', display: { xs: 'none', md: 'block' } }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3.5, sm: 5 },
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1.5px solid rgba(255,255,255,0.08)',
            textAlign: 'center',
            width: '100%',
            maxWidth: 520,
            position: 'relative',
            animation: 'blurIn 0.9s ease',
            '@keyframes blurIn': {
              '0%': { opacity: 0, filter: 'blur(12px)', transform: 'scale(0.95)' },
              '100%': { opacity: 1, filter: 'blur(0)', transform: 'scale(1)' },
            },
            '&::before': {
              content: '""',
              position: 'absolute', inset: 0,
              borderRadius: 4,
              padding: '1.5px',
              background: 'linear-gradient(135deg, rgba(198,168,98,0.3), transparent 55%, rgba(198,168,98,0.1))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            },
          }}
        >
          <Box sx={{ mb: 2, animation: 'fadeUp 0.6s ease 0.1s both', '@keyframes fadeUp': { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } } }}>
            <RestaurantMenuIcon sx={{ color: 'secondary.main', fontSize: 36 }} />
          </Box>

          <Typography
            variant="h1"
            sx={{
              color: 'white',
              fontWeight: 800,
              fontSize: { xs: '1.8rem', sm: '2.4rem' },
              lineHeight: 1.15,
              mb: 1,
              animation: 'fadeUp 0.6s ease 0.2s both',
            }}
          >
            Идеальные мероприятия
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: 'secondary.main',
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.4rem' },
              mb: 2,
              animation: 'fadeUp 0.6s ease 0.3s both',
            }}
          >
            начинаются с нас
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              mb: 3,
              maxWidth: 400,
              mx: 'auto',
              lineHeight: 1.7,
              animation: 'fadeUp 0.6s ease 0.4s both',
            }}
          >
            Professional Banquet Service — профессиональная организация банкетов, корпоративов, свадеб и частных мероприятий «под ключ» в Москве и области.
          </Typography>
          <Box sx={{ animation: 'fadeUp 0.6s ease 0.5s both' }}>
            <Button
              onClick={onOrder}
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                color: 'white',
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: '0 4px 20px rgba(198,168,98,0.25)',
                '&:hover': {
                  boxShadow: '0 6px 28px rgba(198,168,98,0.35)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.25s ease',
              }}
            >
              Заказать мероприятие
            </Button>
          </Box>
        </Paper>
      </Container>

      <Box
        onClick={scrollToServices}
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,0.3)',
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
