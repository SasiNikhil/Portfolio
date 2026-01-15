const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-os';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✓ MongoDB Connected'))
  .catch((err) => console.error('✗ MongoDB Connection Error:', err));

// Routes
app.use('/api/system', require('./routes/system'));
app.use('/api/messages', require('./routes/messages'));

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'System Online',
    timestamp: new Date(),
    message: 'Backend kernel running successfully',
  });
});

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Sasi Nikhil\'s Portfolio OS Backend',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      system: '/api/system',
      messages: '/api/messages',
    },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 System ready at http://localhost:${PORT}`);
});

module.exports = app;
