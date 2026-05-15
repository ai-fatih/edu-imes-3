import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#1a237e', light: '#534bae', dark: '#000051' },
    secondary: { main: '#c6a862', light: '#fada91', dark: '#947935' },
    background: { default: '#f8f9fa', paper: '#ffffff' },
    text: { primary: '#111827', secondary: '#6b7280' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
    h1: { fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', lineHeight: 1.1 },
    h2: { fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.2 },
    h3: { fontWeight: 600, fontSize: 'clamp(1.4rem, 3vw, 2rem)', lineHeight: 1.25 },
    h4: { fontWeight: 600, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' },
    h5: { fontWeight: 600, fontSize: '1.125rem' },
    h6: { fontWeight: 600, fontSize: '1rem' },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
  },
  shape: { borderRadius: 12 },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    '0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)',
    '0 10px 25px rgba(0,0,0,0.06), 0 4px 10px rgba(0,0,0,0.03)',
    '0 20px 50px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.04)',
    ...Array(20).fill('0 1px 3px rgba(0,0,0,0.06)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          fontWeight: 600,
          fontSize: '0.95rem',
          padding: '10px 28px',
          transition: 'all 0.25s ease',
        },
        contained: {
          boxShadow: '0 4px 14px rgba(26,35,126,0.25)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(26,35,126,0.35)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollPaddingTop: '80px' },
        body: {
          scrollBehavior: 'smooth',
          WebkitFontSmoothing: 'antialiased',
        },
        '*': { boxSizing: 'border-box' },
      },
    },
  },
})

export default theme
