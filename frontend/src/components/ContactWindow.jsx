import React from 'react';

const ContactWindow = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: '⚙',
      url: 'https://github.com/SasiNikhil',
      color: '#00ff7f',
    },
    {
      name: 'LinkedIn',
      icon: 'in',
      url: 'https://linkedin.com/in/sasi-nikhil-mikkilineni-506953232/',
      color: '#0a66c2',
    },
    {
      name: 'Email',
      icon: '@',
      url: 'mailto:sasinikhil6@gmail.com',
      color: '#ff6b6b',
    },
  ];

  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>CONNECT WITH ME</h2>
        <p style={styles.subtitle}>Click any link to connect or get in touch</p>
      </div>

      <div style={styles.linksGrid}>
        {socialLinks.map((link, idx) => (
          <button
            key={idx}
            onClick={() => handleLinkClick(link.url)}
            style={styles.linkButton}
            onMouseEnter={(e) => {
              e.target.style.borderTopColor = '#000';
              e.target.style.borderLeftColor = '#000';
              e.target.style.borderRightColor = '#fff';
              e.target.style.borderBottomColor = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderTopColor = '#fff';
              e.target.style.borderLeftColor = '#fff';
              e.target.style.borderRightColor = '#000';
              e.target.style.borderBottomColor = '#000';
            }}
          >
            <div style={styles.linkIcon}>{link.icon}</div>
            <div style={styles.linkName}>{link.name}</div>
            <div style={styles.linkUrl}>{link.url.replace('https://', '').replace('mailto:', '')}</div>
          </button>
        ))}
      </div>

      <div style={styles.infoBox}>
        <p style={styles.infoText}>
          <strong>Location:</strong> San Jose, California
        </p>
        <p style={styles.infoText}>
          <strong>Phone:</strong> +1 (720) 879-7462
        </p>
        <p style={styles.infoText}>
          <strong>Email:</strong> sasinikhil6@gmail.com
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
    textAlign: 'center',
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
  linksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '8px',
    marginBottom: '15px',
  },
  linkButton: {
    background: '#c0c0c0',
    border: '2px solid',
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderRightColor: '#000',
    borderBottomColor: '#000',
    padding: '12px 8px',
    cursor: 'pointer',
    transition: 'none',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    outline: 'none',
  },
  linkIcon: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  linkName: {
    color: '#000',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  linkUrl: {
    color: '#808080',
      fontSize: '12px',
    wordBreak: 'break-all',
  },
  contactForm: {
    background: '#c0c0c0',
    border: '2px solid',
    borderTopColor: '#000',
    borderLeftColor: '#000',
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
    padding: '10px',
    marginBottom: '15px',
  },
  formTitle: {
    color: '#000080',
    fontSize: '12px',
    margin: '0 0 10px 0',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  input: {
    background: '#fff',
    border: '2px solid',
    borderTopColor: '#000',
    borderLeftColor: '#000',
    borderRightColor: '#dfdfdf',
    borderBottomColor: '#dfdfdf',
    padding: '4px 6px',
    color: '#000',
    fontFamily: 'inherit',
    fontSize: '11px',
    transition: 'none',
    outline: 'none',
  },
  submitButton: {
    background: '#c0c0c0',
    border: '2px solid',
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderRightColor: '#000',
    borderBottomColor: '#000',
    padding: '6px 10px',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '11px',
    cursor: 'pointer',
    transition: 'none',
  },
  infoBox: {
    background: '#fff',
    border: '2px solid',
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
    padding: '10px',
  },
  infoText: {
    color: '#000',
    fontSize: '14px',
    margin: '10px 0',
  },
};

export default ContactWindow;
