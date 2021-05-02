import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import fire from '../../config/fire-conf';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import ReactDatetime from "react-datetime";

// reactstrap components
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

import 'date-fns';

class PostModal extends React.Component {
  state = {
    title: props.post.title,
    description: props.post.description,
    location: props.post.location,
    selectedDate: props.post.date,
    selectedTime: props.post.time,
    userData: {
      uid: props.userData.uid,
      email: props.userData.email,
      name: props.userData.name,
      photoURL: props.userData.photoURL
    },
    onClose: this.props.onClose,
    selectedValue: this.props.selectedValue,
    open: this.props.open
  };

  handleClose = () => {
    console.log("closing")
    this.props.onClose();
  };

  render() {
    return (
      <Modal
        className="modal-dialog-centered"
        isOpen={this.props.open}
        toggle={() => this.handleClose()}
      >
        <h1>Hello {this.state.name}, to {this.state.title}</h1>
      </Modal>
    );
  }

}

export default PostModal;
