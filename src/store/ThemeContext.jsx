import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import baseTheme from '../theme'

/* eslint-disable react-refresh/only-export-components */

const Ctx = createContext(null)

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem('bs_theme_mode') || 'light' }
    catch { return 'light' }
  })

  useEffect(() => {
    try { localStorage.setItem('bs_theme_mode', mode) }
    catch { /* noop */ }
  }, [mode])

  const toggle = () => setMode((m) => (m === 'light' ? 'dark' : 'light'))

  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          ...baseTheme.palette,
          mode,
          ...(mode === 'dark'
            ? {
                background: { default: '#121212', paper: '#1e1e1e' },
                text: { primary: '#e0e0e0', secondary: '#a0a0a0' },
              }
            : {}),
        },
      }),
    [mode],
  )

  return (
    <Ctx.Provider value={{ mode, toggle }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </Ctx.Provider>
  )
}

export function useThemeMode() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useThemeMode must be inside ThemeProvider')
  return ctx
}
