import React, { useState } from 'react';

const SettingsWindow = ({ 
  desktopColor, 
  setDesktopColor, 
  baseFontSize, 
  setBaseFontSize, 
  showDesktopIcons, 
  setShowDesktopIcons,
  enableAnimations,
  setEnableAnimations,
  wallpaper,
  setWallpaper
}) => {
  const colorMap = {
    '#008080': 'teal',
    '#000080': 'blue',
    '#008000': 'green',
    '#800080': 'purple'
  };
  
  const colorToHex = {
    'teal': '#008080',
    'blue': '#000080',
    'green': '#008000',
    'purple': '#800080'
  };

  const fontSizeMap = {
    18: 'small',
    28: 'medium',
    38: 'large'
  };

  const fontSizeToValue = {
    'small': 18,
    'medium': 28,
    'large': 38
  };

  const [theme, setTheme] = useState(colorMap[desktopColor] || 'teal');
  const [fontSize, setFontSize] = useState(fontSizeMap[baseFontSize] || 'medium');

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setDesktopColor(colorToHex[newTheme]);
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    setBaseFontSize(fontSizeToValue[newSize]);
  };

  const styles = {
    container: {
      padding: '20px',
      height: '100%',
      overflowY: 'auto',
    },
    header: {
      marginBottom: '20px',
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
    section: {
      background: '#fff',
      border: '2px solid #808080',
      borderTopColor: '#000',
      borderLeftColor: '#000',
      borderRightColor: '#dfdfdf',
      borderBottomColor: '#dfdfdf',
      padding: '15px',
      marginBottom: '15px',
    },
    sectionTitle: {
      color: '#000080',
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '12px',
      textTransform: 'uppercase',
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
      gap: '10px',
    },
    label: {
      color: '#000',
      fontSize: '13px',
      minWidth: '120px',
    },
    select: {
      background: '#fff',
      border: '2px solid',
      borderTopColor: '#000',
      borderLeftColor: '#000',
      borderRightColor: '#dfdfdf',
      borderBottomColor: '#dfdfdf',
      padding: '4px 8px',
      color: '#000',
      fontSize: '13px',
      minWidth: '150px',
    },
    checkbox: {
      width: '16px',
      height: '16px',
    },
    infoBox: {
      background: '#ffffcc',
      border: '1px solid #808080',
      padding: '10px',
      marginTop: '15px',
    },
    infoText: {
      color: '#000',
      fontSize: '12px',
      margin: '5px 0',
      lineHeight: '1.6',
    },
    systemInfo: {
      background: '#c0c0c0',
      border: '2px solid #808080',
      borderTopColor: '#fff',
      borderLeftColor: '#fff',
      borderRightColor: '#000',
      borderBottomColor: '#000',
      padding: '12px',
      marginTop: '10px',
    },
    systemLabel: {
      color: '#000',
      fontSize: '12px',
      marginBottom: '6px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    systemValue: {
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>System Settings</h2>
        <p style={styles.subtitle}>Configure your portfolio preferences</p>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Appearance</div>
        <div style={styles.row}>
          <label style={styles.label}>Wallpaper:</label>
          <select style={styles.select} value={wallpaper} onChange={(e) => setWallpaper(e.target.value)}>
            <option value='url(/wallpaper.svg)'>Nostalgic (Default)</option>
            <option value="solid">Solid Color</option>
          </select>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Desktop Color:</label>
          <select style={styles.select} value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
            <option value="teal">Teal (Classic)</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
          </select>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Font Size:</label>
          <select style={styles.select} value={fontSize} onChange={(e) => handleFontSizeChange(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Show Desktop Icons:</label>
          <input 
            type="checkbox" 
            style={styles.checkbox} 
            checked={showDesktopIcons} 
            onChange={(e) => setShowDesktopIcons(e.target.checked)}
          />
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Performance</div>
        <div style={styles.row}>
          <label style={styles.label}>Enable Animations:</label>
          <input 
            type="checkbox" 
            style={styles.checkbox} 
            checked={enableAnimations}
            onChange={(e) => setEnableAnimations(e.target.checked)}
          />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Hardware Acceleration:</label>
          <input type="checkbox" style={styles.checkbox} defaultChecked />
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>System Information</div>
        <div style={styles.systemInfo}>
          <div style={styles.systemLabel}>
            <span>User:</span>
            <span style={styles.systemValue}>Sasi Nikhil Mikkilineni</span>
          </div>
          <div style={styles.systemLabel}>
            <span>Version:</span>
            <span style={styles.systemValue}>Portfolio OS 1.0</span>
          </div>
          <div style={styles.systemLabel}>
            <span>Build:</span>
            <span style={styles.systemValue}>2025.12.30</span>
          </div>
          <div style={styles.systemLabel}>
            <span>React Version:</span>
            <span style={styles.systemValue}>18.x</span>
          </div>
        </div>
      </div>

      <div style={styles.infoBox}>
        <div style={styles.infoText}>
          ℹ️ <strong>Note:</strong> Settings changes take effect immediately. Changes will persist during your session but will reset on page refresh.
        </div>
      </div>
    </div>
  );
};

export default SettingsWindow;
