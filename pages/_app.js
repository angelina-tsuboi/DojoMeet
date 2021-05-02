import '../styles/globals.css'
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import fire from '../config/fire-conf';
import Navbar from '../components/Navbar/Navbar';
import { useRouter } from 'next/router';
import DemoNavbar from "../components/Landing/Navbars/DemoNavbar.js";
import { AuthProvider } from '../providers/authprovider';
import { UserDataProvider } from '../providers/userdataprovider';

import "../public/css/argon-design-system-react.css";
// import "../public/scss/argon-design-system-react.scss?v1.1.0";


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
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })

  return (
    <div>
      <AuthProvider>
        <UserDataProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <DemoNavbar loggedIn={loggedIn} router={router}/>
            <Component {...pageProps} />
          </ThemeProvider>
        </UserDataProvider>
      </AuthProvider>
    </div>
  )
}

export default MyApp
