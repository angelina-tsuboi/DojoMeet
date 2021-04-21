
import React from 'react';
import styles from './DeletePost.module.css';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useFirestore } from '../../firebase/useFirestore';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const firestore = useFirestore();


const DeletePost = ({ post, open, onClose }) => {
  
  const handleCloseDialog = () => {
    onClose(false);
  };

  const deletePost = () => {
    firestore.deleteDocument(`posts/${post.id}`, (result) => {
      onClose(true);
    })
  }

  return (
    <div>
      <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Delete Post</DialogTitle>
        <p>Are you sure you want to delete "<b>{post.title}</b>"? You can't undo this action.</p>
        <div className={styles.buttons}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={deletePost}>Delete</Button>
        </div>
      </Dialog>
      
    </div>

  );
}

export default DeletePost;
