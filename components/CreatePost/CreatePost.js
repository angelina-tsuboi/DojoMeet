import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import styles from './CreatePost.module.css'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
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
    // const classes = useStyles();
    const { onClose, selectedValue, open } = props;
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <div className={styles.Dialog}>
        <DialogTitle id="simple-dialog-title">Create Post</DialogTitle>
        <TextField id="standard-basic" label="Post Title" />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
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
          value={selectedDate}
          onChange={handleDateChange}
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
            <TextField id="input-with-icon-grid" label="Enter location" />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SubjectIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Enter description..." />
          </Grid>
        </Grid>
        </div>
      </Dialog>
    );
  }

  export default CreatePost;
  