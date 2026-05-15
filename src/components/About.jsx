import { Container, Typography, Grid, Paper, Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const stats = [
  { number: '2008', label: 'Год основания' },
  { number: '500+', label: 'Мероприятий проведено' },
  { number: '98%', label: 'Довольных клиентов' },
  { number: '50+', label: 'Постоянных партнёров' },
]

export default function About() {
  return (
    <Box id="about" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 3 }}>
              О компании
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
              Professional Banquet Service — компания с многолетним опытом в сфере организации
              мероприятий. Мы работаем с 2008 года и за это время провели более 500 мероприятий
              различного масштаба.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              Наш подход — полное сопровождение клиента на всех этапах: от идеи до реализации.
              Мы берём на себя все организационные и технические вопросы, чтобы вы могли
              наслаждаться праздником.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Индивидуальный подход к каждому клиенту', 'Собственное оборудование и штат сотрудников', 'Работаем по всей Москве и Московской области'].map((text) => (
                <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                  <Typography variant="body2">{text}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {stats.map((s) => (
                <Grid item xs={6} key={s.label}>
                  <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.200' }}>
                    <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>{s.number}</Typography>
                    <Typography variant="body2" color="text.secondary">{s.label}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
