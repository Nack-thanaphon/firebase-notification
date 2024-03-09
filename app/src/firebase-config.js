// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyBxJ4w-vcidkU6OqEX6VJLNQKGLvK462KU",
  authDomain: "realtime-iot-58104.firebaseapp.com",
  databaseURL: "https://realtime-iot-58104-default-rtdb.firebaseio.com",
  projectId: "realtime-iot-58104",
  storageBucket: "realtime-iot-58104.appspot.com",
  messagingSenderId: "59229299074",
  appId: "1:592292999074:web:5750081687b013375a4cfb",
  measurementId: "G-YH9ZQRPE7W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BL_A096ju8rsLJXL---jejggsfQjKhsGC8Jy8xLx2YD0_lVkAFyitsjmUTmwIROfIj-p1Kwy9uCz8vtdB1YGhgM",
    });
    localStorage.setItem("fcmToken", token);
  }
};

export const sendNotification = async (title, body) => {
  const token = localStorage.getItem("fcmToken"); // Retrieve stored token
  const topic = "news"; // Replace with topic if using topics (optional)

  try {
    const response = await axios.post(
      "http://localhost:3000/sendNotification",
      {
        token,
        title,
        body,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // Show a notification
  if (!("Notification" in window)) {
    console.log("This browser does not support system notifications");
  } else if (Notification.permission === "granted") {
    new Notification(payload.notification.title, {
      body: payload.notification.body,
    });
  }
});