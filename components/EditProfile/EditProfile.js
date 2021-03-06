import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import fire from '../../config/fire-conf';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import styles from './EditProfile.module.css'
import { useEffect } from 'react';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SubjectIcon from '@material-ui/icons/Subject';
import RoomIcon from '@material-ui/icons/Room';

const EditProfile = (props)  => {
    const router = useRouter()
    // const classes = useStyles();
    const { onClose, selectedValue, open, profile } = props;
    const [name, setName] = React.useState(profile.name);
    const [description, setDescription] = React.useState(profile.description);
    const [uid, setUID] = React.useState(profile.uid);
    const [location, setLocation] = React.useState(profile.location);
    const [photoURL, setPhotoURL] = React.useState(profile.photoURL);


    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleUpdateProfile = () => {
        let completeProfile = {
            name: name,
            description: description,
            location: location,
            photoURL: photoURL
        };

        fire.firestore()
        .doc(`users/${uid}`)
        .update(completeProfile).then(() => {
            onClose(selectedValue);
        }).catch((err) => {
            console.log("Found an error", err);
        }) 
      }
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={styles.modal}>
          <div className={styles.Dialog}>
        <DialogTitle id="simple-dialog-title">Update Profile</DialogTitle>
        <TextField id="standard-basic" label="Name" value={name} onChange= {({target}) => setName(target.value)}  />
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
            <Button variant="contained" className={styles.createEvent} onClick={() => { handleUpdateProfile() }} >
            Update Profile
            </Button>
        </div>
        </div>
      </Dialog>
    );
  }

  export default EditProfile;
  