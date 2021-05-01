import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import styles from './PostCard.module.css';
import fire from '../../config/fire-conf';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import { useEffect, useState, Fragment, useContext } from 'react';
import { format } from 'date-fns';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import CardHeader from '@material-ui/core/CardHeader';
import Popover from '@material-ui/core/Popover';
import EditPost from '../EditPost/EditPost';
import DeletePost from '../DeletePost/DeletePost';
import IconButton from '@material-ui/core/IconButton';
import { useFirestore } from '../../firebase/useFirestore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import PeopleIcon from '@material-ui/icons/People';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { UserDataContext } from '../../providers/userdataprovider';
const firestore = useFirestore();


const MenuOption = ({ isUser, post }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEdit = (value) => {
    setOpenEdit(value);
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  const handleOpenDelete = (value) => {
    setOpenDelete(value)
  }

  const handleDeleteFunc = (value, response) => {
    setOpenDelete(value);
    if (response) {
      setOpenSnackbar(true);
    }
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

        <EditPost post={post} open={openEdit} onClose={() => handleOpenEdit(false)} />
        <DeletePost post={post} open={openDelete} onClose={(value) => handleDeleteFunc(false, value)} />

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Post Deleted!"
          action={
            <Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Fragment>
          }
        />

      </div>
    )
  }
  return null;

}


const JoinButton = ({ joiningEvent, onJoin, onLeave }) => {
  if (!joiningEvent) {
    return (
      <Button onClick={() => onJoin()}>JOIN EVENT</Button>
    )
  }
  return <Button onClick={() => onLeave()}>LEAVE EVENT</Button>;
}




const PostCard = ({ post }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const userData = useContext(UserDataContext);
  const [date, setDate] = useState(post.date.toDate());
  const [gotJoinedMembers, setJoinedMembers] = useState(false)
  const [likeMembers, setLikeMembers] = useState([]);
  const [joining, setJoiningMembers] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleJoin = () => {
    let user = { email: userData.email, name: userData.name, uid: userData.uid, photoURL: userData.photoURL };
    firestore.saveDocument(`/posts/${post.id}/joining/${user.uid}`, user, (result) => {
      firestore.updateDocument(`/posts/${post.id}`, {
        joiningMembers: fire.firestore.FieldValue.arrayUnion(userData.uid)
      }, (data) => { setJoiningMembers([...joining, user]); })
    })
  }

  const openPost = (id) => {
    console.log("opening", id)
    router.push(`/posts/${id}`);
  }


  const handleLeave = () => {
    let outcome = joining.filter((member) => member.uid != userData.uid);
    firestore.deleteDocument(`posts/${post.id}/joining/${userData.uid}`, (result) => {
      firestore.updateDocument(`/posts/${post.id}`, {
        joiningMembers: fire.firestore.FieldValue.arrayRemove(userData.uid)
      }, (data) => { let outcome = joining.filter((member) => member != userData.uid); setJoiningMembers(outcome) })
      setJoiningMembers(outcome)
    })
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  const includesJoiningMember = (uid) => {
    let joiningMembers = joining.filter((member) => { return member.uid == uid });
    return (joiningMembers.length > 0);
  }

  const handleHeart = async (uid) => {
    let result = likeMembers.find((member) => member == uid);
    if (result == null || result.length == 0) {
      firestore.updateDocument(`/posts/${post.id}`, {
        likesMembers: fire.firestore.FieldValue.arrayUnion(userData.uid)
      }, (data) => { setLikeMembers([...likeMembers, userData.uid]) })
    } else {
      firestore.updateDocument(`/posts/${post.id}`, {
        likesMembers: fire.firestore.FieldValue.arrayRemove(userData.uid)
      }, (data) => { let outcome = likeMembers.filter((member) => member != userData.uid); setLikeMembers(outcome) })
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (userData) {
    return (
      <div>
        <Card className={styles.card}>
          <div>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" src={post.photoURL}></Avatar>
              }
              action={
                <MenuOption isUser={post.uid == userData.uid} post={post}></MenuOption>
              }
              title={post.name}
              subheader={format(post.date.toDate(), 'MM/dd/yyyy') + " at " + format(post.time.toDate(), "HH:mm aaaaa'm'")}
            />

            <CardContent onClick={() => { openPost(post.id) }} className={styles.cardBody}>
              <Typography variant="h6" color="textPrimary" component="p">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.description}
              </Typography>
            </CardContent>
          </div>

          <CardActions disableSpacing>
            <JoinButton joiningEvent={includesJoiningMember(userData.uid)} onJoin={() => handleJoin()} onLeave={() => handleLeave()}></JoinButton>
            <IconButton aria-label="view people" onClick={handleExpandClick}
              aria-expanded={expanded}>
              <PeopleIcon />
            </IconButton>
            <span>{joining.length}</span>
            <IconButton aria-label="add to favorites" onClick={() => handleHeart(userData.uid)} className={likeMembers.includes(userData.uid) ? styles.highlight : styles.blank}>
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
                <div className={styles.avatarDisplay} key={member.uid}>
                  <Avatar src={member.photoURL} className={styles.personAvatar} />
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
  } else {
    return (<h1>Loading...</h1>)
  }

}

export default PostCard;
