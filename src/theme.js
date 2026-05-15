import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#1a237e', light: '#534bae', dark: '#000051' },
    secondary: { main: '#c6a862', light: '#fada91', dark: '#947935' },
    background: { default: '#fafafa', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
    h2: { fontWeight: 700, fontSize: '2.5rem' },
    h3: { fontWeight: 600, fontSize: '2rem' },
    h4: { fontWeight: 600, fontSize: '1.5rem' },
    h5: { fontWeight: 600, fontSize: '1.25rem' },
    h6: { fontWeight: 600, fontSize: '1rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8, fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
      },
    },
  },
})

export default theme
