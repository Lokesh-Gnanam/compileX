
# 🚀 CompileX – Cloud Code Execution Platform

[Live Demo](https://codecompilex.vercel.app/)  

CompileX is a cloud-based multi-language online compiler that allows users to write, execute, and test code in real time. It provides a clean IDE-like interface powered by Monaco Editor and a serverless backend using the Judge0 API.

---

## 🌟 Features

- 💻 Multi-language support (C++, Java, Python, JavaScript)
- ⚡ Real-time code execution
- 🧠 VS Code-like experience with Monaco Editor
- 📤 Input & Output console
- 🎨 Dark/Light theme support
- ☁ Serverless backend (Vercel)
- 🔒 Secure code execution via Judge0 API
- 📱 Responsive design for desktop & mobile

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Monaco Editor (`@monaco-editor/react`)
- Tailwind CSS
- Axios

**Backend**
- Node.js (Vercel Serverless Functions)
- Judge0 REST API

**Deployment**
- Vercel (Free Tier)
- GitHub (Version Control)

---

## 🏗 Architecture

```

User (Browser)
↓
React Frontend
↓
Vercel Serverless API
↓
Judge0 Code Execution Engine
↓
Execution Result → UI Output Console

```

---

## 📂 Project Structure

```

compilex/
│
├── src/
│   ├── components/
│   ├── App.jsx
│   └── main.jsx
│
├── api/
│   └── execute.js
│
├── public/
├── package.json
└── README.md

````

---

## ⚙ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/compilex.git
cd compilex
````

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```
RAPID_API_KEY=your_judge0_api_key
```

You can get a free API key from RapidAPI (Judge0 CE).

---

### 4️⃣ Run Locally

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🚀 Deployment (Vercel)

1. Push your project to GitHub
2. Go to [https://vercel.com](https://vercel.com) and import your repository
3. Add environment variable:

* `RAPID_API_KEY`

4. Click **Deploy**

Your application will be live instantly — like the demo at:
👉 [https://codecompilex.vercel.app/](https://codecompilex.vercel.app/)

---

## 🔐 Security Considerations

* Code execution is handled via external Judge0 API
* No direct server-side code compilation
* API key stored securely using environment variables
* Serverless architecture prevents long-running processes

---

## 📈 Future Enhancements

* User authentication
* Save code & execution history
* Code sharing via public links
* Docker-based isolated execution environment
* Custom test case support
* AI-powered code suggestions

---

## 📄 Resume Description

Developed **CompileX**, a cloud-based multi-language online compiler using React, Monaco Editor, and Vercel serverless functions. Integrated Judge0 API for secure real-time code execution with structured output rendering and a responsive UI design.

Live demo: [https://codecompilex.vercel.app/](https://codecompilex.vercel.app/)

---

## 👨‍💻 Author

Lokesh

---

## 📜 License

This project is licensed under the MIT License.

```

---

If you want, I can also add:

✨ Badge icons (Live, License, Build Status)  
✨ Screenshots section  
✨ Contribution guidelines  

Just holler macha 🔥💻
```
