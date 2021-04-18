import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './PlayerCard.module.css';

import Avatar from '@material-ui/core/Avatar';



const PlayerCard = ({player})  => {
    const router = useRouter()
    const [raised, setRaised] = React.useState(false);

    const goToPlayer = (uid) => {
        router.push(`/players/${uid}`);
    };

    const toggleRaised = () => setRaised(!raised);

    const onMouseOut = () => setShadow(1);
  
    return (
        <Card onClick={() => goToPlayer(player.uid)} 
        className={styles.card}
        onMouseOut={toggleRaised} 
        onMouseOver={toggleRaised} 
        raised={raised}
        >
        <CardContent>
         <Avatar alt={player.name} src={player.photoURL} style={{margin: 'auto', marginBottom: '10px', width: '70px', height: '70px', marginTop: '10px'}}/>
          <h3 className={styles.topText}>{ player.name }</h3>

          <h5 className={styles.bottomText}>{ player.email }</h5>

          <h5 className={styles.bottomText}>{ player.location }</h5>
        </CardContent>

      </Card>
    );
  }

  export default PlayerCard;
  