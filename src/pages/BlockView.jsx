import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container, Typography, Grid, Box, Button, Chip, Paper, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Rating
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DiamondIcon from '@mui/icons-material/Diamond'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import StarsIcon from '@mui/icons-material/Stars'

const metrics = [
  { label: 'Визуальный вес', a: 9, b: 7 },
  { label: 'Читаемость текста', a: 8, b: 9 },
  { label: 'Современность', a: 8, b: 10 },
  { label: 'Адаптивность', a: 7, b: 9 },
  { label: 'Уникальность', a: 9, b: 8 },
]

export default function BlockView() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f2f5', pt: { xs: 10, md: 12 }, pb: 6 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
          <IconButton onClick={() => navigate('/')} sx={{ color: 'text.secondary' }}><ArrowBackIcon /></IconButton>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>Финальное согласование Hero</Typography>
            <Typography variant="body1" color="text.secondary">Сравните два отобранных варианта и выберите лучший</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 3, mt: 1 }}>
          <Chip icon={<StarsIcon />} label="Акцент-Голд — премиальный, тёмный + золотой" color="warning" variant="outlined" size="small" sx={{ borderRadius: 6 }} />
          <Chip icon={<DiamondIcon />} label="Стекло — современный, frosted glass" color="primary" variant="outlined" size="small" sx={{ borderRadius: 6 }} />
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '2px solid', borderColor: selected === 'a' ? '#c6a862' : 'grey.200', transition: '0.2s' }}>
              <Box sx={{ bgcolor: '#0d1150', color: 'white', px: 2.5, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DiamondIcon sx={{ color: '#c6a862', fontSize: 20 }} /> Вариант А — Акцент-Голд
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>scaleIn + fadeIn каскад · премиальный стиль</Typography>
                </Box>
                <Chip label="scaleIn" size="small" sx={{ bgcolor: 'rgba(198,168,98,0.2)', color: '#c6a862', fontWeight: 600, borderRadius: 6, fontSize: '0.65rem' }} />
              </Box>

              <Box sx={{ height: 380, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#0d1150' }}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 260, height: 260, borderRadius: '50%', border: '3px solid rgba(198,168,98,0.06)' }} />
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 180, height: 180, borderRadius: '50%', border: '2px solid rgba(198,168,98,0.1)' }} />
                <Box sx={{ position: 'absolute', top: 16, right: 24, width: 40, height: 40, bgcolor: '#c6a862', borderRadius: '50%', opacity: 0.12 }} />
                <Box sx={{ position: 'absolute', bottom: 20, left: 20, width: 24, height: 24, bgcolor: '#c6a862', borderRadius: '50%', opacity: 0.08 }} />
                <Box sx={{ position: 'absolute', top: '30%', right: '15%', width: 12, height: 12, bgcolor: '#c6a862', borderRadius: '50%', opacity: 0.15 }} />
                <Box sx={{ position: 'absolute', bottom: '25%', right: '25%', width: 8, height: 8, bgcolor: '#c6a862', borderRadius: '50%', opacity: 0.2 }} />

                <DiamondIcon sx={{ color: '#c6a862', fontSize: 40, mb: 2, animation: 'scaleIn 0.8s ease both', '@keyframes scaleIn': { '0%': { opacity: 0, transform: 'scale(0.3) rotate(-45deg)' }, '100%': { opacity: 1, transform: 'scale(1) rotate(0deg)' } } }} />
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, fontSize: '1.8rem', textAlign: 'center', lineHeight: 1.15, animation: 'fadeUp 0.6s ease 0.15s both', '@keyframes fadeUp': { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } } }}>
                  Идеальные мероприятия
                </Typography>
                <Typography variant="h5" sx={{ color: '#c6a862', fontWeight: 700, fontSize: '1.3rem', textAlign: 'center', mb: 2.5, animation: 'fadeUp 0.6s ease 0.3s both' }}>
                  начинаются с нас
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, animation: 'fadeUp 0.6s ease 0.45s both' }}>
                  <Box sx={{ px: 3, py: 1, borderRadius: 2, bgcolor: '#c6a862', color: 'white', fontSize: '0.85rem', fontWeight: 700, boxShadow: '0 4px 16px rgba(198,168,98,0.3)' }}>
                    Заказать →
                  </Box>
                  <Box sx={{ px: 3, py: 1, borderRadius: 2, border: '1.5px solid rgba(255,255,255,0.25)', color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>
                    Услуги
                  </Box>
                </Box>
              </Box>

              <Box sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Спецификация</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2 }}>
                  {[
                    ['Фон', '#0d1150 с полупрозрачными кругами'],
                    ['Анимация', 'scaleIn (иконка) + fadeUp (текст, каскад)'],
                    ['Акцент', 'DiamondIcon, золотые частицы ✦'],
                    ['Кнопка', 'Сплошная gold, box-shadow'],
                    ['Декорации', '3 концентрических круга, 5 частиц'],
                  ].map(([k, v]) => (
                    <Box key={k}>
                      <Typography variant="caption" color="text.secondary">{k}</Typography>
                      <Typography variant="caption" fontWeight={500} sx={{ display: 'block' }}>{v}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button
                  variant={selected === 'a' ? 'contained' : 'outlined'}
                  color="warning"
                  fullWidth
                  onClick={() => setSelected(selected === 'a' ? null : 'a')}
                  sx={{ borderRadius: 2, fontWeight: 700 }}
                >
                  {selected === 'a' ? '✓ Выбран' : 'Выбрать этот вариант'}
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '2px solid', borderColor: selected === 'b' ? '#1a237e' : 'grey.200', transition: '0.2s' }}>
              <Box sx={{ bgcolor: '#1a237e', color: 'white', px: 2.5, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DiamondIcon sx={{ color: '#c6a862', fontSize: 20 }} /> Вариант Б — Стекло
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>blurIn · frosted glass · современный UX</Typography>
                </Box>
                <Chip label="blurIn" size="small" sx={{ bgcolor: 'rgba(198,168,98,0.2)', color: '#c6a862', fontWeight: 600, borderRadius: 6, fontSize: '0.65rem' }} />
              </Box>

              <Box sx={{ height: 380, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0d1150 0%, #1a237e 50%, #283593 100%)' }}>
                <Box sx={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,168,98,0.07) 0%, transparent 70%)' }} />
                <Box sx={{ position: 'absolute', bottom: -30, left: -30, width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(198,168,98,0.04) 0%, transparent 70%)' }} />
                <Box sx={{ position: 'absolute', top: '20%', left: '10%', width: 60, height: 60, borderRadius: '50%', border: '2px solid rgba(198,168,98,0.06)' }} />
                <Box sx={{ position: 'absolute', bottom: '30%', right: '15%', width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(198,168,98,0.05)' }} />

                <Paper elevation={0} sx={{ p: 3.5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1.5px solid rgba(255,255,255,0.1)', maxWidth: 300, width: '85%', textAlign: 'center', position: 'relative', zIndex: 1, animation: 'blurIn 0.9s ease both', '@keyframes blurIn': { '0%': { opacity: 0, filter: 'blur(12px)', transform: 'scale(0.95)' }, '100%': { opacity: 1, filter: 'blur(0)', transform: 'scale(1)' } }, '&::before': { content: '""', position: 'absolute', inset: 0, borderRadius: 3, padding: '1.5px', background: 'linear-gradient(135deg, rgba(198,168,98,0.3), transparent 50%, rgba(198,168,98,0.1))', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' } }}>
                  <RestaurantMenuIcon sx={{ color: '#c6a862', fontSize: 32, mb: 1.5 }} />
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, fontSize: '1.5rem', mb: 0.5 }}>
                    Идеальные мероприятия
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#c6a862', fontWeight: 600, fontSize: '1.1rem', mb: 1.5 }}>
                    начинаются с нас
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 2, fontSize: '0.75rem' }}>
                    Профессиональное сопровождение и контроль питания на вашем мероприятии.
                  </Typography>
                  <Box sx={{ px: 3, py: 1.2, borderRadius: 2, bgcolor: '#c6a862', color: 'white', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 1, boxShadow: '0 4px 16px rgba(198,168,98,0.25)' }}>
                    Заказать мероприятие
                  </Box>
                </Paper>
              </Box>

              <Box sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Спецификация</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mb: 2 }}>
                  {[
                    ['Фон', 'Градиент #0d1150 → #283593'],
                    ['Анимация', 'blurIn (карточка из размытия)'],
                    ['Акцент', 'Glassmorphism + gradient border'],
                    ['Кнопка', 'Внутри стеклянного блока'],
                    ['Декорации', '2 radial-градиента + круглые рамки'],
                  ].map(([k, v]) => (
                    <Box key={k}>
                      <Typography variant="caption" color="text.secondary">{k}</Typography>
                      <Typography variant="caption" fontWeight={500} sx={{ display: 'block' }}>{v}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button
                  variant={selected === 'b' ? 'contained' : 'outlined'}
                  color="primary"
                  fullWidth
                  onClick={() => setSelected(selected === 'b' ? null : 'b')}
                  sx={{ borderRadius: 2, fontWeight: 700 }}
                >
                  {selected === 'b' ? '✓ Выбран' : 'Выбрать этот вариант'}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Paper elevation={0} sx={{ mt: 3, p: 3, borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Сравнительная таблица</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Критерий</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Акцент-Голд</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Стекло</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Комментарий</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {metrics.map((m) => (
                  <TableRow key={m.label}>
                    <TableCell sx={{ fontWeight: 600 }}>{m.label}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        <Rating value={m.a / 2} precision={0.5} readOnly size="small" icon={<StarsIcon sx={{ fontSize: 16, color: '#c6a862' }} />} emptyIcon={<StarsIcon sx={{ fontSize: 16, opacity: 0.15 }} />} />
                        <Typography variant="body2" fontWeight={700}>{m.a}/10</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        <Rating value={m.b / 2} precision={0.5} readOnly size="small" icon={<StarsIcon sx={{ fontSize: 16, color: '#1a237e' }} />} emptyIcon={<StarsIcon sx={{ fontSize: 16, opacity: 0.15 }} />} />
                        <Typography variant="body2" fontWeight={700}>{m.b}/10</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {m.a > m.b ? (
                        <Chip label="Акцент-Голд лучше" color="warning" size="small" sx={{ borderRadius: 6, fontSize: '0.65rem' }} />
                      ) : m.b > m.a ? (
                        <Chip label="Стекло лучше" color="primary" size="small" sx={{ borderRadius: 6, fontSize: '0.65rem' }} />
                      ) : (
                        <Chip label="Равны" size="small" sx={{ borderRadius: 6, fontSize: '0.65rem' }} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 700 }}>ИТОГО</TableCell>
                  <TableCell align="center"><Typography variant="h6" fontWeight={800} sx={{ color: '#c6a862' }}>{metrics.reduce((s, m) => s + m.a, 0)}/50</Typography></TableCell>
                  <TableCell align="center"><Typography variant="h6" fontWeight={800} sx={{ color: '#1a237e' }}>{metrics.reduce((s, m) => s + m.b, 0)}/50</Typography></TableCell>
                  <TableCell align="center">
                    {metrics.reduce((s, m) => s + m.a, 0) > metrics.reduce((s, m) => s + m.b, 0)
                      ? <Chip label="Победитель: Акцент-Голд" color="warning" sx={{ borderRadius: 6, fontWeight: 700 }} />
                      : <Chip label="Победитель: Стекло" color="primary" sx={{ borderRadius: 6, fontWeight: 700 }} />
                    }
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {selected && (
          <Paper elevation={0} sx={{ mt: 3, p: 3, borderRadius: 3, border: '2px solid', borderColor: selected === 'a' ? '#c6a862' : '#1a237e', bgcolor: selected === 'a' ? 'rgba(198,168,98,0.04)' : 'rgba(26,35,126,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Выбран вариант {selected === 'a' ? 'А — Акцент-Голд' : 'Б — Стекло'}
              </Typography>
              <Typography variant="body2" color="text.secondary">Нажмите «Применить», чтобы заменить Hero на лендинге этим вариантом</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button variant="outlined" size="large" sx={{ borderRadius: 2 }} onClick={() => setSelected(null)}>Сбросить</Button>
              <Button variant="contained" color="secondary" size="large" sx={{ color: 'white', borderRadius: 2, px: 4 }} onClick={() => navigate('/')}>
                Применить на сайт
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  )
}
