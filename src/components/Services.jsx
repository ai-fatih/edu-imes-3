import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material'
import EventIcon from '@mui/icons-material/Event'
import GroupsIcon from '@mui/icons-material/Groups'
import CakeIcon from '@mui/icons-material/Cake'
import BusinessIcon from '@mui/icons-material/Business'
import ChairIcon from '@mui/icons-material/Chair'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

const services = [
  { icon: <EventIcon sx={{ fontSize: 40 }} />, title: 'Корпоративы', desc: 'Организация корпоративных мероприятий любого масштаба — от тимбилдинга до новогоднего банкета.' },
  { icon: <CakeIcon sx={{ fontSize: 40 }} />, title: 'Свадьбы', desc: 'Создаём свадьбу вашей мечты: площадка, меню, декор, развлекательная программа.' },
  { icon: <GroupsIcon sx={{ fontSize: 40 }} />, title: 'Частные торжества', desc: 'Дни рождения, юбилеи, семейные праздники — любой формат и количество гостей.' },
  { icon: <BusinessIcon sx={{ fontSize: 40 }} />, title: 'Бизнес-мероприятия', desc: 'Конференции, форумы, презентации с полным техническим обеспечением.' },
  { icon: <ChairIcon sx={{ fontSize: 40 }} />, title: 'Подбор площадки', desc: 'Поможем найти идеальное место: лофты, усадьбы, банкетные залы, шатры.' },
  { icon: <RestaurantMenuIcon sx={{ fontSize: 40 }} />, title: 'Кейтеринг', desc: 'Разнообразное меню от шеф-повара — от фуршета до многоярусного банкета.' },
]

export default function Services() {
  return (
    <Box id="services" sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 2 }}>
          Наши услуги
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 6, maxWidth: 600, mx: 'auto' }}>
          Предоставляем полный спектр услуг по организации мероприятий «под ключ»
        </Typography>
        <Grid container spacing={3}>
          {services.map((s) => (
            <Grid item xs={12} sm={6} md={4} key={s.title}>
              <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' } }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ color: 'secondary.main', mb: 2 }}>{s.icon}</Box>
                  <Typography variant="h5" gutterBottom>{s.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{s.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
