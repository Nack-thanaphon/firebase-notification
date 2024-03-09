import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { sendNotification ,generateToken} from "./firebase-config";
import { Box, TextField } from "@mui/material";

const NotificationButton = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDetailChange = (event) => {
    setDetail(event.target.value);
  };

  const handleClick = () => {
    sendNotification(title, detail);
  };

  return (
    <>
      <Box marginBottom={5}>
        <Box marginBottom={1}>
          <TextField
            sx={{
              color: "#fefefefe !important",
              width: "100%",
            }}
            label="หัวข้อข้อความแจ้งเตือน"
            value={title}
            onChange={handleTitleChange}
          />
        </Box>

        <Box marginBottom={1}>
          <TextField
            label="กรอกข้อความแจ้งเตือน"
            sx={{
              color: "#fefefefe !important",
              width: "100%",
            }}
            value={detail}
            onChange={handleDetailChange}
          />
        </Box>
      </Box>

      <button
        style={{
          padding: "10px",
        }}
        onClick={handleClick}
      >
        กดเพื่อทดสอบ Push Notification
      </button>
      <button
        style={{
          padding: "10px",
        }}
        onClick={generateToken}
      >
        GetToken
      </button>
    </>
  );
};

export default NotificationButton;
