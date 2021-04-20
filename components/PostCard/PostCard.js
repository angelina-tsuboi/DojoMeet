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
import formatDistance from 'date-fns/formatDistance';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Popover from '@material-ui/core/Popover';
import EditPost from '../EditPost/EditPost';
import DeletePost from '../DeletePost/DeletePost';
import IconButton from '@material-ui/core/IconButton';
import {useFirestore} from '../../firebase/useFirestore';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import PeopleIcon from '@material-ui/icons/People';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
const firestore = useFirestore();


const MenuOption = ({ isUser, post }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEdit = (value) => {
    setOpenEdit(value);
  }

  const handleOpenDelete = (value) => {
    setOpenDelete(value)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (isUser) {
    return (
      <div>
        <IconButton aria-label="settings" onClick={handleClick} aria-describedby={id} >
          <MoreVertIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Button onClick={() => handleOpenEdit(true)}>Edit Post</Button>
          <br />
          <Button onClick={() => handleOpenDelete(true)}>Delete Post</Button>
        </Popover>

        <EditPost  post={post} open={openEdit} onClose={() => handleOpenEdit(false)} />
        <DeletePost post={post} open={openDelete} onClose={() =>handleOpenDelete(false)}/>
      </div>
    )
  }
  return null;

}


const JoinButton = ({ isUser }) => {
  if (isUser) {
    return (
      <Button>JOIN EVENT</Button>
    )
  }
  return null;
}




const PostCard = ({ post }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter()
  const { currentUser } = fire.auth();
  const [date, setDate] = React.useState(new Date(post.date.seconds));
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const checkJoined = async (uid) => {
    let result = post.joined.find(x => x.uid === uid);
    if (!result) {
      fire.firestore().doc(`/posts/${post.uid}`).update({
        joined: fire.firestore.FieldValue.arrayUnion({ name: currentUser.displayName, uid: currentUser.uid, photoURL: currentUser.photoURL })
      })
    }
  }

  const handleHeart = async (uid) => {
    let result = post.likesMembers.find(x => x.uid === uid);
    if (!result) {
      firestore.updateDocument(`/posts/${post.id}`, {
        likesMembers: fire.firestore.FieldValue.arrayUnion(currentUser.uid)
      })
    }
  }

  const handleClick = async () => {
    await checkJoined();
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  // const goToPost = (postId) => {
  //   router.push(`/posts/${postId}`);
  // };


  return (
    <div>
<Card className={styles.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={post.photoURL}></Avatar>
        }
        action={
          <MenuOption isUser={post.uid == currentUser.uid} post={post}></MenuOption>
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
      <CardActions disableSpacing>
        <JoinButton isUser={post.uid != currentUser.uid}></JoinButton>
        <Button onClick={handleClick}>JOIN EVENT</Button>
        <IconButton aria-label="view people" onClick={handleExpandClick}
          aria-expanded={expanded}>
          <PeopleIcon />
        </IconButton>
        <IconButton aria-label="add to favorites" onClick={handleHeart}>
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

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Event joined"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Card>
    
    </div>
  );
}

export default PostCard;
