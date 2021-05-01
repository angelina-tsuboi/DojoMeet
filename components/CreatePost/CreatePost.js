import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import fire from '../../config/fire-conf';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import styles from './CreatePost.module.css'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { useRouter } from 'next/router';
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
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col
} from "reactstrap";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

class CreatePost extends React.Component{
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
    if (fire.auth().currentUser) {
      fire.firestore().doc(`users/${currentUser.uid}`).get().then((docData) => {
        let userData = { email: docData.data().email, uid: uid, photoURL: docData.data().photoURL, name: docData.data().name };
        fire.firestore()
          .collection('posts')
          .add({
            title: title,
            description: description,
            date: selectedDate,
            time: selectedTime,
            location: location,
            likesMembers: [],
            ...userData
          }).then((doc) => {
            fire.firestore().collection("posts").doc(doc.id).collection("joining").add(userData).then(() => {
              onClose(selectedValue);
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
        router.push("/")
      })
    }
  }

  render() {
    return (
      //   <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      //       <div className={styles.Dialog}>
      //     <DialogTitle id="simple-dialog-title">Create Event</DialogTitle>
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
      //         <Button variant="contained" className={styles.createEvent} onClick={() => { handleCreatePost() }} >
      //         Create Event
      //         </Button>
      //     </div>
      //     </div>
      //   </Dialog>
      

      // title: title,
      // description: description,
      // date: selectedDate,
      // time: selectedTime,
      // location: location,


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
          <p>
            Far far away, behind the word mountains, far from the
            countries Vokalia and Consonantia, there live the blind texts.
            Separated they live in Bookmarksgrove right at the coast of
            the Semantics, a large language ocean.
      </p>
          <p>
            A small river named Duden flows by their place and supplies it
            with the necessary regelialia. It is a paradisematic country,
            in which roasted parts of sentences fly into your mouth.
      </p>
        </div>
        <div className="modal-footer">
          <Button color="primary" type="button">
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
