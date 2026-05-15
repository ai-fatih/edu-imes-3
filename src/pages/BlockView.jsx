import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container, Typography, Grid, Box, Button, Chip, Paper, IconButton, Tooltip
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import CelebrationIcon from '@mui/icons-material/Celebration'
import StarIcon from '@mui/icons-material/Star'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import DiamondIcon from '@mui/icons-material/Diamond'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

const variants = [
  {
    id: 'classic',
    title: 'Классика',
    desc: 'Градиентный фон, текст слева, круг справа, fadeInUp',
    icon: <StarIcon />,
    color: '#1a237e',
    active: true,
  },
  {
    id: 'minimal',
    title: 'Минимал',
    desc: 'Светлый фон, тонкие акценты, текст по центру, fadeIn',
    icon: <AutoAwesomeIcon />,
    color: '#c6a862',
    active: false,
  },
  {
    id: 'split',
    title: 'Сплит',
    desc: '50/50 — тёмная и светлая половины, slideIn',
    icon: <DiamondIcon />,
    color: '#1a237e',
    active: false,
  },
  {
    id: 'gold-accent',
    title: 'Акцент-Голд',
    desc: 'Тёмный фон, крупный золотой декоративный элемент, scaleIn',
    icon: <CelebrationIcon />,
    color: '#c6a862',
    active: false,
  },
  {
    id: 'glass',
    title: 'Стекло',
    desc: 'Градиент + матовый стеклянный карточка, blurIn',
    icon: <DiamondIcon />,
    color: '#1a237e',
    active: false,
  },
  {
    id: 'asymmetric',
    title: 'Асимметрия',
    desc: 'Диагональный сплит, динамичный наклон элементов',
    icon: <AutoAwesomeIcon />,
    color: '#c6a862',
    active: false,
  },
]

const previews = {
  classic: (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #0d1150 0%, #1a237e 40%, #283593 100%)', position: 'relative', overflow: 'hidden', p: 3 }}>
      <Box sx={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,168,98,0.1) 0%, transparent 70%)' }} />
      <Box sx={{ position: 'absolute', bottom: -30, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,168,98,0.06) 0%, transparent 70%)' }} />
      <Typography variant="h5" sx={{ color: 'white', fontWeight: 800, mb: 0.5, fontSize: '1.5rem', animation: 'fadeInUp 0.8s ease', '@keyframes fadeInUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
        Идеальные мероприятия
      </Typography>
      <Typography variant="h5" sx={{ color: '#c6a862', fontWeight: 800, mb: 1, fontSize: '1.5rem' }}>
        начинаются с нас
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 280, mb: 2, fontSize: '0.75rem', lineHeight: 1.5 }}>
        Professional Banquet Service — организация мероприятий «под ключ» с 2008 года.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box sx={{ px: 2, py: 0.6, borderRadius: 1.5, bgcolor: '#c6a862', color: 'white', fontSize: '0.7rem', fontWeight: 700 }}>Заказать</Box>
        <Box sx={{ px: 2, py: 0.6, borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.4)', color: 'white', fontSize: '0.7rem', fontWeight: 600 }}>Услуги</Box>
      </Box>
      <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.3)', animation: 'bounce 2s infinite', '@keyframes bounce': { '0%,100%': { transform: 'translateX(-50%) translateY(0)' }, '50%': { transform: 'translateX(-50%) translateY(4px)' } } }}>
        <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
      </Box>
    </Box>
  ),
  minimal: (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#ffffff', borderBottom: '3px solid #c6a862', p: 3, textAlign: 'center', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 12, left: 12, width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(198,168,98,0.2)' }} />
      <Box sx={{ position: 'absolute', bottom: 12, right: 12, width: 24, height: 24, borderRadius: '50%', border: '2px solid rgba(26,35,126,0.1)' }} />
      <RestaurantMenuIcon sx={{ color: '#c6a862', fontSize: 28, mb: 1.5 }} />
      <Typography variant="h5" sx={{ color: '#1a237e', fontWeight: 800, mb: 0.5, fontSize: '1.5rem', animation: 'fadeIn 0.8s ease', '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } } }}>
        Идеальные мероприятия
      </Typography>
      <Typography variant="body2" sx={{ color: '#6b7280', maxWidth: 260, mb: 2, fontSize: '0.75rem' }}>
        Профессиональная организация банкетов, корпоративов и свадеб.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Box sx={{ px: 2, py: 0.6, borderRadius: 2, bgcolor: '#1a237e', color: 'white', fontSize: '0.7rem', fontWeight: 700, boxShadow: '0 2px 8px rgba(26,35,126,0.2)' }}>Заказать</Box>
        <Box sx={{ px: 2, py: 0.6, borderRadius: 2, border: '1px solid #1a237e', color: '#1a237e', fontSize: '0.7rem', fontWeight: 600 }}>Подробнее</Box>
      </Box>
    </Box>
  ),
  split: (
    <Box sx={{ height: '100%', display: 'flex', overflow: 'hidden' }}>
      <Box sx={{ flex: 1, bgcolor: '#0d1150', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2.5, animation: 'slideInLeft 0.8s ease', '@keyframes slideInLeft': { from: { opacity: 0, transform: 'translateX(-30px)' }, to: { opacity: 1, transform: 'translateX(0)' } } }}>
        <Typography variant="body2" sx={{ color: '#c6a862', fontWeight: 700, letterSpacing: 1, fontSize: '0.6rem', textTransform: 'uppercase', mb: 0.5 }}>PBS с 2008</Typography>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 800, fontSize: '1.3rem', lineHeight: 1.2 }}>Идеальные<br />мероприятия</Typography>
        <Typography variant="h5" sx={{ color: '#c6a862', fontWeight: 800, fontSize: '1.3rem', mb: 1 }}>с нами</Typography>
        <Box sx={{ px: 1.5, py: 0.5, borderRadius: 1.5, bgcolor: '#c6a862', color: 'white', fontSize: '0.65rem', fontWeight: 700, alignSelf: 'flex-start' }}>Обсудить</Box>
      </Box>
      <Box sx={{ flex: 1, bgcolor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, animation: 'slideInRight 0.8s ease', '@keyframes slideInRight': { from: { opacity: 0, transform: 'translateX(30px)' }, to: { opacity: 1, transform: 'translateX(0)' } } }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: 'rgba(198,168,98,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1, border: '2px solid rgba(198,168,98,0.3)' }}>
            <Typography variant="h6" sx={{ color: '#c6a862', fontWeight: 300, fontSize: '1rem' }}>500+</Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 500 }}>мероприятий</Typography>
        </Box>
      </Box>
    </Box>
  ),
  'gold-accent': (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#0d1150', position: 'relative', overflow: 'hidden', p: 3, textAlign: 'center' }}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 200, height: 200, borderRadius: '50%', border: '3px solid rgba(198,168,98,0.08)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 140, height: 140, borderRadius: '50%', border: '2px solid rgba(198,168,98,0.12)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, bgcolor: '#c6a862', borderRadius: '50%', opacity: 0.15 }} />
      <Box sx={{ position: 'absolute', bottom: 12, left: 12, width: 20, height: 20, bgcolor: '#c6a862', borderRadius: '50%', opacity: 0.1 }} />
      <DiamondIcon sx={{ color: '#c6a862', fontSize: 32, mb: 1.5, animation: 'scaleIn 0.8s ease', '@keyframes scaleIn': { from: { opacity: 0, transform: 'scale(0.5)' }, to: { opacity: 1, transform: 'scale(1)' } } }} />
      <Typography variant="h5" sx={{ color: 'white', fontWeight: 800, fontSize: '1.4rem', mb: 0.5, animation: 'fadeInUp2 0.8s ease 0.1s both', '@keyframes fadeInUp2': { from: { opacity: 0, transform: 'translateY(15px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
        Идеальные мероприятия
      </Typography>
      <Typography variant="h6" sx={{ color: '#c6a862', fontWeight: 700, fontSize: '1.1rem', mb: 1.5, animation: 'fadeInUp2 0.8s ease 0.2s both' }}>
        начинаются с нас
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, animation: 'fadeInUp2 0.8s ease 0.3s both' }}>
        <Box sx={{ px: 2, py: 0.6, borderRadius: 2, bgcolor: '#c6a862', color: 'white', fontSize: '0.7rem', fontWeight: 700 }}>Заказать →</Box>
      </Box>
    </Box>
  ),
  glass: (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0d1150 0%, #1a237e 50%, #283593 100%)', position: 'relative', overflow: 'hidden', p: 3 }}>
      <Box sx={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,168,98,0.08) 0%, transparent 70%)' }} />
      <Box sx={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,168,98,0.05) 0%, transparent 70%)' }} />
      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', maxWidth: 280, width: '100%', textAlign: 'center', animation: 'blurIn 0.8s ease', '@keyframes blurIn': { from: { opacity: 0, filter: 'blur(8px)' }, to: { opacity: 1, filter: 'blur(0)' } } }}>
        <RestaurantMenuIcon sx={{ color: '#c6a862', fontSize: 24, mb: 1 }} />
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 800, fontSize: '1.3rem', mb: 0.5 }}>Идеальные мероприятия</Typography>
        <Typography variant="body2" sx={{ color: '#c6a862', fontWeight: 600, mb: 1.5, fontSize: '0.85rem' }}>начинаются с нас</Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block', mb: 1.5, fontSize: '0.65rem' }}>
          Организация мероприятий «под ключ» в Москве и области
        </Typography>
        <Box sx={{ px: 2, py: 0.6, borderRadius: 2, bgcolor: '#c6a862', color: 'white', fontSize: '0.7rem', fontWeight: 700, display: 'inline-block' }}>Заказать мероприятие</Box>
      </Paper>
    </Box>
  ),
  asymmetric: (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(160deg, #0d1150 0%, #1a237e 60%, #283593 100%)', position: 'relative', overflow: 'hidden', p: 3 }}>
      <Box sx={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '100%', background: 'linear-gradient(135deg, transparent 40%, rgba(198,168,98,0.08) 100%)', transform: 'skewX(-12deg) translateX(20%)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '30%', height: '40%', background: 'rgba(198,168,98,0.04)', transform: 'skewY(8deg)', pointerEvents: 'none' }} />
      <Typography variant="caption" sx={{ color: '#c6a862', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.55rem', mb: 1, animation: 'slideUp 0.6s ease', '@keyframes slideUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
            Professional Banquet Service
          </Typography>
      <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, fontSize: '1.6rem', lineHeight: 1.1, mb: 0.5, animation: 'slideUp 0.6s ease 0.1s both' }}>
        Идеальные
      </Typography>
      <Typography variant="h4" sx={{ color: '#c6a862', fontWeight: 800, fontSize: '1.6rem', lineHeight: 1.1, mb: 1.5, ml: 4, animation: 'slideUp 0.6s ease 0.2s both' }}>
        мероприятия
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, ml: 4, animation: 'slideUp 0.6s ease 0.3s both' }}>
        <Box sx={{ px: 2, py: 0.6, borderRadius: 1, bgcolor: '#c6a862', color: 'white', fontSize: '0.7rem', fontWeight: 700, transform: 'skewX(-8deg)', '& > *': { transform: 'skewX(8deg)' } }}>
          <Box component="span" sx={{ display: 'inline-block' }}>Связаться</Box>
        </Box>
        <Box sx={{ px: 2, py: 0.6, borderRadius: 1, border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: '0.7rem', fontWeight: 600, transform: 'skewX(-8deg)', '& > *': { transform: 'skewX(8deg)' } }}>
          <Box component="span" sx={{ display: 'inline-block' }}>Портфолио</Box>
        </Box>
      </Box>
    </Box>
  ),
}

export default function BlockView() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('classic')
  const [expanded, setExpanded] = useState(null)

  const sel = previews[selected]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f2f5', pt: { xs: 10, md: 12 }, pb: 6 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <IconButton onClick={() => navigate('/')} sx={{ color: 'text.secondary' }}><ArrowBackIcon /></IconButton>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>Выбор главного блока</Typography>
            <Typography variant="body1" color="text.secondary">Сравнение и согласование вариантов Hero-секции лендинга</Typography>
          </Box>
        </Box>

        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {variants.map((v) => (
            <Grid item xs={6} sm={4} md={2} key={v.id}>
              <Paper
                elevation={0}
                onClick={() => setSelected(v.id)}
                sx={{
                  p: 2, cursor: 'pointer', borderRadius: 2.5,
                  border: '2px solid',
                  borderColor: selected === v.id ? v.color : 'grey.100',
                  bgcolor: selected === v.id ? `${v.color}06` : 'white',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: v.color, bgcolor: `${v.color}04`, transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' },
                }}
              >
                <Box sx={{ color: v.color, mb: 0.5, fontSize: 22 }}>{v.icon}</Box>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.25 }}>{v.title}</Typography>
                <Typography variant="caption" color="text.secondary">{v.desc}</Typography>
                {selected === v.id && (
                  <Chip label="Выбран" size="small" color="primary" sx={{ mt: 1, height: 22, fontSize: '0.65rem', borderRadius: 6 }} />
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'grey.200', position: 'relative' }}>
          <Box sx={{ height: 420, position: 'relative' }} key={selected}>
            {sel}
          </Box>
          <Box sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'grey.100', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
            <Box>
              <Typography variant="subtitle2" fontWeight={700}>
                {variants.find(v => v.id === selected)?.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {variants.find(v => v.id === selected)?.desc} · Анимация: {['fadeInUp', 'fadeIn', 'slideInLeft + slideInRight', 'scaleIn', 'blurIn', 'slideUp'][variants.findIndex(v => v.id === selected)]}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" size="small" sx={{ borderRadius: 6 }} onClick={() => navigate('/')}>
                Применить на сайт
              </Button>
              <Button variant="contained" color="secondary" size="small" sx={{ color: 'white', borderRadius: 6 }}>
                Утвердить
              </Button>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Сравнение анимаций</Typography>
          <Grid container spacing={2}>
            {[
              { name: 'fadeInUp', desc: 'Появление снизу с подъёмом', el: 'Hero, заголовки' },
              { name: 'fadeIn', desc: 'Плавное появление', el: 'Минимал-блок' },
              { name: 'slideInLeft + Right', desc: 'Выезд с двух сторон', el: 'Сплит-блок' },
              { name: 'scaleIn', desc: 'Увеличение из центра', el: 'Акцент-Голд, иконка' },
              { name: 'blurIn', desc: 'Появление из размытия', el: 'Стекло-карточка' },
              { name: 'slideUp', desc: 'Каскадный подъём', el: 'Асимметрия, параллакс' },
            ].map((a) => (
              <Grid item xs={6} sm={4} md={2} key={a.name}>
                <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'grey.100', borderRadius: 2, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>{a.name}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>{a.desc}</Typography>
                  <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 600 }}>{a.el}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
