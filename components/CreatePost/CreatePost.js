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
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SubjectIcon from '@material-ui/icons/Subject';
import RoomIcon from '@material-ui/icons/Room';
import { withStyles } from '@material-ui/core/styles';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

const CreatePost = (props)  => {
    const router = useRouter()
    // const classes = useStyles();
    const { onClose, selectedValue, open, uid } = props;
    const { currentUser } = fire.auth();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedTime, setSelectedTime] = React.useState(new Date());

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [location, setLocation] = React.useState('');


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  

    const handleCreatePost = () => {
        fire.firestore()
        .collection('posts')
        .add({
            title: title,
            description: description,
            date: selectedDate,
            time: selectedTime, 
            location: location,
            uid: uid
        }).then(() => {
            onClose(selectedValue);
        }).catch((err) => {
            console.log("Found an error", err);
        })
        setTitle('')
        setDescription('')
        setLocation('')
        setSelectedDate(new Date())
        setSelectedTime(new Date())
        router.push("/")
      }
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <div className={styles.Dialog}>
        <DialogTitle id="simple-dialog-title">Create Event</DialogTitle>
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
            <Button variant="contained" className={styles.createEvent} onClick={() => { handleCreatePost() }} >
            Create Event
            </Button>
        </div>
        </div>
      </Dialog>
    );
  }

  export default CreatePost;
  