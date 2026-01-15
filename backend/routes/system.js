const express = require('express');
const router = express.Router();

// System Profile Data
const systemData = {
  user: {
    name: 'Mikkilineni Sasi Nikhil',
    email: 'sasi.nikhil@sjsu.edu',
    phone: '+1 (408) XXX-XXXX',
    location: 'San Jose, California',
    university: 'San Jose State University (SJSU)',
    major: 'Software Engineering',
    graduationDate: 'May 2026',
  },
  skills: {
    languages: ['Java', 'JavaScript', 'Python', 'HTML/CSS', 'SQL', 'Solidity'],
    frontend: ['React', 'React Hooks', 'Redux', 'React Router', 'CSS3', 'Responsive Design'],
    backend: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Authentication'],
    databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'DynamoDB'],
    devops: ['Docker', 'Kubernetes', 'AWS (EC2, S3, Lambda)', 'CI/CD', 'Git/GitHub'],
    tools: ['VS Code', 'IntelliJ IDEA', 'Postman', 'GitHub', 'Figma', 'Jira'],
  },
  projects: [
    {
      id: 1,
      name: 'Cyber Threat Detection System',
      description:
        'An intelligent ML model that identifies and classifies cybersecurity threats in real-time using behavioral analysis and pattern recognition. Deployed on AWS infrastructure with automated incident response.',
      technologies: ['Python', 'TensorFlow', 'AWS', 'Machine Learning'],
      keyFeatures: [
        'Real-time threat detection',
        'Behavioral analysis',
        'Automated alerts',
        'Cloud-deployed',
      ],
    },
    {
      id: 2,
      name: 'Crop Yield Forecast',
      description:
        'A predictive analytics platform using historical weather, soil, and agricultural data to forecast crop yields. Helps farmers optimize strategies and resource allocation.',
      technologies: ['Python', 'Machine Learning', 'MongoDB', 'React'],
      keyFeatures: [
        'Yield prediction algorithms',
        'Weather integration',
        'Soil analysis',
        'Harvest optimization',
      ],
    },
  ],
  experience: [
    {
      id: 1,
      company: 'Araneus',
      position: 'Blockchain UI Developer',
      duration: 'Jan 2024 - May 2025',
      description:
        'Developed and maintained user interfaces for blockchain applications. Collaborated with engineers to create intuitive dashboards for transaction monitoring and wallet management.',
      achievements: [
        'Built responsive React components for Web3 wallet integration',
        'Implemented real-time blockchain data visualization',
        'Optimized UI performance for high-frequency updates',
        'Mentored junior developers on blockchain fundamentals',
      ],
      technologies: ['React', 'Web3.js', 'Blockchain', 'JavaScript', 'CSS'],
    },
    {
      id: 2,
      company: 'Ethnus',
      position: 'MERN Stack Intern',
      duration: 'Jun 2023 - Dec 2023',
      description:
        'Contributed to multiple client projects including e-commerce platforms and data management systems using the MERN stack.',
      achievements: [
        'Developed REST APIs using Node.js and Express',
        'Created MongoDB schemas and database optimization',
        'Built React frontend components with Redux state management',
        'Participated in code reviews and agile cycles',
        'Deployed applications using Docker and AWS services',
      ],
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'AWS', 'Docker'],
    },
  ],
  social: {
    github: 'https://github.com/sasi-nikhil',
    linkedin: 'https://linkedin.com/in/sasi-nikhil',
    email: 'sasi.nikhil@sjsu.edu',
    portfolio: 'https://sasi-nikhil.com',
  },
};

// GET system profile
router.get('/', (req, res) => {
  res.json({
    status: 'System Online',
    data: systemData,
  });
});

// GET specific system info
router.get('/user', (req, res) => {
  res.json(systemData.user);
});

router.get('/skills', (req, res) => {
  res.json(systemData.skills);
});

router.get('/projects', (req, res) => {
  res.json(systemData.projects);
});

router.get('/experience', (req, res) => {
  res.json(systemData.experience);
});

router.get('/social', (req, res) => {
  res.json(systemData.social);
});

module.exports = router;
