import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './HomePage.module.css';


const HomePage = () => {
    const router = useRouter()
    
const goToRoute = (e) => {
    e.preventDefault()
    router.push(e.target.value);
    }

  
  return (
    <div>
      <h1>Dojo Meet</h1>
      <p>A web app made with Next.js and Firebase that connects karate players across the globe</p>
      <img src="https://5.imimg.com/data5/XA/OB/GLADMIN-64233160/martial-arts-training-service-500x500.png"></img>

      <div className={styles.buttons}>
      <button onClick={goToRoute} value="register">
        Sign Up 
      </button>
      

      <button  onClick={goToRoute} value="login">
        Login
      </button>
      </div>
      
    
    </div>

  )
}
export default HomePage;