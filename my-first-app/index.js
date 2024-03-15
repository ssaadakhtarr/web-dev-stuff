const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");


// TODO
// setting jwt in headers. this would be done on front end so pending it for now.


const app = express();
app.use(express.json());
app.use(cookieParser());

app.locals.users = { saad: "hello123", test2: "$2b$10$h11JgQib6WjEdxCUF.Yuues8P5psHiaOgnUhCRH7qUYbPmEgNqYfK" };

function verifyToken(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "Access Denied!" });
  }

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized - Invalid token" });
    }

    req.user = user;
    next();
  });
}

async function authenticateUser(username, password) {
  const { users } = app.locals;
  console.log(users);
  console.log(users[username])
  if (username in users) {
    passwordMatch = await bcrypt.compare(password, users[username]);
    console.log(passwordMatch);
    if (!passwordMatch) {
      console.log('here')
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
  // if (users[username] && password === users[username]) {
  //   return true;
  // } else {
  //   return false;
  // }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  res.send("This is the login page!");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const isAuthenticated = await authenticateUser(username, password);
    
    if (isAuthenticated) {
      const token = jwt.sign({ username: username }, "secret_key", { expiresIn: "1h" });
      res.cookie("jwt", token);
      res.redirect('/dashboard');
    } else {
      res.status(401).json({ error: "Invalid Credentials!" });
    }
  } catch (error) {
    console.error("Error during user authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/register", (req, res) => {
  res.send("This is the signup page!");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const { users } = app.locals;
  if (username in users) {
    res.status(409).send("User already exists!");
  } else {
    const hashed_password = await bcrypt.hash(password, 10);
    console.log(hashed_password);
    users[username] = hashed_password;
    console.log(users);
    res.send("Registration Successful!");
  }
});

app.get("/dashboard", verifyToken, (req, res) => {
  res.status(200).json({ message: "Dashboard accessed successfully!" });
});

app.listen(3000, () => {
  console.log("App is running on port 3000!");
});
