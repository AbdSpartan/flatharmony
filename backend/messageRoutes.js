const express = require('express');
const router = express.Router();
const { User, Message } = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Send a message
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const { recipientUsername, content, isAnonymous } = req.body;
    const sender = req.user;
    const recipient = await User.findOne({ where: { username: recipientUsername } });

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const message = await Message.create({
      content,
      isAnonymous,
      senderId: sender.id,
      recipientId: recipient.id,
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get user's inbox
router.get('/inbox', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const messages = await Message.findAll({
      where: { recipientId: user.id },
      include: [
        {
          model: User,
          as: 'Sender',
          attributes: ['username'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const formattedMessages = messages.map(message => ({
      id: message.id,
      content: message.content,
      sender: message.isAnonymous ? 'Anonymous' : message.Sender.username,
      createdAt: message.createdAt,
    }));

    res.json(formattedMessages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inbox' });
  }
});

module.exports = router;