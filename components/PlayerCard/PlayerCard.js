import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './PlayerCard.module.css';

import Avatar from '@material-ui/core/Avatar';



const PlayerCard = ({player})  => {
    const router = useRouter()

    const goToPlayer = (uid) => {
        router.push(`/players/${uid}`);
    };
  
    return (
        <Card onClick={() => goToPlayer(player.uid)} className={styles.card}>
        <CardContent>
         <Avatar alt={player.name} src={player.photoURL} style={{margin: 'auto', marginBottom: '10px', width: '60px', height: '60px'}}/>
          <Typography variant="h5" component="h2">
            { player.name }
          </Typography>
          <Typography variant="h7" component="h7">
            { player.email }
          </Typography>
          <br />
          <Typography variant="h7" component="h7">
            { player.location }
          </Typography>
        </CardContent>

      </Card>
    );
  }

  export default PlayerCard;
  