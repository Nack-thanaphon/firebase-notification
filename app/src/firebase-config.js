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
  messagingSenderId: "592292999074",
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
  const topic = "news";

  try {
    const response = await axios.post(
      "http://localhost:3000/sendNotification",
      {
        topic, // Include the topic name here
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


    //   console.log(data.message, data.response || data.error);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

// Handle incoming messages (optional)
onMessage((payload) => {
  console.log("Message received. ", payload);
  // Optionally show a foreground notification
});
