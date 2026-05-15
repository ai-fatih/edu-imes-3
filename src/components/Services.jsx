import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material'
import useInView from '../hooks/useInView'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import EditIcon from '@mui/icons-material/Edit'
import WineBarIcon from '@mui/icons-material/WineBar'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FactCheckIcon from '@mui/icons-material/FactCheck'

const services = [
  { icon: <MenuBookIcon sx={{ fontSize: 36 }} />, title: 'Составление меню', desc: 'Разработаем меню с нуля под формат и бюджет вашего мероприятия. Банкет, фуршет, BBQ, кофе-брейк — любой формат.' },
  { icon: <EditIcon sx={{ fontSize: 36 }} />, title: 'Корректировка меню', desc: 'Изучим предложение площадки или кейтеринга, внесём правки, укажем на недочёты, предложим альтернативу и покажем, где можно сэкономить.' },
  { icon: <WineBarIcon sx={{ fontSize: 36 }} />, title: 'Расчёт и подбор алкоголя', desc: 'Сделаем правильный расчёт спиртного, оптимизируем затраты, предложим ассортимент. Привлечём сомелье для подбора.' },
  { icon: <LocalShippingIcon sx={{ fontSize: 36 }} />, title: 'Закупка алкоголя', desc: 'Поможем приобрести алкогольные и безалкогольные напитки напрямую у официальных поставщиков по закупочным ценам.' },
  { icon: <LocationOnIcon sx={{ fontSize: 36 }} />, title: 'Выезд на площадку', desc: 'Приедем как ваш представитель: осмотр площадки, контроль составления меню, помощь в тест-фуде, утверждение сетапа, проверка СанПиН и ХАССП.' },
  { icon: <FactCheckIcon sx={{ fontSize: 36 }} />, title: 'Полный контроль питания', desc: 'В день мероприятия контролируем тайминги подачи, работу персонала, хранение продуктов. Пересчитываем алкоголь. Предоставляем письменный отчёт.' },
]

const iconBgColors = [
  'rgba(198,168,98,0.1)',
  'rgba(26,35,126,0.08)',
  'rgba(198,168,98,0.1)',
  'rgba(26,35,126,0.08)',
  'rgba(198,168,98,0.1)',
  'rgba(26,35,126,0.08)',
]

export default function Services() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <Box id="services" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box ref={ref} sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2, fontSize: '0.8rem' }}
          >
            Что мы предлагаем
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
            Наши услуги
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            Профессиональное сопровождение всех этапов подготовки и проведения мероприятия по части питания
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {services.map((s, i) => (
            <Grid item xs={12} sm={6} md={4} key={s.title}>
              <Card
                sx={{
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.100',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    borderColor: 'secondary.light',
                    '& .icon-wrapper': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      transform: 'scale(1.1)',
                    },
                  },
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s ease ${i * 0.1}s`,
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 5, px: 3 }}>
                  <Box
                    className="icon-wrapper"
                    sx={{
                      width: 72, height: 72, borderRadius: '20px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      mx: 'auto', mb: 2.5,
                      bgcolor: iconBgColors[i],
                      color: 'secondary.main',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {s.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    {s.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, mx: 'auto' }}>
                    {s.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
