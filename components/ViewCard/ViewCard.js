import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import styles from './ViewCard.module.css';
import fire from '../../config/fire-conf';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import { useEffect, useState, Fragment, useContext } from 'react';
import formatDistance from 'date-fns/formatDistance';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import CardHeader from '@material-ui/core/CardHeader';
import Popover from '@material-ui/core/Popover';
import EditPost from '../EditPost/EditPost';
import DeletePost from '../DeletePost/DeletePost';
import IconButton from '@material-ui/core/IconButton';
import {useFirestore} from '../../firebase/useFirestore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import PeopleIcon from '@material-ui/icons/People';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import {UserDataContext} from '../../providers/userdataprovider';
const firestore = useFirestore();


const ViewCard = ({ post }) => {  
  const router = useRouter()
  const userData = useContext(UserDataContext);
  const [date, setDate] = useState(post.date.toDate());


  if(userData){
    return (
      <div>
  <Card className={styles.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" src={post.photoURL}></Avatar>
          }
          title={post.name}
          subheader={formatDistance(new Date(), date) + " ago"}
        />
  
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="p">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        </CardContent>
      </Card>
    
      </div>
    );
  }else{
    return (<h1>Loading...</h1>)
  }
  
}

export default ViewCard;
