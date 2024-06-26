
const express = require("express");
const cors = require("cors");
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
     const r =await axios.put(
        "https://api.chatengine.io/users/",
        {
            username: username,
            secret: username,
            first_name: username,
            
        },
        {
        headers:{"private-key":"d220a5df-a48a-41c4-9932-6efed43009df"}
        }
    );
    return res.status(r.status).json(r.data);
  }catch(e){

  }
  
  return res.json({ username: username, secret: "sha256..." });
});

app.listen(3000);