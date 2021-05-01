import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: 'AIzaSyDMXUGuBqaik5XPQs4T9czOeUjfAlEsnQw',
    authDomain: 'react-chat-app-proj.firebaseapp.com',
    projectId: 'react-chat-app-proj',
    storageBucket: 'react-chat-app-proj.appspot.com',
    messagingSenderId: '78056945882',
    appId: '1:78056945882:web:a85549706ec14972584de3',
    measurementId: 'G-H9LVS7BTTM',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export default firebase;
