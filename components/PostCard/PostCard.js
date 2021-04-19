import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import styles from './PostCard.module.css';
import fire from '../../config/fire-conf';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import React from 'react';
import formatDistance from 'date-fns/formatDistance'
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import PeopleIcon from '@material-ui/icons/People';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';


const MenuOption = ({isUser}) => {
  if(isUser){
    return (
      <IconButton aria-label="settings">
                <MoreVertIcon />
      </IconButton>
        )
  }
  return null;
}

const JoinButton = ({isUser}) => {
  if(isUser){
    return (
    <Button>JOIN EVENT</Button>
    )
  }
  return null;
}


const PostCard = ({post})  => {
    const router = useRouter()
    const { currentUser } = fire.auth();
    const [date, setDate] = React.useState(new Date(post.date.seconds));
    const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    const goToPost = (postId) => {
        router.push(`/posts/${postId}`);
    };

  
    return (
      <Card className={styles.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={post.photoURL}></Avatar>
        }
        action={
          <MenuOption isUser={post.uid == currentUser.uid}></MenuOption>
        }
        title={post.name}
        subheader={formatDistance(new Date(), date)}
      />

      <CardContent>
      <Typography variant="h6" color="textPrimary" component="p">
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <JoinButton isUser={post.uid != currentUser.uid}></JoinButton>
        <Button>JOIN EVENT</Button>
        <IconButton aria-label="view people" onClick={handleExpandClick}
          aria-expanded={expanded}>
          <PeopleIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" component="p">People Joining:</Typography>
          <Typography paragraph>
            13 people are joining the event
          </Typography>
          <Typography paragraph>
            <div className={styles.person}>
            <Avatar aria-label="recipe" src={post.photoURL} className={styles.personAvatar}></Avatar>
            <p className={styles.personName}>John Doe</p>
            </div>
          
          </Typography>
          
        </CardContent>
      </Collapse>

    </Card>
    );
  }

  export default PostCard;
  