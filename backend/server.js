const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sequelize, User, Message } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "your-secret-key";

// Registration route
app.post("/auth/register", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      firstName, 
      lastName, 
      username, 
      password: hashedPassword 
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Error registering user", details: error.message });
  }
});

// Login route
app.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY);
    res.json({ token, firstName: user.firstName });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Send a message
app.post("/messages", authenticateToken, async (req, res) => {
  try {
    const { content, recipient } = req.body;
    const sender = req.user.id;
    const message = await Message.create({ 
      content, 
      senderId: sender, 
      recipientId: recipient,
      isAnonymous: true // You can make this configurable if needed
    });
    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message", details: error.message });
  }
});

// Get messages for a user
app.get("/messages", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const messages = await Message.findAll({
      where: { recipientId: userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'Sender',
          attributes: ['username'],
        },
      ],
    });

    const formattedMessages = messages.map(message => ({
      id: message.id,
      content: message.content,
      sender: message.isAnonymous ? 'Anonymous' : message.Sender.username,
      createdAt: message.createdAt,
    }));

    res.json(formattedMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages", details: error.message });
  }
});

// Sync database and start server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log("Server running on port 3000"));
}).catch(err => {
  console.error('Failed to sync database:', err);
});
