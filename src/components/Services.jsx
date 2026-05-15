import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material'
import useInView from '../hooks/useInView'
import EventIcon from '@mui/icons-material/Event'
import GroupsIcon from '@mui/icons-material/Groups'
import CakeIcon from '@mui/icons-material/Cake'
import BusinessIcon from '@mui/icons-material/Business'
import ChairIcon from '@mui/icons-material/Chair'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

const services = [
  { icon: <EventIcon sx={{ fontSize: 36 }} />, title: 'Корпоративы', desc: 'Организация корпоративных мероприятий любого масштаба — от тимбилдинга до новогоднего банкета.' },
  { icon: <CakeIcon sx={{ fontSize: 36 }} />, title: 'Свадьбы', desc: 'Создаём свадьбу вашей мечты: площадка, меню, декор, развлекательная программа.' },
  { icon: <GroupsIcon sx={{ fontSize: 36 }} />, title: 'Частные торжества', desc: 'Дни рождения, юбилеи, семейные праздники — любой формат и количество гостей.' },
  { icon: <BusinessIcon sx={{ fontSize: 36 }} />, title: 'Бизнес-мероприятия', desc: 'Конференции, форумы, презентации с полным техническим обеспечением.' },
  { icon: <ChairIcon sx={{ fontSize: 36 }} />, title: 'Подбор площадки', desc: 'Поможем найти идеальное место: лофты, усадьбы, банкетные залы, шатры.' },
  { icon: <RestaurantMenuIcon sx={{ fontSize: 36 }} />, title: 'Кейтеринг', desc: 'Разнообразное меню от шеф-повара — от фуршета до многоярусного банкета.' },
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
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', mb: 6 }}
          >
            Предоставляем полный спектр услуг по организации мероприятий «под ключ»
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
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 280, mx: 'auto' }}>
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
