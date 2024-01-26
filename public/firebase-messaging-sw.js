importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyDlfWBqi107dSxmOaTBD5ZqcSm96A35I-o",
  authDomain: "absensi-starcon.firebaseapp.com",
  projectId: "absensi-starcon",
  storageBucket: "absensi-starcon.appspot.com",
  messagingSenderId: "945872606545",
  appId: "1:945872606545:web:c3701225a37d4782f8ef70"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});