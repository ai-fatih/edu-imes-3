import { Container, Typography, Grid, Paper, Box } from '@mui/material'
import useInView from '../hooks/useInView'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const stats = [
  { number: '2008', label: 'Год основания' },
  { number: '500+', label: 'Мероприятий проведено' },
  { number: '98%', label: 'Довольных клиентов' },
  { number: '50+', label: 'Постоянных партнёров' },
]

const highlights = [
  'Индивидуальный подход к каждому клиенту',
  'Собственное оборудование и штат сотрудников',
  'Работаем по всей Москве и Московской области',
]

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <Box id="about" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              ref={ref}
              sx={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.6s ease',
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2, fontSize: '0.8rem' }}
              >
                О компании
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 3 }}>
                Больше чем просто организация
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.9 }}>
                Professional Banquet Service — компания с многолетним опытом в сфере организации
                мероприятий. Мы работаем с 2008 года и за это время провели более 500 мероприятий
                различного масштаба.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.9 }}>
                Наш подход — полное сопровождение клиента на всех этапах: от идеи до реализации.
                Мы берём на себя все организационные и технические вопросы, чтобы вы могли
                наслаждаться праздником.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {highlights.map((text) => (
                  <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CheckCircleIcon sx={{ color: 'secondary.main', fontSize: 22 }} />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{text}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2.5}>
              {stats.map((s, i) => (
                <Grid item xs={6} key={s.label}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3.5,
                      textAlign: 'center',
                      bgcolor: 'grey.50',
                      border: '1px solid',
                      borderColor: 'grey.100',
                      borderRadius: 3,
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.5s ease ${i * 0.12}s`,
                      '&:hover': {
                        borderColor: 'secondary.light',
                        bgcolor: 'white',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
                      },
                    }}
                  >
                    <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 800, mb: 0.5 }}>
                      {s.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {s.label}
                    </Typography>
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
