import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote'

const stageOptions = [
  { value: 'menu', label: 'Меню' },
  { value: 'alcohol', label: 'Алкоголь' },
  { value: 'venue', label: 'Выезд на площадку' },
  { value: 'control', label: 'Контроль мероприятия' },
  { value: 'report', label: 'Пост-отчёт' },
]

export default function ChangeRequestModal({ open, onClose, onSubmit, defaultStage }) {
  const [stage, setStage] = useState(defaultStage || 'menu')
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (!text.trim()) return
    onSubmit(text.trim(), stage)
    setText('')
    onClose()
  }

  const handleClose = () => {
    setText('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <EditNoteIcon color="secondary" /> Запросить изменение
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Этап"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
          >
            {stageOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            multiline
            rows={4}
            size="small"
            label="Опишите запрашиваемое изменение"
            placeholder="Например: заменить десерт на лёгкий вариант, увеличить количество алкоголя..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2.5, pt: 0 }}>
        <Button onClick={handleClose} variant="outlined" size="small" sx={{ borderRadius: 8 }}>
          Отмена
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="secondary"
          size="small"
          disabled={!text.trim()}
          sx={{ borderRadius: 8, color: 'white' }}
        >
          Отправить запрос
        </Button>
      </DialogActions>
    </Dialog>
  )
}
