# Aniket Saindre – Portfolio (MongoDB, Express.js, React, Node.js)

React (Vite) front end + Express API (Vercel serverless function in `api/index.js`) + MongoDB Atlas for contact form messages.

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env` and paste your MongoDB Atlas connection string.
3. Terminal 1: `npm run api`   Terminal 2: `npm run dev`  → open http://localhost:5173

## Deploy on Vercel
1. Create a free cluster at mongodb.com/atlas. Under Network Access allow `0.0.0.0/0`, then copy the connection string.
2. Push this folder to a GitHub repository.
3. On vercel.com choose Add New → Project → import the repository (framework is detected as Vite).
4. Under Environment Variables add `MONGODB_URI` with your connection string, then Deploy.

## Things to edit
- `src/App.jsx` → the `ME` object at the top (set your real GitHub link) and the content arrays.
- `public/Aniket_Saindre_Resume.pdf` → replace the file with a newer resume, keeping the same name.
