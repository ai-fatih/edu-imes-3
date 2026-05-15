import { Paper, Typography, Grid, IconButton } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import DownloadIcon from '@mui/icons-material/Download'
import FolderIcon from '@mui/icons-material/Folder'

const typeIcons = {
  estimate_original: <DescriptionIcon color="primary" />,
  estimate_pbs: <DescriptionIcon color="secondary" />,
  menu_original: <DescriptionIcon color="info" />,
  menu_final: <DescriptionIcon color="success" />,
  alcohol_calc: <DescriptionIcon sx={{ color: '#9c27b0' }} />,
  inspection_act: <DescriptionIcon color="warning" />,
  menu_analysis: <DescriptionIcon color="secondary" />,
}

export default function DocumentVault({ documents }) {
  if (!documents?.length) return null

  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'grey.100', borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <FolderIcon color="secondary" /> Документы
      </Typography>
      <Grid container spacing={1.5}>
        {documents.map((doc, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: 'grey.50',
                borderRadius: 2,
                transition: '0.15s',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              {typeIcons[doc.type] || <DescriptionIcon />}
              <Typography variant="body2" sx={{ flex: 1, fontSize: '0.8rem', wordBreak: 'break-all' }}>
                {doc.name}
              </Typography>
              <IconButton size="small" disabled={!doc.url}>
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}
