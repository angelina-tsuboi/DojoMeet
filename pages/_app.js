import '../styles/globals.css'
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';


export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#3FCDE0",
    },
  },
});

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  )
}

export default MyApp
