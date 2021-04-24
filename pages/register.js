import { useState } from 'react'; 
import fire from '../config/fire-conf';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import styles from '../styles/SignUp.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Select belt color', 'Select your location', 'Create an account'];
}

const RegisterForm = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== passConf) {
      setPassword('');
      setPassConf('');
      return null;
      }
    fire.auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message)
      });
    router.push("/")
  }


  const handleGoogleSignUp = async() =>{
    const provider = new fire.auth.GoogleAuthProvider();
    const creds = await fire.auth().signInWithPopup(provider);
    let user = creds.user;
    const userRef = fire.firestore().doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      name: user.displayName
    }

    userRef.get().then((doc) => {
      if(!doc.exists){
        userRef.set(data, {merge: true});
      }
    })

    router.push("/");
  }

  return (
      <div>
        <h1>Create new user</h1>
      <form onSubmit={handleLogin}>
        <h3>Email:</h3>
       <input type="text" value={userName} 
        onChange={({target}) => setUsername(target.value)} /> 
        <br />
        <h3>Password:</h3>
        <input type="password" value={password} 
        onChange={({target}) => setPassword(target.value)} /> 
        <br />
        <h3>Confirm Password:</h3>
        <input type="password" value={passConf}    
        onChange={({target}) => setPassConf(target.value)} /> 
        <br />
        <button type="submit">Login</button>
      </form>
      <h3>OR</h3>
      <Button variant="contained" color="primary" onClick={handleGoogleSignUp}>
      Register with Google
    </Button></div>
  )
}

function getStepContent(step) {
  const classes = useStyles();
  switch (step) {
    case 0:
      return (
        <Typography className={classes.instructions}>Select Belt Color</Typography>
      );
    case 1:
      return (<Typography className={classes.instructions}>Select Location</Typography>);
    case 2:
      return <RegisterForm />
    default:
      return 'Unknown step';
  }
}

const Register = () => {
  const router = useRouter();
  const classes = useStyles();

  // Steps Code
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  return (
    <div className={styles.container}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Register;