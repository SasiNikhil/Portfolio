import React from 'react';

const ExperienceWindow = () => {
  const experiences = [
    {
      id: 1,
      company: 'Araneus',
      position: 'Blockchain UI Developer',
      duration: 'Jan 2024 - Present',
      description:
        'Developed and maintained user interfaces for blockchain applications, focusing on decentralized finance (DeFi) solutions. Collaborated with blockchain engineers to create intuitive dashboards for transaction monitoring and wallet management.',
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
        'Intern at full-stack web development company specializing in MERN stack applications. Contributed to multiple client projects including e-commerce platforms and data management systems.',
      achievements: [
        'Developed REST APIs using Node.js and Express',
        'Created MongoDB schemas and database optimization',
        'Built React frontend components with Redux state management',
        'Participated in code reviews and agile development cycles',
        'Deployed applications using Docker and AWS services',
      ],
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'AWS', 'Docker'],
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>PROFESSIONAL EXPERIENCE</h2>
        <p style={styles.subtitle}>Building solutions and expanding expertise</p>
      </div>

      {experiences.map((exp) => (
        <div key={exp.id} style={styles.experienceCard}>
          <div style={styles.companyHeader}>
            <div>
              <h3 style={styles.companyName}>{exp.company}</h3>
              <div style={styles.position}>{exp.position}</div>
            </div>
            <div style={styles.duration}>{exp.duration}</div>
          </div>

          <p style={styles.description}>{exp.description}</p>

          <div style={styles.section}>
            <label style={styles.sectionLabel}>ACHIEVEMENTS:</label>
            <ul style={styles.achievementsList}>
              {exp.achievements.map((achievement, idx) => (
                <li key={idx} style={styles.achievementItem}>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.section}>
            <label style={styles.sectionLabel}>TECHNOLOGIES USED:</label>
            <div style={styles.techStack}>
              {exp.technologies.map((tech, idx) => (
                <span key={idx} style={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div style={styles.footer}>
        <p style={styles.footerText}>Continuous learner | Problem solver | Team player</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '5px 0',
  },
  header: {
    marginBottom: '15px',
  },
  title: {
    color: '#000080',
      fontSize: '20px',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#000',
      fontSize: '14px',
    margin: 0,
  },
  experienceCard: {
    background: '#fff',
    border: '2px solid #808080',
    borderTopColor: '#000',
    borderLeftColor: '#000',
    borderRightColor: '#dfdfdf',
    borderBottomColor: '#dfdfdf',
    padding: '10px',
    marginBottom: '10px',
  },
  companyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '8px',
  },
  companyName: {
    color: '#000080',
      fontSize: '16px',
    margin: '0 0 8px 0',
    fontWeight: 'bold',
  },
  position: {
    color: '#000',
    fontSize: '14px',
    fontWeight: 'bold',
    margin: 0,
  },
  duration: {
    color: '#808080',
      fontSize: '12px',
    textAlign: 'right',
    fontStyle: 'italic',
  },
  description: {
    color: '#000',
    fontSize: '14px',
    lineHeight: '1.7',
    marginBottom: '12px',
    margin: '0 0 12px 0',
  },
  section: {
    marginBottom: '10px',
  },
  sectionLabel: {
    color: '#000080',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '10px',
  },
  achievementsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  achievementItem: {
    color: '#000',
      fontSize: '13px',
    marginBottom: '8px',
    paddingLeft: '20px',
    position: 'relative',
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
  },
  techTag: {
    background: '#c0c0c0',
    border: '1px solid #808080',
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderRightColor: '#000',
    borderBottomColor: '#000',
    padding: '4px 10px',
    color: '#000',
    fontSize: '12px',
    fontWeight: 'normal',
  },
  footer: {
    marginTop: '15px',
    padding: '10px',
    background: '#c0c0c0',
    border: '2px solid #808080',
    borderTopColor: '#000',
    borderLeftColor: '#000',
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
  },
  footerText: {
    color: '#000',
    fontSize: '11px',
    margin: 0,
  },
};

// Add bullet markers
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  div[style*="achievementsList"] li::before {
    content: "• ";
    color: #000;
    position: absolute;
    left: 0;
    font-weight: bold;
  }
`;
document.head.appendChild(styleSheet);

export default ExperienceWindow;
