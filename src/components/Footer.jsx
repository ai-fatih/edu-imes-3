import { Container, Typography, Box, Grid, Link } from '@mui/material'

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: 'secondary.main', mb: 2, fontWeight: 700 }}>
              PRO BANQUET
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Профессиональная организация мероприятий «под ключ» в Москве и Московской области с 2008 года.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>Услуги</Typography>
            {['Корпоративы', 'Свадьбы', 'Дни рождения', 'Бизнес-мероприятия'].map((t) => (
              <Typography key={t} variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>{t}</Typography>
            ))}
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>Контакты</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>+7 (495) 123-45-67</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>info@probanquet.ru</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>Москва, ул. Тверская, 15</Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>Клиентам</Typography>
            <Link href="/login" color="inherit" underline="none">
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5, '&:hover': { opacity: 1 } }}>
                Личный кабинет
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 3, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            &copy; {new Date().getFullYear()} Professional Banquet Service. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
