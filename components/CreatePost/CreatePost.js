import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import fire from '../../config/fire-conf';
import Grid from '@material-ui/core/Grid';
import React from 'react';
// import TimePicker from 'react-time-picker';
import styles from './CreatePost.module.css'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { useRouter } from 'next/router';
import ReactDatetime from "react-datetime";
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
// import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SubjectIcon from '@material-ui/icons/Subject';
import RoomIcon from '@material-ui/icons/Room';
import { withStyles } from '@material-ui/core/styles';
// nodejs library that concatenates classes
import classnames from "classnames";
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

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

class CreatePost extends React.Component {
  state = {
    title: "",
    description: "",
    location: "",
    selectedDate: new Date(),
    selectedTime: new Date(),
    userData: {
      uid: this.props.uid,
      email: this.props.email,
      name: this.props.name,
      photoURL: this.props.photoURL
    },
    onClose: this.props.onClose,
    selectedValue: this.props.selectedValue,
    open: this.props.open
  };


  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  handleTimeChange = (time) => {
    this.setState({ selectedDate: time });
  };

  handleClose = () => {
    console.log("closing")
    this.props.onClose();
  };


  handleCreatePost = () => {
    console.log(this.state, "the state");
    // if (fire.auth().currentUser) {
    //   fire.firestore().doc(`users/${currentUser.uid}`).get().then((docData) => {
    //     let userData = { email: docData.data().email, uid: uid, photoURL: docData.data().photoURL, name: docData.data().name };
    //     fire.firestore()
    //       .collection('posts')
    //       .add({
    //         title: title,
    //         description: description,
    //         date: selectedDate,
    //         time: selectedTime,
    //         location: location,
    //         likesMembers: [],
    //         ...userData
    //       }).then((doc) => {
    //         fire.firestore().collection("posts").doc(doc.id).collection("joining").add(userData).then(() => {
    //           onClose(selectedValue);
    //         })
    //       }).catch((err) => {
    //         console.log("Found an error", err);
    //       })

    //     this.setState({
    //       title: "",
    //       description: "",
    //       location: "",
    //       selectedDate: new Date(),
    //       selectedTime: new Date()
    //     })
    //     router.push("/")
    //   })
    // }
  }

  render() {
    return (
      <Modal
        className="modal-dialog-centered"
        isOpen={this.props.open}
        toggle={() => this.handleClose()}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-default">
            Create Event
      </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => this.handleClose()}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
        <Label for="exampleText">Event Title</Label>
          <Input placeholder="Event Title..." type="text" onChange= {({target}) => this.setState({title: target.value})}/>

          <Label for="exampleText">Event Location</Label>
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="ni ni-zoom-split-in" />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Event Location..."
              type="text"
              onChange= {({target}) => this.setState({location: target.value})}
            />
          </InputGroup>

          <Label for="exampleText">Event Time</Label>
          <Row>
            <Col md="6">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-calendar-grid-58" />
                  </InputGroupText>
                </InputGroupAddon>
                <ReactDatetime
                  inputProps={{
                    placeholder: "Date Picker Here"
                  }}
                  timeFormat={false}
                  onChange={e =>
                    this.setState({date: e})
                  }
                />
              </InputGroup>
            </Col>

            <Col md="6">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-calendar-grid-58" />
                  </InputGroupText>
                </InputGroupAddon>
                <ReactDatetime
                  inputProps={{
                    placeholder: "Time Picker Here"
                  }}
                  dateFormat={false}

                  onChange={e =>
                    this.setState({time: e})
                  }
                />
              </InputGroup>
            </Col>
          </Row>

          <Label for="exampleText">Event Description</Label>
          <InputGroup>
            <Input type="textarea" name="text" id="exampleText" onChange= {({target}) => this.setState({description: target.value})}/>
          </InputGroup>

        </div>
        <div className="modal-footer">
          <Button color="primary" type="button" onClick={() => this.handleCreatePost()}>
            Create Event
          </Button>
          <Button
            className="ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => this.handleClose()}
          >
            Close
      </Button>
        </div>
      </Modal>
    );
  }

}

export default CreatePost;
