# Sasi Nikhil's Portfolio OS 🚀

A comprehensive, web-based operating system portfolio built with the MERN stack (MongoDB, Express, React, Node.js). Features a glassmorphism UI design with an interactive desktop environment, showcasing projects and professional experience.

## 📋 Features

### Desktop Environment
- **Glassmorphism UI**: Frosted glass effects with neon accents
- **Draggable Windows**: Move and manage multiple windows
- **Taskbar & Start Menu**: Classic OS-style navigation
- **Boot Sequence**: System initialization animation
- **Interactive Icons**: Desktop and taskbar icons

### Core Components
1. **System Terminal** - Interactive shell with commands:
   - `whoami` - SJSU student profile
   - `skills` - Technical skill list
   - `contact` - Contact information
   - `projects` - Project overview
   - `help` - Available commands

2. **Projects Window** - Displays:
   - Cyber Threat Detection System
   - Crop Yield Forecast
   - Technologies and key features

3. **Experience Window** - Shows:
   - Araneus (Blockchain UI Developer)
   - Ethnus (MERN Stack Intern)
   - Achievements and technologies

### Backend Services
- RESTful API with Node.js/Express
- MongoDB integration for system logs
- Docker containerization
- Health check endpoints

## 🏗️ Project Structure

```
Portfolio/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Terminal.jsx
│   │   │   ├── ProjectsWindow.jsx
│   │   │   ├── ExperienceWindow.jsx
│   │   │   └── BootSequence.jsx
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── Dockerfile
├── backend/
│   ├── models/
│   │   ├── Message.js
│   │   └── System.js
│   ├── routes/
│   │   ├── system.js
│   │   └── messages.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- Docker (optional)

### Local Setup

**1. Install Frontend Dependencies**
```bash
cd frontend
npm install
npm start
```

**2. Install Backend Dependencies**
```bash
cd backend
npm install
npm run dev
```

**3. Set Environment Variables**
Create a `.env` file in the backend folder:
```
MONGODB_URI=mongodb://localhost:27017/portfolio-os
PORT=5000
NODE_ENV=development
```

### Docker Deployment

Run everything with Docker Compose:
```bash
docker-compose up -d
```

Access the application:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- MongoDB: `localhost:27017`

## 📡 API Endpoints

### System Endpoints
- `GET /api/system` - Full system profile
- `GET /api/system/user` - User information
- `GET /api/system/skills` - Technical skills
- `GET /api/system/projects` - Projects list
- `GET /api/system/experience` - Work experience
- `GET /api/system/social` - Social links

### Message Endpoints
- `GET /api/messages` - Retrieve all messages
- `POST /api/messages` - Submit new message
- `GET /api/messages/:id` - Get specific message
- `DELETE /api/messages/:id` - Delete message

### Health Check
- `GET /health` - System status

## 🎨 Design Features

### Glassmorphism Style
- Frosted glass backdrop filters
- Transparent backgrounds with blur effects
- Neon green (#00ff7f) accent colors
- Gradient backgrounds (purple to indigo)

### Responsive Design
- Mobile-friendly layout
- Flexible grid for desktop icons
- Adaptive window sizing

### Animations
- Boot sequence loading
- Window open/close effects
- Hover transitions
- Neon glow effects

## 🛠️ Technologies Used

**Frontend:**
- React 18
- React Draggable
- CSS3 (Glassmorphism, Gradients, Animations)
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS

**DevOps:**
- Docker
- Docker Compose
- Alpine Linux images

## 📝 Customization Guide

### Add New Window Types
1. Create component in `frontend/src/components/`
2. Add case in `App.js` `renderWindowContent()`
3. Add menu item in Start Menu

### Update Profile Data
Edit `/backend/routes/system.js` with your information

### Change Colors
Modify CSS variables in `App.css`:
```css
/* Primary color: #667eea (purple) */
/* Accent color: #00ff7f (neon green) */
```

### Add Terminal Commands
Update the `commands` object in `Terminal.jsx`

## 📧 Contact & Social

- **Email**: sasi.nikhil@sjsu.edu
- **GitHub**: github.com/sasi-nikhil
- **LinkedIn**: linkedin.com/in/sasi-nikhil
- **Location**: San Jose, California

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- [ ] Add file explorer window
- [ ] Implement system settings panel
- [ ] Add sound effects and startup audio
- [ ] Create advanced terminal with more commands
- [ ] Add resume download functionality
- [ ] Implement message notification system
- [ ] Add light/dark theme toggle
- [ ] Create animation for skill loading sequence

---

**Built with 💜 by Sasi Nikhil | SJSU Software Engineering Student**
