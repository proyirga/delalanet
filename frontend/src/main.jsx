import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import App from './App.jsx'
import './index.css'
import Header from './components/Header.jsx'

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.600', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#101010')(props)
    }
  })
};

const config = {
  initialColorMode: "dark",
  useSystemStyles: true
};
const colors = {
  gray: {
    light: '#616161',   
    dark: '#1e1e1e'
  }
}

const theme = extendTheme({ config, styles, colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Header/>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
