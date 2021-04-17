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
      <button onClick={goToRoute} value="register">
        Sign Up 
      </button>
      

      <h3>OR</h3>

      <button  onClick={goToRoute} value="login">
        Login
      </button>
    
    </div>
  )
}
export default HomePage;