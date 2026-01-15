import React from 'react';

const ProjectsWindow = () => {
  const projects = [
    {
      id: 1,
      name: 'Cyber Threat Detection System',
      description:
        'An intelligent machine learning model that identifies and classifies cybersecurity threats in real-time using behavioral analysis and pattern recognition. Deployed on AWS infrastructure with automated incident response.',
      technologies: ['Python', 'TensorFlow', 'AWS', 'Machine Learning', 'Data Science'],
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
        'A predictive analytics platform that uses historical weather, soil, and agricultural data to forecast crop yields. Helps farmers optimize planting strategies and resource allocation through data-driven insights.',
      technologies: ['Python', 'Machine Learning', 'MongoDB', 'Data Analytics', 'React'],
      keyFeatures: [
        'Yield prediction algorithms',
        'Weather integration',
        'Soil analysis',
        'Harvest optimization',
      ],
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>PORTFOLIO PROJECTS</h2>
        <p style={styles.subtitle}>Innovative solutions showcasing full-stack capabilities</p>
      </div>

      {projects.map((project) => (
        <div key={project.id} style={styles.projectCard}>
          <div style={styles.projectHeader}>
            <h3 style={styles.projectName}>{project.name}</h3>
          </div>

          <p style={styles.projectDescription}>{project.description}</p>

          <div style={styles.section}>
            <label style={styles.sectionLabel}>TECHNOLOGIES:</label>
            <div style={styles.techStack}>
              {project.technologies.map((tech, idx) => (
                <span key={idx} style={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <label style={styles.sectionLabel}>KEY FEATURES:</label>
            <ul style={styles.featuresList}>
              {project.keyFeatures.map((feature, idx) => (
                <li key={idx} style={styles.featureItem}>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div style={styles.footer}>
        <p style={styles.footerText}>
          Complete project details and technical implementations showcase proficiency across the full development lifecycle.
        </p>
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
  projectCard: {
    background: '#fff',
    border: '2px solid #808080',
    borderTopColor: '#000',
    borderLeftColor: '#000',
    borderRightColor: '#dfdfdf',
    borderBottomColor: '#dfdfdf',
    padding: '10px',
    marginBottom: '10px',
  },
  projectHeader: {
    marginBottom: '8px',
  },
  projectName: {
    color: '#000',
      fontSize: '16px',
    margin: 0,
    fontWeight: 'bold',
  },
  projectDescription: {
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
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  featureItem: {
    color: '#000',
      fontSize: '13px',
    marginBottom: '8px',
    paddingLeft: '20px',
    position: 'relative',
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

// Add before list marker styling
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  div[style*="featuresList"] li::before {
    content: "• ";
    color: #000;
    position: absolute;
    left: 0;
  }
`;
document.head.appendChild(styleSheet);

export default ProjectsWindow;
