const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const protectRoute = require("./middleware/protectRoute");
const fs = require("fs");

const secretKey = "computer12345";

const app = express();
app.use(express.json());
app.use(cors());

const userData = "user.json";
let users = [];

app.post("/register", (req, res) => {
  try {
    const user = req.body;
    const { username, password } = user;

    if (!username || !password) {
      throw new Error("Please enter a username and password");
    }

    
    //updated
    
    if (fs.existsSync(userData)) {
      const fileData = fs.readFileSync(userData, "utf-8");
      users = JSON.parse(fileData);
    }


    const alreadyExists = users.find((value) => value.username === username);
    if (alreadyExists) {
      throw new Error("This user already exists");
    }

    users.push(user);

    fs.writeFile(userData, JSON.stringify(users), (err) => {
      if (err) {
        throw new Error("Error writing to file");
      }


    
      res.status(201).json({
        message: "User created successfully",
        success: true,
        error: false,
        User: user,
      });
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
    const user = req.body;

    if (fs.existsSync(userData)) {
      const fileData = fs.readFileSync(userData, "utf-8");
      users = JSON.parse(fileData);
    }

    const alreadyFind = users.find(
      (value) =>
        value.username === user.username && value.password === user.password
    );
    if (!alreadyFind) {
      throw new Error("Pls first register");
    }

    const token = jwt.sign({ user }, secretKey, { expiresIn: "1h" });

    res.status(200).json({
      token: token,
      success: true,
      error: false,
      message: "user logged in successfully",
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
  if(fs.existsSync(userData)){
    const fileData= fs.readFileSync(userData, "utf-8")
    const user=(JSON.parse(fileData))
    res.send(user);
  }
 
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
