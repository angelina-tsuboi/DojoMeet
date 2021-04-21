
import React from 'react';
import styles from './DeletePost.module.css';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';


const DeletePost = ({post, open, onClose})  => {
    const handleClose = () => {
        onClose();
    };
    
      return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title">Delete Post</DialogTitle>
          <p>Are you sure you want to delete "<b>{post.title}</b>"? You can't undo this action.</p>
          <div className={styles.buttons}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>Delete</Button>
          </div>
        </Dialog>
      );
  }

  export default DeletePost;
  