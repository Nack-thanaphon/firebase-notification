const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

// admin.messaging().send(message);
// Replace with the path to your service account key file
const serviceAccount = {
  type: "service_account",
  project_id: "realtime-iot-58104",
  private_key_id: "353b5b29f3779fb3f0b355571b5db6c49113f2d1",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDKxiEVzmRkN5U8\nQgDYzk6mP/rSJm3gD+cv/xR9nVA9XETVBHT9cZ+3Zad4VhmrYBNNFMtCKVS+gXNz\njWTqJQwRwX8Pj3QoIUr1Rc+qM7EQZWFJPeOZeZFaRN1KeZiVBQinF/16uAQLNEps\nUjJu+RTiqZ6yKKVeWV1acM4FDPsUYMLddAIhb41wiGTgK67ZIOTwOkhblkCMEv33\nfZduqu0/kkkHZgDMNTyKVteLsqL1e+EfqPjkPdHvoqVjcK0eEBIBK6rF1fWKsLJg\n/ADHKr+oZ1YTR1NFE2zNCmv7f9zVXrgFpfF+ZT0DE0B2Cc4zx0wXkaX3vBGP1F/H\nYW8CksZvAgMBAAECggEAGjZyoHcF0068JAYERgKleChdLD17hrOHl1TKOVLUxJng\n7AifdwPxOawSciPvPZA17oj5nZvqMJZbblyg5wPTA5iX7FMHGQj0v7A+oCn+gbgZ\nU3aErZphh+HPGYmOh/UWoUMgqXSQUUJ5PHeDvYTFhmeW9ED83619u+tJNq3u5ztA\nDE4LeNXwu91FnS0oV5s/g+FnEsrL5xWvRz3TfI6nLjYTL6bOS1CHSzuQ6FP5I1xv\no3YBmrKmLI0eQwuShv2wzj1fYjNv4mwjmcFs7aNpMa0FuOZ1V4QwhANaJlQkZc2B\nTEd/l5ct7k3xLAlNnxXTbQkays+FOWdF+vC8UEW4gQKBgQDmxiktDrOOx2l429OU\nAq3kC4XemaYsnptzXs90yH7WQM6J8h6Ulx4LQz0Ks1RcdDGqFcH+WgWQ5T+yPuC5\nl6cScQv8J7us/vF/0ymrCkZ6NIdnP6mh3IaEGMST8dao7il1Cl+ew0W6MfGKOTQc\noNwyFQ0uimertsN/Yc5w4TLICQKBgQDg8G4h+sJ5aKMbkLW7cvyUI0l508UWh6XD\nQYAfbzuwl94Nt2y2W1IY/Yay3JJyR5aDbktjbsZejoR3Xkg6hLYeYvlRUd7AwQyc\n+2snHF4kbDFqqLO+hf8CFJv1PLgbq67h/asCvk2EGgT1/x3sTetEeBtQ31wh5Eqr\noZBbKzmItwKBgEMHDVCb84Ul4DmNR7+2o4EX47MK15wgGTCCOilGTqi2PAcO/tjT\np5NH3UPtYDRWP1KSbT0OMo2qODzyTF07cfhGQ1/ivnz5s3UYBQM7wcqe1TEk6YUs\nwxk9BGOgG2QHgJ0Q/ULknqz88pXeFYe3JR2axbBd3MygEdo+szJQBmrZAoGBANKm\nlpzftsv3//fKl0ZKMtuQCDk85u9obQXkC1Zk1uNT9bGmuvoznzikBEbwZXz8Kao/\n2f3uOXtHwCoBc2bJ7bubOJy9LPwaTfOdSAXCfS9i2wxlnJ6p4dxS7JLHICtZplch\nNctF6FXz//1XwvAPMGpYiEw+QIvEvWDp1sRqQGEVAoGAQqUvv1cbjJgb+S15PKRk\nAZHOJ8AvZN7kqGs7JTTVGkNxGDP/tc/s4YKmq4yy4ZG/29Gs/nHRCBFyVn/Rg9qd\nrG3eVGtiitrgtFFB5dgI6MOpzV7oZvVotUPCqbNjxKMHU05CFVRTNWNzQ/LqVNVd\nF0d3GXf47JeEr1g9TSZ5zK8=\n-----END PRIVATE KEY-----\n",
  client_email: "realtime-iot-58104@appspot.gserviceaccount.com",
  client_id: "115349960105863131711",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/realtime-iot-58104%40appspot.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://realtime-iot-58104-default-rtdb.firebaseio.com",
});

const corsOptions = {
  origin: 'https://inspiring-alfajores-b58385.netlify.app',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/sendNotification", (req, res) => {
  const message = {
    notification: {
      title: req.body.title,
      body: req.body.body,
    },
    token: req.body.token,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      return res.status(200).json({
        message: "Successfully sent message",
        token: req.body.token,
      });
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      res.status(400).send(error);
    });
});

app.listen(3000, () => console.log("Server started on port 3000"));
