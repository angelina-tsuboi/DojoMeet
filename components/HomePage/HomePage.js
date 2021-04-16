import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';


const HomePage = () => {
    const router = useRouter()
    
const goToRoute = (e) => {
    e.preventDefault()
    router.push(e.target.value);
    }
  
  return (
    <div>
      <h1>Welcome!</h1>
      <Button variant="contained" color="primary" onClick={goToRoute} value="register">
        Sign Up 
      </Button>
      

      <h3>OR</h3>

      <Button variant="contained" color="secondary" onClick={goToRoute} value="login">
        Login
      </Button>
      

    </div>
  )
}
export default HomePage;