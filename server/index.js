const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const protectRoute = require("./middleware/protectRoute");
const fs = require("fs");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const userData = "user.json";
let users = [];

const readData = () => {
  if (fs.existsSync(userData)) {
    const data = fs.readFileSync(userData, "utf8");
    users = JSON.parse(data);
  }
};
readData();




const writeData = (user) => {
  fs.readFile(userData, "utf8", (err, result) => {
    if (err) {
      console.log("Failed");
    }

    if (result) {
      users = JSON.parse(result);
    }

    users.push(user);
    fs.writeFile(userData, JSON.stringify(users), (err, result) => {});
  });
};



  
app.post("/register", (req, res) => {
  try {
    const user = req.body;
    const { username, password } = user;

    if (!username || !password) {
      throw new Error("Please enter a username and password");
    }

    const alreadyExists = users.find((value) => value.username === username);
    if (alreadyExists) {
      throw new Error("This user already exists");
    }

    writeData(user);

    res.status(201).json({
      message: "User created successfully",
      success: true,
      error: false,
      User: user,
    });


  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
});



app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(
      (value) => value.username === username && value.password === password
    );
    if (!user) {
      throw new Error("Please register first");
    }

    const token = jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token: token,
      success: true,
      error: false,
      message: "User logged in successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
});


app.get("/", protectRoute, (req, res) => {
  res.send(users);
});




app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
