import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
} from '@mui/material'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'

export default function NpsModal({ open, onClose, onSubmit, order }) {
  const [score, setScore] = useState(0)
  const [comment, setComment] = useState('')

  if (!order) return null

  const handleSubmit = () => {
    if (score === 0) return
    onSubmit(order.id, score, comment)
    setScore(0)
    setComment('')
    onClose()
  }

  const npsLabel =
    score >= 9 ? 'Промоутер' : score >= 7 ? 'Нейтрал' : score > 0 ? 'Критик' : ''

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
          Оцените работу PBS
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {order.eventType} · {order.id}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center', pb: 3 }}>
        <Box sx={{ py: 2 }}>
          <Rating
            value={score}
            onChange={(e, v) => setScore(v || 0)}
            max={10}
            icon={<StarIcon sx={{ fontSize: 36, color: 'secondary.main' }} />}
            emptyIcon={<StarIcon sx={{ fontSize: 36, opacity: 0.2 }} />}
          />
        </Box>
        {npsLabel && (
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              color:
                score >= 9
                  ? 'success.main'
                  : score >= 7
                    ? 'warning.main'
                    : 'error.main',
            }}
          >
            {npsLabel}
          </Typography>
        )}
        <TextField
          fullWidth
          multiline
          rows={3}
          size="small"
          placeholder="Поделитесь впечатлениями (необязательно)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          disabled={score === 0}
          onClick={handleSubmit}
          sx={{ borderRadius: 10, color: 'white', px: 5 }}
        >
          Отправить оценку
        </Button>
      </DialogActions>
    </Dialog>
  )
}
