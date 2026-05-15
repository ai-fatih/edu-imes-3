import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Chip,
} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import SendIcon from '@mui/icons-material/Send'

const stageLabels = {
  all: 'Все',
  menu: 'Меню',
  alcohol: 'Алкоголь',
  venue: 'Выезд',
  control: 'Контроль',
  report: 'Отчёт',
}

const stageColors = {
  menu: 'primary',
  alcohol: 'secondary',
  venue: 'info',
  control: 'warning',
  report: 'success',
}

export default function StageChat({ order, onSend }) {
  const [filter, setFilter] = useState('all')
  const [text, setText] = useState('')

  const filtered = (order.comments || []).filter(
    (c) => filter === 'all' || c.stageKey === filter,
  )

  const handleSend = () => {
    if (!text.trim()) return
    onSend(text.trim(), filter !== 'all' ? filter : null)
    setText('')
  }

  const formatDate = (iso) => {
    const d = new Date(iso)
    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  const getAvatar = (author) => {
    if (author === 'employee') return { letter: 'С', bgcolor: 'secondary.main' }
    if (author === 'client') return { letter: 'К', bgcolor: 'primary.main' }
    return { letter: 'ℹ', bgcolor: 'grey.400' }
  }

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <ChatIcon color="secondary" />
        <Typography variant="h6" sx={{ flex: 1 }}>
          Чат с менеджером
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
        {Object.entries(stageLabels).map(([key, label]) => (
          <Chip
            key={key}
            label={label}
            onClick={() => setFilter(key)}
            color={filter === key ? 'secondary' : 'default'}
            variant={filter === key ? 'filled' : 'outlined'}
            size="small"
            sx={{ borderRadius: 8, fontWeight: filter === key ? 600 : 400 }}
          />
        ))}
      </Box>

      <Box
        sx={{
          maxHeight: 360,
          overflow: 'auto',
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          pr: 0.5,
        }}
      >
        {filtered.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
            Нет сообщений в этом разделе
          </Typography>
        ) : (
          filtered.map((c) => {
            const av = getAvatar(c.author)
            return (
              <Box key={c.id} sx={{ display: 'flex', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: 11,
                    bgcolor: av.bgcolor,
                    flexShrink: 0,
                    mt: 0.3,
                  }}
                >
                  {av.letter}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.3 }}>
                    <Typography variant="caption" fontWeight={600}>
                      {c.authorName || (c.author === 'employee' ? 'Сотрудник' : 'Клиент')}
                    </Typography>
                    {c.stageKey && (
                      <Chip
                        label={stageLabels[c.stageKey]}
                        color={stageColors[c.stageKey]}
                        size="small"
                        variant="outlined"
                        sx={{ borderRadius: 6, fontSize: '0.6rem', height: 20 }}
                      />
                    )}
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(c.createdAt)}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{c.text}</Typography>
                </Box>
              </Box>
            )
          })
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Написать сообщение..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
              bgcolor: 'grey.50',
            },
          }}
        />
        <IconButton
          color="secondary"
          onClick={handleSend}
          disabled={!text.trim()}
          sx={{
            bgcolor: text.trim() ? 'secondary.main' : 'grey.200',
            color: text.trim() ? 'white' : 'grey.400',
            '&:hover': { bgcolor: 'secondary.dark' },
            width: 40,
            height: 40,
          }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Paper>
  )
}
