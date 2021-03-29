import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCq0YIZyrNPtv2WfK0zd9YR6IuPmoUwWEA",
    authDomain: "dojomeet.firebaseapp.com",
    projectId: "dojomeet",
    storageBucket: "dojomeet.appspot.com",
    messagingSenderId: "943494403162",
    appId: "1:943494403162:web:b405510c5ffc766e463463"
};
try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;
