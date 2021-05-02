
import React from 'react';
import styles from './DeletePost.module.css';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useFirestore } from '../../firebase/useFirestore';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const firestore = useFirestore();

import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col,
  Label
} from "reactstrap";


const DeletePost = ({ post, open, onClose }) => {

  const handleCloseDialog = () => {
    onClose(false);
  };

  const deletePost = () => {
    firestore.getCollection(`posts/${post.id}/joining`, (result) => {
      result.forEach((doc) => {
        firestore.deleteDocument(`posts/${post.id}/joining/${doc.id}`)
      })

      firestore.deleteDocument(`posts/${post.id}`, (result) => {
        onClose(true);
      })
    })

  }

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={open}
      toggle={handleCloseDialog}
    >
      <div className="modal-header">
        <h6 className="modal-title" id="modal-title-default">
          Delete Event
      </h6>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={handleCloseDialog}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <Label for="exampleText">Are you sure you want to delete "{post.title}"? This action cannot be undone.</Label>
        <Button className="btn-1 ml-1" color="warning" type="button" onClick={deletePost}>
                    Delete Event
        </Button>
      </div>
    </Modal>

  );
}

export default DeletePost;
