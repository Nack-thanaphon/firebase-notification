import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { pink, indigo, blue } from "@mui/material/colors";

function BoxStatus() {
  return (
    <>
      {/* <Box
        display={{ sm: "", lg: "grid" }}
        gap={5}
        gridTemplateColumns={"repeat(3,1fr)"}
        marginTop={4}
      >
        <Box
          padding={1}
          boxShadow={2}
          paddingY={2}
          marginBottom={2}
          bgcolor={pink[300]}
        >
          <Typography variant="h6" color="white" textAlign={"start"}>
            ส่งไม่สำเร็จ
          </Typography>
          <Typography variant="h3" color="white">
            70
          </Typography>
        </Box>
        <Box
          padding={1}
          boxShadow={2}
          paddingY={2}
          marginBottom={2}
          bgcolor={indigo[900]}
        >
          <Typography variant="h6" color="white" textAlign={"start"}>
            ส่งสำเร็จ
          </Typography>
          <Typography variant="h3" color="white">
            70
          </Typography>
        </Box>
        <Box
          padding={3}
          boxShadow={2}
          paddingY={2}
          marginBottom={2}
          bgcolor={blue[900]}
        >
          <Typography variant="h6" color="white" textAlign={"start"}>
            ค้างส่ง
          </Typography>
          <Typography variant="h3" color="white">
            70
          </Typography>
        </Box>
      </Box> */}
      <Box border={1} marginTop={3}>
        <Typography variant="h4" color="initial">
          วิธีการทดสอบ
        </Typography>
        <Typography variant="h6" color="initial">
          
          เปิด webbrowser: 
          ทดสอบโดยการกดปุ่มส่งข้อมูล
        </Typography>
      </Box>
    </>
  );
}

export default BoxStatus;
