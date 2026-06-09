# Code-Arena

CodeArena is a social competitive coding platform where friends solve problems together, track stats from LeetCode, Codeforces, HackerRank, and GitHub, and grow through friendly competition.

Code-Arena is a MERN-style project in progress with a React frontend and a Node.js + Express backend. This repository includes initial frontend and backend scaffolding, sample API routes, and several Mongoose model skeletons.

## Current Progress (combined)

### Backend (implemented / in progress)

- Express server setup in `Backend/index.js`
- Environment variable loading with `dotenv`
- Base route: `GET /` -> returns `Code-Arena`
- Demo jokes API: `GET /api/jokes` -> returns a static jokes array
- MongoDB modeling started with Mongoose (feed + user domain schemas)
- Controllers, routes, and database wiring are partially implemented; many controllers and routes are placeholders
- Backend package setup with scripts: `npm run dev`, `npm start`

### Frontend (implemented / in progress)

- React + Vite project setup
- Tailwind integrated through Vite plugin
- API proxy configured in Vite: `/api` -> `http://localhost:3000`
- Pages created: Home, Login, Signup, Jokes
- `Jokes` page fetches backend data from `/api/jokes` using Axios
- Routing is imported but not yet active in `App.jsx`

## Tech Stack

- Frontend: React, Vite, Axios, React Router, TailwindCSS
- Backend: Node.js, Express, Mongoose, dotenv, bcryptjs, jsonwebtoken, cookie-parser, cors
- Database: MongoDB (schema layer in progress)

## Project Structure (overview)

```
Code-Arena/
  Backend/
    index.js
    app.js
    src/
      Models/
      Controllers/
      Routes/
      DataBase/
      Middlewares/
      Utils/
  Frontend/
    src/
      Pages/
      App.jsx
      main.jsx
```

## Local Setup

1) Clone

```bash
git clone https://github.com/krptonox/Code-Sphere.git
cd Code-Arena
```

2) Backend setup

```bash
cd Backend
npm install
```

Create `.env` in `Backend/` with:

```env
PORT=3000
```

Run backend:

```bash
npm run dev
```

3) Frontend setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend default: `http://localhost:5173`
Backend default: `http://localhost:3000`

## Next Steps (recommended)

- Connect MongoDB in backend startup flow
- Create auth APIs for signup/login
- Wire Mongoose models to controllers and routes
- Enable routing in frontend `App.jsx`
- Replace static jokes with DB-backed content
- Add validation/error handling for request bodies

## Notes

This README merges local and remote versions to preserve both concise and detailed project descriptions. Review and edit further as needed.
