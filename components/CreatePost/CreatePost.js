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

  formDisabled = () => {
    //check time is before current date time
    //check date is before current date
    if(this.state.title == "" || this.state.location == ""){
      return true;
    }
    return false;
  }

  handleTimeChange = (time) => {
    this.setState({ selectedDate: time });
  };

  handleClose = () => {
    console.log("closing")
    this.props.onClose();
  };


  handleCreatePost = () => {
    console.log(this.state, "the state");
    if (fire.auth().currentUser) {
      let uid = fire.auth().currentUser.uid;
      fire.firestore().doc(`users/${uid}`).get().then((docData) => {
        let userData = { email: docData.data().email, uid: uid, photoURL: docData.data().photoURL, name: docData.data().name };
        fire.firestore()
          .collection('posts')
          .add({
            title: this.state.title,
            description: this.state.description,
            date: this.state.selectedDate,
            time: this.state.selectedTime,
            location: this.state.location,
            likesMembers: [],
            ...userData
          }).then((doc) => {
            fire.firestore().collection("posts").doc(doc.id).collection("joining").add(userData).then(() => {
              this.handleClose
            })
          }).catch((err) => {
            console.log("Found an error", err);
          })

        this.setState({
          title: "",
          description: "",
          location: "",
          selectedDate: new Date(),
          selectedTime: new Date()
        })        
      })
    }
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
                    this.setState({selectedDate: e.toDate()})
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
                    this.setState({selectedTime: e.toDate()})
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
          <Button color="primary" type="button" onClick={() => this.handleCreatePost()} disabled={this.formDisabled()}>
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
