const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET all messages (System Log)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({
      status: 'success',
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST new message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required',
      });
    }

    const newMessage = new Message({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    await newMessage.save();

    res.status(201).json({
      status: 'success',
      message: 'Message received successfully',
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

// GET single message
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ status: 'error', message: 'Message not found' });
    }
    res.json({
      status: 'success',
      data: message,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// DELETE message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ status: 'error', message: 'Message not found' });
    }
    res.json({
      status: 'success',
      message: 'Message deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
