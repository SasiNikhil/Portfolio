import React, { useState, useEffect } from 'react';
import './App.css';
import Terminal from './components/Terminal';
import ProjectsWindow from './components/ProjectsWindow';
import ExperienceWindow from './components/ExperienceWindow';
import ContactWindow from './components/ContactWindow';
import SettingsWindow from './components/SettingsWindow';
import BootSequence from './components/BootSequence';

function App() {
  const [showBoot, setShowBoot] = useState(true);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [windows, setWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [maximizedWindow, setMaximizedWindow] = useState(null);
  const [minimizedWindows, setMinimizedWindows] = useState(new Set());
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [contextMenu, setContextMenu] = useState(null);
  
  // Settings
  const [desktopColor, setDesktopColor] = useState('#008080');
  const [baseFontSize, setBaseFontSize] = useState(28);
  const [showDesktopIcons, setShowDesktopIcons] = useState(true);
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [wallpaper, setWallpaper] = useState('url(/wallpaper.svg)');

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setShowBoot(false);
    }, 3500);

    return () => clearTimeout(bootTimer);
  }, []);

  // Apply base font size to body element
  useEffect(() => {
    document.body.style.fontSize = `${baseFontSize}px`;
  }, [baseFontSize]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Escape - deselect desktop icon
      if (e.key === 'Escape') {
        setSelectedDesktopIcon(null);
      }
      
      // Enter - open selected desktop icon
      if (e.key === 'Enter' && selectedDesktopIcon) {
        openWindow(selectedDesktopIcon);
      }
      
      // Alt+F4 - close active window
      if (e.altKey && e.key === 'F4' && activeWindow) {
        e.preventDefault();
        closeWindow(activeWindow);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDesktopIcon, activeWindow]);

  // Close context menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      setContextMenu(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const openWindow = (type) => {
    const existingWindow = windows.find((w) => w.type === type);

    // If window already exists
    if (existingWindow) {
      // If it's already focused and not minimized, minimize it
      if (activeWindow === existingWindow.id && !minimizedWindows.has(existingWindow.id)) {
        setMinimizedWindows(new Set(minimizedWindows).add(existingWindow.id));
      } else {
        // Otherwise, restore/focus it
        setMinimizedWindows((prev) => {
          const newSet = new Set(prev);
          newSet.delete(existingWindow.id);
          return newSet;
        });
        focusWindow(existingWindow.id);
      }
      setShowStartMenu(false);
      return;
    }

    // Create new window if it doesn't exist
    const id = Date.now();
    const newWindow = {
      id,
      type,
      title: getWindowTitle(type),
      icon: getWindowIcon(type),
      zIndex: Math.max(...windows.map((w) => w.zIndex || 0), 50) + 1,
      width: 500,
      height: 400,
      x: 50,
      y: 50,
    };
    setWindows([...windows, newWindow]);
    setActiveWindow(id);
    setShowStartMenu(false);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter((w) => w.id !== id));
  };

  const focusWindow = (id) => {
    setActiveWindow(id);
    setWindows(
      windows.map((w) =>
        w.id === id ? { ...w, zIndex: Math.max(...windows.map((w) => w.zIndex || 0)) + 1 } : w
      )
    );
  };

  const closeAllWindows = () => {
    setWindows([]);
    setActiveWindow(null);
    setMaximizedWindow(null);
    setMinimizedWindows(new Set());
    setContextMenu(null);
  };

  const toggleMaximize = (id) => {
    if (maximizedWindow === id) {
      setMaximizedWindow(null);
    } else {
      setMaximizedWindow(id);
      focusWindow(id);
    }
  };

  const handleResizeMouseDown = (e, windowId, edge) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const window = windows.find((w) => w.id === windowId);
    
    if (!window) return;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      let newWidth = window.width;
      let newHeight = window.height;
      let newX = window.x;
      let newY = window.y;

      if (edge.includes('right')) newWidth = Math.max(300, window.width + deltaX);
      if (edge.includes('bottom')) newHeight = Math.max(200, window.height + deltaY);
      if (edge.includes('left')) {
        newX = window.x + deltaX;
        newWidth = Math.max(300, window.width - deltaX);
      }
      if (edge.includes('top')) {
        newY = window.y + deltaY;
        newHeight = Math.max(200, window.height - deltaY);
      }

      setWindows(
        windows.map((w) =>
          w.id === windowId
            ? { ...w, width: newWidth, height: newHeight, x: newX, y: newY }
            : w
        )
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getWindowTitle = (type) => {
    switch (type) {
      case 'terminal':
        return '🖥️ System Terminal';
      case 'projects':
        return '📁 Projects';
      case 'experience':
        return '💼 Experience';
      case 'contact':
        return '📱 Contact';
      case 'settings':
        return '⚙️ Settings';
      default:
        return 'Window';
    }
  };

  const getWindowIcon = (type) => {
    switch (type) {
      case 'terminal':
        return '🖥️';
      case 'projects':
        return '📁';
      case 'experience':
        return '💼';
      case 'contact':
        return '📱';
      case 'settings':
        return '⚙️';
      default:
        return '📄';
    }
  };

  const renderWindowContent = (window) => {
    switch (window.type) {
      case 'terminal':
        return <Terminal />;
      case 'projects':
        return <ProjectsWindow />;
      case 'experience':
        return <ExperienceWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'settings':
        return <SettingsWindow 
          desktopColor={desktopColor}
          setDesktopColor={setDesktopColor}
          baseFontSize={baseFontSize}
          setBaseFontSize={setBaseFontSize}
          showDesktopIcons={showDesktopIcons}
          setShowDesktopIcons={setShowDesktopIcons}
          enableAnimations={enableAnimations}
          setEnableAnimations={setEnableAnimations}
          wallpaper={wallpaper}
          setWallpaper={setWallpaper}
        />;
      default:
        return <div>Unknown Window</div>;
    }
  };

  if (showBoot) {
    return <BootSequence />;
  }

  return (
    <div 
      className="desktop" 
      style={{ 
        background: wallpaper !== 'solid' ? wallpaper : desktopColor,
        backgroundSize: wallpaper !== 'solid' ? 'cover' : 'auto',
        backgroundAttachment: wallpaper !== 'solid' ? 'fixed' : 'scroll',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedDesktopIcon(null);
          // Close settings window when clicking on desktop background
          const settingsWindow = windows.find(w => w.type === 'settings');
          if (settingsWindow) {
            closeWindow(settingsWindow.id);
          }
        }
      }}
    >
      {/* TASKBAR */}
      <div 
        className="taskbar"
        onContextMenu={(e) => {
          e.preventDefault();
          setContextMenu({
            x: e.clientX,
            y: e.clientY,
          });
        }}
      >
        <button
          className="start-button"
          onClick={() => setShowStartMenu(!showStartMenu)}
          title="Start Menu"
        >
          ▶
        </button>

        {/* START MENU */}
        {showStartMenu && (
          <div className="start-menu">
            <div className="start-menu-item" onClick={() => openWindow('terminal')}>
              <span>🖥️</span>
              Terminal
            </div>
            <div className="start-menu-item" onClick={() => openWindow('projects')}>
              <span>📁</span>
              Projects
            </div>
            <div className="start-menu-item" onClick={() => openWindow('experience')}>
              <span>💼</span>
              Experience
            </div>
            <div className="start-menu-item" onClick={() => openWindow('contact')}>
              <span>📱</span>
              Contact
            </div>
            <div className="start-menu-item" style={{ marginTop: '15px' }} onClick={() => openWindow('settings')}>
              <span>⚙️</span>
              Settings
            </div>
          </div>
        )}

        {/* TASKBAR ICONS */}
        <div className="taskbar-icons">
          <div
            className={`taskbar-icon ${
              windows.some((w) => w.type === 'terminal' && !minimizedWindows.has(w.id)) ? 'active' : 
              windows.some((w) => w.type === 'terminal') ? 'minimized' : ''
            }`}
            onClick={() => openWindow('terminal')}
            title="Open Terminal"
          >
            🖥️
          </div>
          <div
            className={`taskbar-icon ${
              windows.some((w) => w.type === 'projects' && !minimizedWindows.has(w.id)) ? 'active' : 
              windows.some((w) => w.type === 'projects') ? 'minimized' : ''
            }`}
            onClick={() => openWindow('projects')}
            title="Open Projects"
          >
            📁
          </div>
          <div
            className={`taskbar-icon ${
              windows.some((w) => w.type === 'experience' && !minimizedWindows.has(w.id)) ? 'active' : 
              windows.some((w) => w.type === 'experience') ? 'minimized' : ''
            }`}
            onClick={() => openWindow('experience')}
            title="Open Experience"
          >
            💼
          </div>
          <div
            className={`taskbar-icon ${
              windows.some((w) => w.type === 'contact' && !minimizedWindows.has(w.id)) ? 'active' : 
              windows.some((w) => w.type === 'contact') ? 'minimized' : ''
            }`}
            onClick={() => openWindow('contact')}
            title="Open Contact"
          >
            📱
          </div>
        </div>
        
        {/* CLOCK */}
        <div className="taskbar-clock">
          <div>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
          <div>{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
        </div>
      </div>

      {/* WINDOWS */}
      {windows
        .filter((window) => !minimizedWindows.has(window.id))
        .map((window) => (
          <div
            key={window.id}
            data-window-id={window.id}
            className={`window ${activeWindow === window.id ? 'focused' : ''} ${maximizedWindow === window.id ? 'maximized' : ''} ${enableAnimations ? 'animated' : ''}`}
            style={{
            zIndex: window.zIndex,
            width: maximizedWindow === window.id ? '100%' : `${window.width}px`,
            height: maximizedWindow === window.id ? 'calc(100vh - 40px)' : `${window.height}px`,
            left: maximizedWindow === window.id ? 0 : `${window.x}px`,
            top: maximizedWindow === window.id ? 0 : `${window.y}px`,
            transition: enableAnimations ? 'all 0.2s ease' : 'none',
          }}
          onClick={() => focusWindow(window.id)}
          onMouseDown={(e) => {
            if (e.target.classList.contains('window-header')) {
              const startX = e.clientX;
              const startY = e.clientY;

              const handleMouseMove = (moveEvent) => {
                const deltaX = moveEvent.clientX - startX;
                const deltaY = moveEvent.clientY - startY;
                setWindows(
                  windows.map((w) =>
                    w.id === window.id
                      ? { ...w, x: w.x + deltaX, y: w.y + deltaY }
                      : w
                  )
                );
              };

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }
          }}
        >
          <div className="window-header">
            <div className="window-header-title">
              <span>{window.icon}</span>
              {window.title}
            </div>
            <div className="window-controls">
              <button 
                className="window-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMinimizedWindows(new Set(minimizedWindows).add(window.id));
                }}
              >
                −
              </button>
              <button
                className="window-button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMaximize(window.id);
                }}
              >
                {maximizedWindow === window.id ? '❒' : '◻'}
              </button>
              <button
                className="window-button close"
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(window.id);
                }}
              >
                ✕
              </button>
            </div>
          </div>
          <div 
            className="window-content"
            style={{
              fontSize: maximizedWindow === window.id 
                ? `${baseFontSize * 2}px` 
                : `${Math.max(baseFontSize, Math.min(baseFontSize * 2, window.width / 12))}px`
            }}
          >
            {renderWindowContent(window)}
          </div>

          {/* RESIZE HANDLES */}
          {maximizedWindow !== window.id && (
            <>
              <div className="resize-handle resize-top" onMouseDown={(e) => handleResizeMouseDown(e, window.id, 'top')} />
              <div className="resize-handle resize-bottom" onMouseDown={(e) => handleResizeMouseDown(e, window.id, 'bottom')} />
              <div className="resize-handle resize-left" onMouseDown={(e) => handleResizeMouseDown(e, window.id, 'left')} />
              <div className="resize-handle resize-right" onMouseDown={(e) => handleResizeMouseDown(e, window.id, 'right')} />
              <div className="resize-handle resize-top-left" onMouseDown={(e) => handleResizeMouseDown(e, window.id, 'top-left')} />
              <div className="resize-handle resize-top-right" onMouseDown={(e) => handleResizeMouseDown(e, window.id, 'top-right')} />
              <div className="resize-handle resize-bottom-left" onMouseDown={(e) => handleResizeMouseDown(e, window.id, 'bottom-left')} />
              <div className="resize-handle resize-bottom-right" onMouseDown={(e) => handleResizeMouseDown(e, window.id, 'bottom-right')} />
            </>
          )}
          </div>
        ))}

      {/* DESKTOP ICONS */}
      {showDesktopIcons && (
        <div className="desktop-content">
          <div 
            className="desktop-icon" 
            onClick={(e) => { e.stopPropagation(); setSelectedDesktopIcon('terminal'); }}
            onDoubleClick={() => openWindow('terminal')}
            style={{ 
              backgroundColor: selectedDesktopIcon === 'terminal' ? '#4A90E2' : 'transparent',
              color: selectedDesktopIcon === 'terminal' ? '#fff' : '#fff'
            }}
          >
            <div className="desktop-icon-img">🖥️</div>
            <div className="desktop-icon-label">Terminal</div>
          </div>
          <div 
            className="desktop-icon" 
            onClick={(e) => { e.stopPropagation(); setSelectedDesktopIcon('projects'); }}
            onDoubleClick={() => openWindow('projects')}
            style={{ 
              backgroundColor: selectedDesktopIcon === 'projects' ? '#4A90E2' : 'transparent',
              color: selectedDesktopIcon === 'projects' ? '#fff' : '#fff'
            }}
          >
            <div className="desktop-icon-img">📁</div>
            <div className="desktop-icon-label">Projects</div>
          </div>
          <div 
            className="desktop-icon" 
            onClick={(e) => { e.stopPropagation(); setSelectedDesktopIcon('experience'); }}
            onDoubleClick={() => openWindow('experience')}
            style={{ 
              backgroundColor: selectedDesktopIcon === 'experience' ? '#4A90E2' : 'transparent',
              color: selectedDesktopIcon === 'experience' ? '#fff' : '#fff'
            }}
          >
            <div className="desktop-icon-img">💼</div>
            <div className="desktop-icon-label">Experience</div>
          </div>
          <div 
            className="desktop-icon" 
            onClick={(e) => { e.stopPropagation(); setSelectedDesktopIcon('contact'); }}
            onDoubleClick={() => openWindow('contact')}
            style={{ 
              backgroundColor: selectedDesktopIcon === 'contact' ? '#4A90E2' : 'transparent',
              color: selectedDesktopIcon === 'contact' ? '#fff' : '#fff'
            }}
          >
            <div className="desktop-icon-img">📱</div>
            <div className="desktop-icon-label">Contact</div>
          </div>
          <div 
            className="desktop-icon" 
            onClick={(e) => { e.stopPropagation(); setSelectedDesktopIcon('settings'); }}
            onDoubleClick={() => openWindow('settings')}
            style={{ 
              backgroundColor: selectedDesktopIcon === 'settings' ? '#4A90E2' : 'transparent',
              color: selectedDesktopIcon === 'settings' ? '#fff' : '#fff'
            }}
          >
            <div className="desktop-icon-img">⚙️</div>
            <div className="desktop-icon-label">Settings</div>
          </div>
        </div>
      )}

      {contextMenu && (
        <div 
          className="context-menu"
          style={{
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="context-menu-section">
            <div className="context-menu-label">Quick Access</div>
            <div className="context-menu-item disabled">Desktop</div>
            <div className="context-menu-item disabled">Documents</div>
            <div className="context-menu-item disabled">Downloads</div>
          </div>
          
          <div className="context-menu-divider"></div>
          
          <div className="context-menu-section">
            <div className="context-menu-label">Portfolio</div>
            <div className="context-menu-item disabled">Terminal</div>
            <div className="context-menu-item disabled">Projects</div>
            <div className="context-menu-item disabled">Experience</div>
          </div>

          <div className="context-menu-divider"></div>

          <div className="context-menu-item" onClick={closeAllWindows}>
            Close All Windows
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
