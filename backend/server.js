const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));

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
  const indexPath = path.join(__dirname, '../frontend/build/index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('❌ Build not found at:', indexPath);
      res.status(500).json({ error: 'Frontend build not found', buildPath: indexPath });
    }
  });
});

// Fallback for all unmatched routes
app.use((req, res) => {
  const indexPath = path.join(__dirname, '../frontend/build/index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(500).json({ error: 'Frontend build not found' });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 System ready at http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from: ${path.join(__dirname, '../frontend/build')}`);
});

module.exports = app;
