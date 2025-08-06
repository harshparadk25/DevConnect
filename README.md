# 🚀 DevConnect – Developer Portfolio Sharing Platform

DevConnect is a full-stack web application designed to empower developers to create personalized profiles, showcase their projects, and receive constructive feedback from the community.

---

## 📸 Demo

> Coming Soon – Add deployment links or screenshots here if available.

---

## ✨ Features

- 🔐 **User Authentication** (JWT-based)
- 👤 **Create & Update Profile**
- 💼 **Post Projects** with title, description, and external link
- 💬 **Comment System** for feedback and engagement
- 🔍 **Search Functionality** (by project name or username)
- ❤️ **Like Projects**
- 💻 **Responsive UI** using TailwindCSS + ShadCN
- ⚡ **Optimized UI/UX** with React + Vite

---

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS** + **ShadCN UI**
- **Axios**, **React Router DOM**
- **Framer Motion** (for animation)

### Backend
- **Node.js**, **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **Cloud Deployment Ready**

---

## 📁 Project Structure

```
devconnect/
├── client/             # Frontend (React + Vite)
│   ├── components/
│   ├── pages/
│   └── context/        # Auth context & state management
├── server/             # Backend (Node + Express)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
├── .env                # Environment config (not committed)
├── .gitignore
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server/` folder with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

✅ **Do NOT commit your `.env` file. It's listed in `.gitignore`.**

---

## 🧪 Getting Started Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/devconnect.git
cd devconnect
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

> Visit the app at: `http://localhost:5173`

---

## 🚀 Deployment Instructions

### 🖥 Backend (Render/Any Node Hosting)

- Push `server/` folder to a separate repo or deploy as is.
- Add environment variables on the platform.
- Example: Render, Railway, or Heroku.

### 🌐 Frontend (Vercel/Netlify)

- Push `client/` folder to GitHub separately or deploy as is.
- Add `VITE_API_BASE_URL` if you use environment variables for your API URL.
- Run:

```bash
npm run build
```

Then deploy the output to **Vercel**, **Netlify**, or any static host.

---

## 🧠 Future Enhancements

- ✅ OAuth (Google/GitHub) Authentication
- ✅ Pagination for Projects
- ✅ Sorting and Filtering Projects
- ✅ User Profile Pages
- ✅ Bookmark or Save Projects

---

## 🙋‍♂️ Author

Made with ❤️ by **Harsh Paradkar**

- 🔗 [GitHub](https://github.com/harshparadkar25)
- 📧 harshparadkar25@gmail.com

---

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to fork, modify, and use for personal or commercial projects.

---

## ⭐️ Support

If you like this project, don’t forget to ⭐️ the repository and share it with your fellow developers!
