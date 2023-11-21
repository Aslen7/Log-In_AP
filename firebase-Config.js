import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

export const firebaseConfig = {
    apiKey: "AIzaSyAi9cC_9VFI8n0KmYgMRQMvgO9h3lz-c3U",
    authDomain: "automatizacion-7d1cd.firebaseapp.com",
    projectId: "automatizacion-7d1cd",
    storageBucket: "automatizacion-7d1cd.appspot.com",
    messagingSenderId: "237372577856",
    appId: "1:237372577856:web:1ec0594146bf0b7aada7a5",
    measurementId: "G-15XHKQ6EZR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;