
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
    if(this.state.title == "" || this.state.location == ""){
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
    console.log(this.state.selectedDate.toDate())
  }

  render() {
    return (
      //     <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      //       <div className={styles.Dialog}>
      //     <DialogTitle id="simple-dialog-title">Update Event</DialogTitle>
      //     <TextField id="standard-basic" label="Event Title" value={title} onChange= {({target}) => setTitle(target.value)}  />
      //     <MuiPickersUtilsProvider utils={DateFnsUtils}>
      //   <Grid container justify="space-between">
      //     <KeyboardDatePicker
      //       disableToolbar
      //       variant="inline"
      //       format="MM/dd/yyyy"
      //       margin="normal"
      //       id="date-picker-inline"
      //       label="Select Date"
      //       value={selectedDate}
      //       onChange={handleDateChange}
      //       KeyboardButtonProps={{
      //         'aria-label': 'change date',
      //       }}
      //     />
      //     <KeyboardTimePicker
      //       margin="normal"
      //       id="time-picker"
      //       label="Select Time"
      //       value={selectedTime}
      //       onChange={handleTimeChange}
      //       KeyboardButtonProps={{
      //         'aria-label': 'change time',
      //       }}
      //     />
      //   </Grid>
      // </MuiPickersUtilsProvider>
      // <Grid container spacing={1} alignItems="flex-end">
      //       <Grid item>
      //         <RoomIcon />
      //       </Grid>
      //       <Grid item>
      //         <TextField id="input-with-icon-grid" label="Enter location" value={location} onChange= {({target}) => setLocation(target.value)} />
      //       </Grid>
      //     </Grid>
      //     <Grid container spacing={1} alignItems="flex-end">
      //       <Grid item>
      //         <SubjectIcon />
      //       </Grid>
      //       <Grid item>
      //         <TextField id="input-with-icon-grid" label="Enter description..." value={description} onChange= {({target}) => setDescription(target.value)} />
      //       </Grid>
      //     </Grid>

      //     <div className={styles.bottomButtons}>
      //         <Button onClick={() => handleClose()}>Cancel</Button>
      //         <Button variant="contained" className={styles.createEvent} onClick={() => { updatePost() }} >
      //         Update Event
      //         </Button>
      //     </div>
      //     </div>
      //   </Dialog>
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
