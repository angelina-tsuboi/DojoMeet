
import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import fire from '../../config/fire-conf';
import { useFirestore } from '../../firebase/useFirestore';
import RoomIcon from '@material-ui/icons/Room';
import SubjectIcon from '@material-ui/icons/Subject';
import styles from './EditPost.module.css';
const firestore = useFirestore(); 

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

const EditPost = ({post, open, onClose})  => {
    const { currentUser } = fire.auth();
    const [selectedDate, setSelectedDate] = React.useState(post.date.toDate());
    const [selectedTime, setSelectedTime] = React.useState(post.time.toDate());

    const [title, setTitle] = React.useState(post.title);
    const [description, setDescription] = React.useState(post.description);
    const [location, setLocation] = React.useState(post.location);
    const handleClose = () => {
        onClose();
    };

    const updatePost = () => {
      let postData = {description: description, location: location, date: selectedDate, time: selectedTime, title: title};
      firestore.updateDocument(`posts/${post.id}`, postData, (result) => {
        onClose();
      })
    }

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
  
    const handleTimeChange = (time) => {
      setSelectedTime(time);
    };
    
    
      return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <div className={styles.Dialog}>
        <DialogTitle id="simple-dialog-title">Update Event</DialogTitle>
        <TextField id="standard-basic" label="Event Title" value={title} onChange= {({target}) => setTitle(target.value)}  />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-between">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Select Time"
          value={selectedTime}
          onChange={handleTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
    <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <RoomIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Enter location" value={location} onChange= {({target}) => setLocation(target.value)} />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SubjectIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Enter description..." value={description} onChange= {({target}) => setDescription(target.value)} />
          </Grid>
        </Grid>

        <div className={styles.bottomButtons}>
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button variant="contained" className={styles.createEvent} onClick={() => { updatePost() }} >
            Update Event
            </Button>
        </div>
        </div>
      </Dialog>
      );
}

  export default EditPost;
  