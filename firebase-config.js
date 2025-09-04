// Firebase v9+ modular SDK config and initialization
// Replace the placeholders with your actual Firebase project config values.

// Load Firebase from CDN in HTML before this file:
// <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>

// Using compat to keep it simple in plain HTML without bundlers.

// eslint-disable-next-line no-var
var firebaseConfig = {
    apiKey: "AIzaSyDZ2xY7ibHUgbSmoPDMnu-HlrnahJEL5Zw",
    authDomain: "skillsweap.firebaseapp.com",
    projectId: "skillsweap",
    storageBucket: "skillsweap.firebasestorage.app",
    messagingSenderId: "1:759420022921:web:34e6874791464df7391658",
    appId: "G-WQEHGZ9CLN"
};

// Initialize Firebase app if not already initialized
// eslint-disable-next-line no-var
var firebaseApp = (window.firebase && firebase.apps && firebase.apps.length)
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);

// Expose auth instance
// eslint-disable-next-line no-var
var firebaseAuth = firebase.auth();


