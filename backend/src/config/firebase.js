const admin = require("firebase-admin");

// Debug help
console.log("Firebase ENV project_id =>", process.env.FIREBASE_PROJECT_ID);
console.log("Firebase ENV email      =>", process.env.FIREBASE_CLIENT_EMAIL);
console.log(
  "Firebase ENV key length =>",
  process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.length : "NO KEY"
);

if (!process.env.FIREBASE_PROJECT_ID) {
  throw new Error("❌ FIREBASE_PROJECT_ID missing in .env");
}
if (!process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error("❌ FIREBASE_CLIENT_EMAIL missing in .env");
}
if (!process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error("❌ FIREBASE_PRIVATE_KEY missing in .env");
}

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

console.log("🔥 Firebase Admin Initialized Successfully");

module.exports = firebaseApp;
