# The Competitors Brigade website

Vite + React + Firebase (Auth, Firestore, Hosting).

## Run locally
    npm install
    npm run dev          # build with: npm run build

## Firebase console setup (once)
1. Authentication > Sign-in method > enable Google.
2. Firestore Database > create a database.
3. Deploy the security rules: `npm i -g firebase-tools`, `firebase login`, `firebase init` (reuse firebase.json), then `firebase deploy --only firestore:rules`.

## Add the first admin
In Firestore, create a collection `admins` and a document whose ID is your lowercase email (for example `you@school.edu`). Add any field. Repeat for each officer. Admins appear in the nav after signing in.

## Update results
Edit `src/data/leaderboards.js` (instructions at the top of the file), then redeploy. Delete the SAMPLE entries before launch. Search the project for `[` to find placeholder text to replace.

## Deploy
    npm run build && firebase deploy

To limit sign-in to a school domain, set `ALLOWED_EMAIL_DOMAIN` in `src/context/AuthContext.jsx`.
