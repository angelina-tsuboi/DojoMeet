import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import fire from '../../../config/fire-conf';
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
    title: this.props.post.title,
    description: this.props.post.description,
    location: this.props.post.location,
    selectedDate: this.props.post.date,
    selectedTime: this.props.post.time,
    userData: {
      uid: this.props.userData.uid,
      email: this.props.userData.email,
      name: this.props.userData.name,
      photoURL: this.props.userData.photoURL
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
