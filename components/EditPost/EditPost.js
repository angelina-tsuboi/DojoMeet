
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import fire from '../../config/fire-conf';
import { useFirestore } from '../../firebase/useFirestore';
import RoomIcon from '@material-ui/icons/Room';
import SubjectIcon from '@material-ui/icons/Subject';
import styles from './EditPost.module.css';
import ReactDatetime from "react-datetime";
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

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

class EditPost extends React.Component {

  state = {
    title: this.props.post.title,
    description: this.props.post.description,
    location: this.props.post.location,
    selectedDate: this.props.post.date.toDate(),
    selectedTime: this.props.post.time.toDate(),
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

  formDisabled = () => {
    //check time is before current date time
    //check date is before current date
    if (this.state.title == "" || this.state.location == "") {
      return true;
    }
    return false;
  }

  handleClose = () => {
    this.props.onClose();
  };

  updatePost = () => {
    let postData = { description: description, location: location, date: selectedDate, time: selectedTime, title: title };
    firestore.updateDocument(`posts/${post.id}`, postData, (result) => {
      this.props.onClose();
    })
  }

  handleDateChange = (date) => {
    setSelectedDate(date);
  };

  handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  handleUpdatePost = () => {
    console.log(this.state, "the state");
    if (fire.auth().currentUser) {
      let uid = fire.auth().currentUser.uid;
      fire.firestore().doc(`users/${uid}`).get().then((docData) => {
        fire.firestore()
          .collection('posts').doc(this.props.post.id)
          .update({
            title: this.state.title,
            description: this.state.description,
            date: this.state.selectedDate,
            time: this.state.selectedTime,
            location: this.state.location
          }).then((doc) => {
            this.handleClose();
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
            Edit Event
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
          <Input placeholder="Event Title..." type="text" value={this.state.title} onChange={({ target }) => this.setState({ title: target.value })} />

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
              value={this.state.location}
              onChange={({ target }) => this.setState({ location: target.value })}
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
                  initialValue={new Date(this.state.selectedDate)}
                  onChange={e =>
                    this.setState({ selectedDate: e.toDate() })
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
                  initialValue={new Date(this.state.selectedTime)}

                  onChange={e =>
                    this.setState({ selectedTime: e.toDate() })
                  }
                />
              </InputGroup>
            </Col>
          </Row>

          <Label for="exampleText">Event Description</Label>
          <InputGroup>
            <Input type="textarea" name="text" id="exampleText" value={this.state.description} onChange={({ target }) => this.setState({ description: target.value })} />
          </InputGroup>

        </div>
        <div className="modal-footer">
          <Button color="primary" type="button" onClick={() => this.handleUpdatePost()} disabled={this.formDisabled()}>
            Update Event
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

export default EditPost;
