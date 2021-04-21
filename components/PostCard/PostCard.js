import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import styles from './PostCard.module.css';
import fire from '../../config/fire-conf';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import { useEffect, useState, Fragment } from 'react';
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
const firestore = useFirestore();


const MenuOption = ({ isUser, post }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

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

  const handleClick = () => {
    console.log("click");
  }

  const handleUnClick = () => {
    console.log("unclick");
  }
  
  if (isUser) {
    return (
      <Button onClick={handleClick}>JOIN EVENT</Button>
    )
  }
  return <Button onClick={handleUnClick}>LEAVE EVENT</Button>;
}




const PostCard = ({ post }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const { currentUser } = fire.auth();
  const [date, setDate] = useState(new Date(post.date.seconds));
  const [gotJoinedMembers, setJoinedMembers] = useState(false)
  const [likeMembers, setLikeMembers] = useState([]);
  const [joining, setJoiningMembers] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getJoiningMembers();
    setLikeMembers(post.likesMembers);
  }, [])

  const getJoiningMembers = () => {
    if(!gotJoinedMembers){
      firestore.getCollection(`posts/${post.id}/joining`, (result) => {
        const returnData = result.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("return", returnData);
        setJoinedMembers(true);
        setJoiningMembers(returnData);
      })
    }
  }

  const handleHeart = async (uid) => {
    let result = likeMembers.find((member) => member == uid);
    if (result == null || result.length == 0) {
      firestore.updateDocument(`/posts/${post.id}`, {
        likesMembers: fire.firestore.FieldValue.arrayUnion(currentUser.uid)
      },(data) => {setLikeMembers([...likeMembers, currentUser.uid])})
    }else{
      firestore.updateDocument(`/posts/${post.id}`, {
        likesMembers: fire.firestore.FieldValue.arrayRemove(currentUser.uid)
      }, (data) => {let outcome = likeMembers.filter((member) => member != currentUser.uid); setLikeMembers(outcome)})
    }
  }

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
        <IconButton aria-label="view people" onClick={handleExpandClick}
          aria-expanded={expanded}>
          <PeopleIcon />
        </IconButton>
        <span>{joining.length}</span>
        <IconButton aria-label="add to favorites" onClick={()=> handleHeart(currentUser.uid)} className={likeMembers.includes(currentUser.uid) ? styles.highlight : styles.blank}>
          <FavoriteIcon />
        </IconButton>
        <span>{likeMembers.length}</span>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" component="p">People Joining:</Typography>
          <Typography paragraph>
            {joining.length} people are joining the event 
          </Typography>

          {joining.map(member =>
          <div className={styles.avatarDisplay}>
            <Avatar src={member.photoURL} className={styles.personAvatar}/>
            <span>{member.name}</span>
          </div>
          )}

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
          <Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      />
    </Card>
    
    </div>
  );
}

export default PostCard;
