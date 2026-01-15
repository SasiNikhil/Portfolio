const mongoose = require('mongoose');

const systemSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
    phone: String,
    location: String,
    university: String,
    major: String,
    graduationDate: String,
  },
  skills: {
    languages: [String],
    frontend: [String],
    backend: [String],
    databases: [String],
    devops: [String],
    tools: [String],
  },
  projects: [
    {
      name: String,
      description: String,
      technologies: [String],
      keyFeatures: [String],
    },
  ],
  experience: [
    {
      company: String,
      position: String,
      duration: String,
      description: String,
      achievements: [String],
      technologies: [String],
    },
  ],
  social: {
    github: String,
    linkedin: String,
    twitter: String,
    portfolio: String,
  },
});

module.exports = mongoose.model('System', systemSchema);
