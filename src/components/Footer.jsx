import { Container, Typography, Box, Grid, Link } from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#0d1150', color: 'white', pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: 'secondary.light', mb: 2, fontWeight: 700 }}>
              PRO BANQUET
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.65, maxWidth: 300, lineHeight: 1.8 }}>
              Профессиональная организация мероприятий «под ключ» в Москве и Московской области с 2008 года.
            </Typography>
          </Grid>
          <Grid item xs={6} md={2.5}>
            <Typography variant="subtitle2" sx={{ mb: 2.5, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.5 }}>
              Услуги
            </Typography>
            {['Корпоративы', 'Свадьбы', 'Дни рождения', 'Бизнес-мероприятия'].map((t) => (
              <Typography key={t} variant="body2" sx={{ opacity: 0.6, mb: 1, '&:hover': { opacity: 1, cursor: 'pointer' }, transition: '0.2s' }}>
                {t}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={6} md={2.5}>
            <Typography variant="subtitle2" sx={{ mb: 2.5, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.5 }}>
              Контакты
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.6, mb: 1 }}>+7 (495) 123-45-67</Typography>
            <Typography variant="body2" sx={{ opacity: 0.6, mb: 1 }}>info@probanquet.ru</Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>Москва, ул. Тверская, 15</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" sx={{ mb: 2.5, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.5 }}>
              Клиентам
            </Typography>
            <Link href="/login" color="inherit" underline="none">
              <Typography variant="body2" sx={{ opacity: 0.6, mb: 1, '&:hover': { opacity: 1 }, transition: '0.2s' }}>
                Личный кабинет
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.06)', mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.4, fontSize: '0.8rem' }}>
            &copy; {new Date().getFullYear()} Professional Banquet Service. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
