import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './ViewCard.module.css';
import Avatar from '@material-ui/core/Avatar';
import { useEffect, useState, Fragment, useContext } from 'react';
import formatDistance from 'date-fns/formatDistance';
import CardHeader from '@material-ui/core/CardHeader';
import {useFirestore} from '../../firebase/useFirestore';
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
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="p">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.joining.length} joining
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
