import { useState, useMemo } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material'
import LiquorIcon from '@mui/icons-material/Liquor'

const profiles = [
  { value: 'wedding', label: 'Свадьба', wine: 0.18, sparkling: 0.12, spirits: 0.06, beer: 0.1, water: 0.25, juice: 0.15 },
  { value: 'corporate', label: 'Корпоратив', wine: 0.12, sparkling: 0.06, spirits: 0.1, beer: 0.15, water: 0.2, juice: 0.1 },
  { value: 'banquet', label: 'Банкет', wine: 0.15, sparkling: 0.08, spirits: 0.08, beer: 0.08, water: 0.2, juice: 0.12 },
  { value: 'anniversary', label: 'Юбилей', wine: 0.16, sparkling: 0.1, spirits: 0.07, beer: 0.06, water: 0.2, juice: 0.14 },
]

const bottleSizes = {
  wine: { size: 0.75, label: 'бут. вина (0.75 л)' },
  sparkling: { size: 0.75, label: 'бут. игристого (0.75 л)' },
  spirits: { size: 0.7, label: 'бут. крепкого (0.7 л)' },
  beer: { size: 0.5, label: 'бут. пива (0.5 л)' },
  water: { size: 1, label: 'л воды' },
  juice: { size: 1, label: 'л сока' },
}

export default function AlcoholCalculator({ open, onClose }) {
  const [guests, setGuests] = useState(50)
  const [hours, setHours] = useState(4)
  const [profile, setProfile] = useState('wedding')

  const results = useMemo(() => {
    const p = profiles.find((x) => x.value === profile)
    if (!p) return []
    return Object.entries(bottleSizes).map(([key, bs]) => {
      const litersPerPerson = p[key] * hours
      const totalLiters = litersPerPerson * guests
      const bottles = Math.ceil(totalLiters / bs.size)
      return {
        key,
        label: bs.label,
        bottles,
        totalLiters: Math.round(totalLiters * 10) / 10,
        perPerson: Math.round(litersPerPerson * 1000),
      }
    })
  }, [guests, hours, profile])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LiquorIcon color="secondary" /> Калькулятор алкоголя
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3, pt: 1 }}>
          <TextField
            label="Гостей"
            type="number"
            size="small"
            value={guests}
            onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
            sx={{ width: 120 }}
          />
          <TextField
            label="Часов"
            type="number"
            size="small"
            value={hours}
            onChange={(e) => setHours(Math.max(1, Number(e.target.value)))}
            sx={{ width: 100 }}
          />
          <TextField
            select
            label="Тип мероприятия"
            size="small"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            sx={{ minWidth: 160 }}
          >
            {profiles.map((p) => (
              <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
            ))}
          </TextField>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Напиток</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>Кол-во</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>На человека</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((r) => (
                <TableRow key={r.key}>
                  <TableCell>{r.label}</TableCell>
                  <TableCell align="right">
                    <Chip label={`${r.bottles} шт.`} size="small" variant="outlined" sx={{ borderRadius: 6, fontWeight: 600 }} />
                  </TableCell>
                  <TableCell align="right">{r.perPerson} мл</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Всего напитков</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  {results.reduce((s, r) => s + r.bottles, 0)} шт.
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions sx={{ p: 2.5, pt: 0 }}>
        <Button onClick={onClose} variant="outlined" size="small" sx={{ borderRadius: 8 }}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  )
}
