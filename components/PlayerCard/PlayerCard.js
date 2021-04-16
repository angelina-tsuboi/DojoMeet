import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const PlayerCard = ({player})  => {
    const router = useRouter()

    const goToPlayer = (uid) => {
        router.push(`/players/${uid}`);
    };
  
    return (
        <Card onClick={() => goToPlayer(player.uid)}>
        <CardContent>
          <Typography variant="h5" component="h2">
            { player.name }
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Sign Up</Button>
        </CardActions>
      </Card>
    );
  }

  export default PlayerCard;
  