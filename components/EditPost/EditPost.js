
import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';

const EditPost = ({post, open, onClose})  => {
    const handleClose = () => {
        onClose();
    };
    
      return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title">Edit Post</DialogTitle>
          <h1>{post.title}</h1>
        </Dialog>
      );
}

  export default EditPost;
  