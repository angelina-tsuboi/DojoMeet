import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './ViewCard.module.css';
import Avatar from '@material-ui/core/Avatar';
import { useEffect, useState, Fragment, useContext } from 'react';
import formatDistance from 'date-fns/formatDistance';
import CardHeader from '@material-ui/core/CardHeader';
import { useFirestore } from '../../firebase/useFirestore';
import { format } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import { UserDataContext } from '../../providers/userdataprovider';
const firestore = useFirestore();


const ViewCard = ({ post, openPost }) => {
  const router = useRouter()
  const userData = useContext(UserDataContext);
  const [date, setDate] = useState(post.date.toDate());
  const [likeMembers, setLikeMembers] = useState([]);
  const [joining, setJoiningMembers] = useState([]);
  const [gotJoinedMembers, setJoinedMembers] = useState(false)

  const openPostModal = () => {
    let postData = {name: post.name, email: post.email, title: post.title, date: post.date, time: post.time, id: post.id, photoURL: post.photoURL, description: post.description, location: post.location, joining: joining, likeMembers: post.likesMembers}
    console.log("data", postData);
    openPost(postData)
  }

  useEffect(() => {
    getJoiningMembers();
    setLikeMembers(post.likesMembers);
  }, [])


  const getJoiningMembers = () => {
    if (!gotJoinedMembers) {
      firestore.getCollection(`posts/${post.id}/joining`, (result) => {
        const returnData = result.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJoinedMembers(true);
        setJoiningMembers(returnData);
      })
    }
  }

  if (userData) {
    return (
      <div>
        <Card className={styles.card}>
          <div className={styles.cardHover} onClick={openPostModal}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" src={post.photoURL} className={styles.avatar}></Avatar>
              }
              title={post.name}
              subheader={format(post.date.toDate(), 'MM/dd/yyyy') + " at " + format(post.time.toDate(), "HH:mm aaaaa'm'")}
              className={styles.cardHeader}
            />
            <CardContent className={styles.cardBody} onClick={() => { openPostModal(post.id) }}>
              <Typography variant="h6" color="textPrimary" component="p">
              {post.title.length >= 30 ? `${post.title.slice(0, 27)}...` : post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              {post.description.length >= 50 ? `${post.description.slice(0, 47)}...` : post.description}
              </Typography>
              {post.joining && <Typography variant="body2" color="textSecondary" component="p">
                {post.joining.length} joining
          </Typography>}

            </CardContent>
          </div>

        </Card>

      </div>
    );
  } else {
    return (<h1>Loading...</h1>)
  }

}

export default ViewCard;
