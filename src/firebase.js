const firebase = require('firebase');

const config = {
  apiKey: 'AIzaSyCTgOM-qLMUZtqdvODoJrrP8EIlP6VCZ1Q',
  authDomain: 'kit-workshop.firebaseapp.com',
  databaseURL: 'https://kit-workshop.firebaseio.com',
  projectId: 'kit-workshop',
  storageBucket: 'kit-workshop.appspot.com',
  messagingSenderId: '807690698720',
};

const fire = firebase.initializeApp(config);

module.exports = fire;
