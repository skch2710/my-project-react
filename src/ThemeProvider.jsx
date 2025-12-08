import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import theme from './theme/theme'
import App from './App'
import { ToastContainer } from 'react-toastify'

const ThemeProvider = () => {
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <App />
        <ToastContainer autoClose={5000} pauseOnFocusLoss={false} />
      </MuiThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeProvider