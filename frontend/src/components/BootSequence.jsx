import React, { useState, useEffect } from 'react';

const BootSequence = () => {
  const [bootText, setBootText] = useState('');
  const [progress, setProgress] = useState(0);

  const bootMessages = [
    'Loading portfolio...',
    'Preparing projects...',
    'Loading experience...',
    'Starting system...',
  ];

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    const textInterval = setInterval(() => {
      if (currentIndex < bootMessages.length) {
        const message = bootMessages[currentIndex];
        if (currentText.length < message.length) {
          currentText += message[currentText.length];
          setBootText((prev) => prev + message[currentText.length - 1]);
        } else {
          currentText = '';
          currentIndex++;
          setBootText((prev) => prev + '\n');
          // Update progress bar based on boot messages
          setProgress((currentIndex / bootMessages.length) * 100);
        }
      }
    }, 30);

    return () => clearInterval(textInterval);
  }, [bootMessages.length]);

  useEffect(() => {
    // Ensure progress reaches 100% when all messages are done
    if (bootText.split('\n').filter(line => line.trim()).length === bootMessages.length) {
      setProgress(100);
    }
  }, [bootText, bootMessages.length]);

  return (
    <div style={styles.bootScreen}>
      <div style={styles.container}>
        <h1 style={styles.logo}>SASI NIKHIL OS v1.0</h1>
        <div style={styles.textDisplay}>{bootText}</div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progress, width: `${Math.min(progress, 100)}%` }} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  bootScreen: {
    width: '100vw',
    height: '100vh',
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Courier New", monospace',
    overflow: 'hidden',
  },
  container: {
    textAlign: 'center',
    maxWidth: '600px',
  },
  logo: {
    color: '#fff',
    fontSize: '28px',
    marginBottom: '30px',
    fontWeight: 'bold',
    letterSpacing: '4px',
  },
  textDisplay: {
    color: '#fff',
    fontSize: '12px',
    minHeight: '150px',
    textAlign: 'left',
    padding: '15px',
    border: '1px solid #808080',
    background: '#000',
    marginBottom: '30px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    lineHeight: '1.6',
  },
  progressBar: {
    width: '300px',
    height: '20px',
    background: '#c0c0c0',
    border: '2px solid',
    borderTopColor: '#000',
    borderLeftColor: '#000',
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
    overflow: 'hidden',
    marginBottom: '20px',
    padding: '2px',
  },
  progress: {
    height: '100%',
    background: '#000080',
    transition: 'width 0.1s ease',
  },
  hint: {
    color: '#808080',
    fontSize: '11px',
    fontStyle: 'italic',
  },
};

export default BootSequence;
