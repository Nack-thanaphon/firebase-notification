importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyxJ4w-vcidkU6OqEX6VJLNQKGLvK462KU",
  authDomain: "realtime-iot-58104.firebaseapp.com",
  databaseURL: "https://realtime-iot-58104-default-rtdb.firebaseio.com",
  projectId: "realtime-iot-58104",
  storageBucket: "realtime-iot-58104.appspot.com",
  messagingSenderId: "592292999074",
  appId: "1:592292999074:web:5750081687b013375a4cfb",
  measurementId: "G-YH9ZQRPE7W",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  // Extract custom data from the payload
  const customData = payload.data;

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    // Customize the notification with custom data
    data: {
      // Add custom properties from the custom data
      additionalText: customData.additionalText,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});



