const express = require('express');
const app = express();
const crypto = require("crypto")
const dotenv = require('dotenv')
dotenv.config()

app.use(express.urlencoded())
app.use(express.json())

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let user = [];

app.post("/api/user", (req, res) => {
  const { name, time } = req.body;
  if (!name || !time) {
    res.send("Add name and time")
  } else {
    user.push({ name, time, id: crypto.randomUUID() })
    res.send("Added")
  }
})

app.get("/api/user", (req, res) => {
  res.send(user)
})

app.delete("/api/user/:id", (req, res) => {
  console.log(req.params)
  const { id } = req.params
  const Todo = user.filter((ele) => ele.id !== id)
  user = Todo
  res.send("User Deleted...")
})

app.put("/api/user/:id", (req, res) => {
  const { id } = req.query;
  const { name, time } = req.body;
  const index = user.findIndex(ele => ele.id == id);
  if (index != -1) {
    user[index] = { name, time, id }
  }
  res.send("updated")
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
}); 
