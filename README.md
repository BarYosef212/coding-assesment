# AI Crypto Advisor

A full‑stack application that aggregates crypto news and prices, provides AI‑powered insights, and stores user preferences and feedback.

---

## Screenshots

<p float="left">
  <img src="/assets/project-img1.png" width="300" />
  <img src="/assets/project-img2.png" width="300" /> 
</p>

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [AI Tools Usage](#ai-tools-usage)
- [Database Access](#database-access)
- [Bonus](#bonus)


---

## Demo

Live demo

- App (live): https://online-coding-assesment-production.up.railway.app/login

- **Demo Example:**  
  [Click to watch the demo](/assets/demo.mp4)

---

## Features

- User authentication (signup / login) using JWT
- Onboarding flow to save user preferences
- Dashboard with:
  - Crypto news (CryptoPanic)
  - Coin prices (CoinGecko)
  - Daily AI insight (HuggingFace)
  - Crypto memes (Reddit)
- Feedback system (thumbs up / down)
- User-specific data persisted in MongoDB

---

## Tech Stack

- Frontend: React 18, Vite, React Router
- Backend: Node.js, Express (ES Modules)
- Database: MongoDB (Mongoose)
- Auth: JWT
- APIs: CoinGecko, CryptoPanic, Reddit, HuggingFace
- Dev tools: npm, Docker (optional)

---

## Project Structure

### 📁 Project Structure

```text
project-root/
├── client/                 # React (Vite) Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.cjs
│   ├── tailwind.config.cjs
│   └── vite.config.js
│
├── server/                 # Node.js (Express) Backend
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js          # Express app configuration
│   │   └── server.js       # Server entry point
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```
---

## Environment Variables

### Client (.env)

| Variable     | Description                                               |
| ------------ | --------------------------------------------------------- |
| VITE_API_URL | Base URL for the backend API (e.g. http://localhost:3001) |

Example

```env
VITE_API_URL=http://localhost:3001
```

### Server (.env)

| Variable              | Description                                       |
| --------------------- | ------------------------------------------------- |
| NODE_ENV              | Environment mode: development or production       |
| PORT                  | Server port (optional, defaults to 3001)          |
| MONGO_URI             | MongoDB connection string                         |
| JWT_SECRET            | Secret used to sign JWTs                          |
| CRYPTOPANIC_API_KEY   | API key for CryptoPanic (news)                    |
| COINMARKETCAP_API_KEY | (Optional) API key for CoinMarketCap (price data) |
| HF_API_KEY            | Hugging Face API token for AI insights            |
| REDDIT_CLIENT_ID      | (Optional) Reddit client ID for fetching memes    |
| REDDIT_CLIENT_SECRET  | (Optional) Reddit client secret                   |

Example

```env
NODE_ENV=development
PORT=3001
MONGO_URI=mongodb+srv://user:pass@cluster.example.mongodb.net/dbname
JWT_SECRET=your_jwt_secret
CRYPTOPANIC_API_KEY=your_cryptopanic_key
HF_API_KEY=your_hf_api_key
```
---

## Setup

Prerequisites: Node.js (v18+), MongoDB (local or cloud), npm

1. Clone

```bash
git clone https://github.com/BarYosef212/coding-assesment.git
cd coding-assesment
```

2. Backend

```bash
cd server
npm install
npm run dev
```


The Express API will run at: http://localhost:3001

3. Frontend (new terminal)

```bash
cd client
npm install
npm run dev
```

The React app will run at: http://localhost:5173

<div style="border:2px solid #f00; padding: 10px; background-color:#ffe6e6;">
  ⚠️ <strong>WARNING:</strong> This project will not run without the env files both for client and server
</div>

---


## API Endpoints (overview)

Auth

- POST /api/auth/signup — register
- POST /api/auth/login — login

Onboarding

- POST /api/onboarding — save preferences (auth)
- GET /api/onboarding — get preferences (auth)

Dashboard

- GET /api/dashboard — news, prices (auth)
- GET /api/dashboard/ai — AI insight (auth)

Feedback

- POST /api/feedback — submit feedback (auth)
- GET /api/feedback — list feedback (auth)

---

## Usage

- Sign up or log in.
- Complete onboarding to set preferences.
- Open Dashboard to view prices, news, AI insight and memes.
- Use feedback controls to rate content.
- The app will fetch external APIs server-side; ensure API keys (if required) are set in server .env.

---

## AI Tools Usage

During this assignment, I used the following AI tools:

- **ChatGPT:** Assisted in writing README.md, explaining environment setup, and deployment guidance.
- **GitHub Copilot:** Suggested code snippets in React and Node.js.
- **Cursor:** Helped with code navigation, editing in the IDE, and initializing the project.

These tools helped me streamline the workflow, debug faster, and better understand the project process.

---

## Database Access

- The backend connects to MongoDB using the environment variable `MONGO_DB_URI`.
- The database stores users, onboardings and feedbacks.

---

## Bonus: Using Feedback for Future Improvements

- The app can save feedback from users, like which answers were correct or where users struggled.
- This data could later be used to train or improve an AI model to provide smarter insight, better news, or personalized recommendations.
