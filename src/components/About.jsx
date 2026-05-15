import { Container, Typography, Grid, Paper, Box, Avatar } from '@mui/material'
import useInView from '../hooks/useInView'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const stats = [
  { number: '2008', label: 'Основание компании' },
  { number: '2000+', label: 'Мероприятий проведено' },
  { number: '5000', label: 'Макс. гостей' },
  { number: '4', label: 'Эксперта в команде' },
]

const highlights = [
  'Составляем меню с нуля и корректируем готовое',
  'Оптимизируем бюджет на алкоголь (по ценам поставщика)',
  'Выезжаем на площадку как ваш представитель',
  'Осуществляем полный контроль питания в день мероприятия',
]

const team = [
  {
    name: 'Ион Мельник',
    role: 'Основатель, банкетный менеджер',
    desc: 'Опыт 9 лет. Работал на площадках: Яхт-клуб «Адмирал», Конгресс-Отель «Ареал», Отель «Яхонты» и многие другие. Идейный вдохновитель и руководитель команды.',
    initials: 'ИМ',
    color: '#c6a862',
  },
  {
    name: 'Максим Шабанов',
    role: 'Старший банкетный менеджер',
    desc: 'Гуру банкетного искусства. Зам. начальника службы торговли и общественного питания Управления делами Президента РФ. Опыт и связи высшего уровня.',
    initials: 'МШ',
    color: '#1a237e',
  },
  {
    name: 'Николай Ечеистов',
    role: 'Ведущий специалист по организации питания',
    desc: 'Мастер банкетного дела. Сквозной контроль всего процесса — от составления меню до финального сетапа. Знание барменского и официантского дела.',
    initials: 'НЕ',
    color: '#c6a862',
  },
  {
    name: 'Валентин Боровиков',
    role: 'Банкетный менеджер, сомелье',
    desc: 'Высококлассный специалист в области сервиса. Путь от официанта до банкетного менеджера. Участие и победы в профессиональных конкурсах.',
    initials: 'ВБ',
    color: '#1a237e',
  },
]

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15 })
  const [teamRef, teamInView] = useInView({ threshold: 0.1 })

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
                Кто мы
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 3 }}>
                Ваша персональная банкетная служба
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.9 }}>
                Меня зовут <strong>Ион Мельник</strong>. Я являюсь частью профессиональной команды банкетных менеджеров с опытом более 10 лет. Количество проведённых нами мероприятий исчисляется тысячами, а максимальное количество гостей составляло 5 000 персон.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.9 }}>
                Мы предлагаем профессиональное сопровождение, включая все этапы подготовки ваших мероприятий по части питания. Наша задача — защищать ваши интересы перед площадками, кейтерингами и ресторанами.
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

        <Box ref={teamRef} sx={{ mt: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="overline"
              sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: 2, fontSize: '0.8rem' }}
            >
              Команда
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
              Мы — команда
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Школа, через которую прошли мы — это залог стойкости и чёткого восприятия любого форс-мажора на площадке
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {team.map((t, i) => (
              <Grid item xs={12} sm={6} md={3} key={t.name}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: 'grey.100',
                    borderRadius: 3,
                    height: '100%',
                    opacity: teamInView ? 1 : 0,
                    transform: teamInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s ease ${i * 0.12}s`,
                    '&:hover': {
                      borderColor: 'secondary.light',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 72, height: 72, mx: 'auto', mb: 2,
                      bgcolor: t.color, fontSize: 24, fontWeight: 700,
                      boxShadow: `0 4px 14px ${t.color}33`,
                    }}
                  >
                    {t.initials}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {t.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'secondary.main', fontWeight: 600, display: 'block', mb: 1.5, fontSize: '0.7rem', letterSpacing: 0.5 }}
                  >
                    {t.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {t.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
