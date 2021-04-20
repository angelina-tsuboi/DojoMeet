
import React from 'react';
import styles from './DeletePost.module.css';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


const DeletePost = ({post, open, onClose})  => {
    const handleClose = () => {
        onClose();
    };
    
      return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title">Delete Post</DialogTitle>
          <h1>{post.title}</h1>
        </Dialog>
      );
  }

  export default DeletePost;
  