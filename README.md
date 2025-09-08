
<p align="center">
  <img src="frontend/public/mantis.png" alt="Mantis Logo" width="100"/>
</p>

# 🐞 TrackMantis – Bug Tracking System (MERN Stack)

**TrackMantis** is a full-featured bug tracking and issue management system for modern software teams. Built with the **MERN stack** and enhanced with **Socket.io**, it provides real-time updates, role-based access, and powerful tools to streamline bug tracking from reporting to resolution.

---

## 🚀 Features

- 🔐 **Role-Based Access**
  - **Admin**: Manage users, roles, and projects.

- 🐛 **Bug Reporting**
  - Add bug title, description, steps to reproduce, priority, severity, OS, browser, device, and file attachments.

- 💬 **Real-Time Comment System**
  - Collaborate and discuss bugs instantly with team members using **Socket.io**.

- 📊 **Interactive Dashboard**
  - Visual analytics of bug statuses, priorities, and severity using responsive charts.

- 🔍 **Advanced Search & Filters**
  - Easily filter bugs by project, severity, status, and assigned developer.

- 📁 **Cloud File Upload**
  - Upload bug-related screenshots or documents via **Cloudinary**.

- 🧾 **Activity Logs**
  - Track bug history, updates, and discussion threads.

- 🌐 **Fully Responsive UI**
  - Built using **Tailwind CSS** and **Framer Motion** for mobile-friendly and animated interfaces.

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Aos
- Axios

### 🔹 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io
- Cloudinary
- JWT + Cookies (Authentication)

---

## 📂 Folder Structure

```pgsql
TrackMantis/
├── client/                   # React frontend
│   ├── public/               # Public assets (MantisLogo.png, favicon, etc.)
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── context/          # Auth & Global context providers
│       ├── pages/            # Route-based components
│       ├── utils/            # Helper functions
│       └── App.js
├── server/                   # Node.js backend
│   ├── controllers/          # Route handler logic
│   ├── middlewares/          # Auth, error, file, etc.
│   ├── models/               # MongoDB schemas
│   ├── routes/               # Express route definitions
│   ├── utils/                # Helpers (e.g., token, cloudinary)
│   └── index.js              # App entry point
├── .env                      # Environment variables
├── README.md
└── package.json
```

---

## 🧪 Getting Started

### Prerequisites

- Node.js, npm
- MongoDB Atlas
- Cloudinary Account
- Vercel or Render for deployment

### 🔧 Backend Setup

```bash
cd server
npm install
# Create a .env file with:
# MONGO_URI=
# JWT_SECRET=
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=
npm run server
```

### 🎨 Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🌐 Live Demo

> 🔗 [Live Site](https://trackmantis.vercel.app)  

---

## 👨‍💻 Developer

**Umair Khan**  
📧 mrumairkhan74@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/mrumairkhan74)  
🔗 [Instagram](https://www.instagram.com/mrumairkhan74)

---

## 📝 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.
