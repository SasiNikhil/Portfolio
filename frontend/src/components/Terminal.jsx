import React, { useState, useRef, useEffect } from 'react';

const Terminal = () => {
  const [history, setHistory] = useState(['Welcome to Sasi Nikhil\'s System Terminal', '> ']);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    whoami: () => [
      'Mikkilineni Sasi Nikhil',
      'Education: B.S. Software Engineering @ San Jose State University (SJSU)',
      'Graduation: May 2026',
      '> ',
    ],
    skills: () => [
      '=== TECHNICAL SKILLS ===',
      'Languages: Java, JavaScript, Python, HTML/CSS, SQL',
      'Frontend: React, React Hooks, React Router, Redux',
      'Backend: Node.js, Express.js, REST APIs',
      'Databases: MongoDB, MySQL, PostgreSQL',
      'DevOps & Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes',
      'Tools & Platforms: Git, GitHub, Postman, VSCode, IntelliJ',
      'Concepts: Full-Stack MERN, Microservices, CI/CD',
      '> ',
    ],
    contact: () => [
      '=== CONTACT INFORMATION ===',
      'Email: sasi.nikhil@sjsu.edu',
      'LinkedIn: linkedin.com/in/sasi-nikhil',
      'GitHub: github.com/sasi-nikhil',
      'Location: San Jose, California',
      '> ',
    ],
    projects: () => [
      '=== PROJECTS ===',
      '1. Cyber Threat Detection',
      '   - ML-based threat detection system',
      '   - Tech: Python, TensorFlow, AWS',
      '',
      '2. Crop Yield Forecast',
      '   - Predictive analytics for agriculture',
      '   - Tech: Python, Machine Learning, MongoDB',
      '> ',
    ],
    help: () => [
      '=== AVAILABLE COMMANDS ===',
      'whoami     - Display user information',
      'skills     - List technical skills',
      'contact    - Show contact information',
      'projects   - View recent projects',
      'date       - Display current date',
      'time       - Display current time',
      'uptime     - System uptime',
      'version    - Portfolio OS version',
      'clear      - Clear terminal',
      'help       - Show this help message',
      '> ',
    ],
    date: () => [
      new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      '> ',
    ],
    time: () => [
      new Date().toLocaleTimeString('en-US'),
      '> ',
    ],
    uptime: () => {
      const uptime = Math.floor((Date.now() - window.performanceStartTime) / 1000);
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = uptime % 60;
      return [
        `System uptime: ${hours}h ${minutes}m ${seconds}s`,
        '> ',
      ];
    },
    version: () => [
      'Portfolio OS v1.0',
      'Build: 2025.12.30',
      'React Version: 18.x',
      'Developer: Sasi Nikhil Mikkilineni',
      '> ',
    ],
    clear: () => [],
    '': () => ['> '],
  };

  // Initialize performance start time
  if (!window.performanceStartTime) {
    window.performanceStartTime = Date.now();
  }

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.toLowerCase().trim();
    const output = commands[trimmedCmd] ? commands[trimmedCmd]() : [
      `Command not found: ${cmd}. Type 'help' for available commands.`,
      '> ',
    ];

    if (trimmedCmd === 'clear') {
      setHistory(['> ']);
    } else {
      setHistory([...history.slice(0, -1), input, ...output]);
    }

    setInput('');
    setCommandHistory([...commandHistory, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div style={styles.terminal}>
      <div style={styles.terminalOutput} ref={terminalRef}>
        {history.map((line, idx) => (
          <div key={idx} style={styles.outputLine}>
            {line}
          </div>
        ))}
      </div>
      <div style={styles.inputLine}>
        <span style={styles.prompt}>{'> '}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
          autoFocus
          placeholder="Type 'help' for commands..."
        />
      </div>
    </div>
  );
};

const styles = {
  terminal: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#000',
    fontFamily: '"Courier New", monospace',
    color: '#c0c0c0',
  },
  terminalOutput: {
    flex: 1,
    overflow: 'auto',
    padding: '12px',
    lineHeight: '1.8',
    fontSize: '16px',
  },
  outputLine: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  inputLine: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 10px',
    borderTop: '1px solid #808080',
    gap: '5px',
  },
  prompt: {
    color: '#c0c0c0',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: '#c0c0c0',
    fontFamily: '"Courier New", monospace',
    fontSize: '16px',
    outline: 'none',
  },
};

export default Terminal;
