import firebase from 'firebase';

// Initialize Firebase
if (firebase.apps.length === 0) {
  var config = {
    apiKey: "AIzaSyAIf-_a1OQrmblm06l5sN-Rxaxo_HjiXD0",
    authDomain: "like--project.firebaseapp.com",
    databaseURL: "https://like--project.firebaseio.com",
    projectId: "like-youtube-project",
    storageBucket: "like-youtube-project.appspot.com",
    messagingSenderId: "1025349820634"
  };
  firebase.initializeApp(config);
}