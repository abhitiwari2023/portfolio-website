// Data layer — reads/writes site content from Firestore.
// Falls back to DEFAULT_CONTENT when Firebase is disabled or empty.
//
// Uses Firebase v10 modular SDK loaded via CDN.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
    getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult,
    signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
    getFirestore, doc, getDoc, setDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const CONTENT_DOC = { collection: 'site', id: 'content' };

let app, auth, db, ready = false;

function tryInit() {
    if (!window.FIREBASE_ENABLED) return false;
    const cfg = window.FIREBASE_CONFIG;
    if (!cfg || cfg.apiKey === 'YOUR_API_KEY') return false;
    try {
        app = initializeApp(cfg);
        auth = getAuth(app);
        db = getFirestore(app);
        ready = true;
        return true;
    } catch (e) {
        console.error('Firebase init failed:', e);
        return false;
    }
}

async function loadContent() {
    if (!ready) return window.DEFAULT_CONTENT;
    try {
        const snap = await getDoc(doc(db, CONTENT_DOC.collection, CONTENT_DOC.id));
        if (!snap.exists()) return window.DEFAULT_CONTENT;
        const data = snap.data();
        // shallow-merge defaults so missing keys don't break rendering
        return { ...window.DEFAULT_CONTENT, ...data };
    } catch (e) {
        console.warn('Firestore load failed, using defaults:', e);
        return window.DEFAULT_CONTENT;
    }
}

function subscribeContent(onChange) {
    if (!ready) { onChange(window.DEFAULT_CONTENT); return () => {}; }
    return onSnapshot(doc(db, CONTENT_DOC.collection, CONTENT_DOC.id), (snap) => {
        const data = snap.exists() ? snap.data() : {};
        onChange({ ...window.DEFAULT_CONTENT, ...data });
    }, (e) => {
        console.warn('Firestore subscribe error:', e);
        onChange(window.DEFAULT_CONTENT);
    });
}

async function saveContent(data) {
    if (!ready) throw new Error('Firebase not configured');
    await setDoc(doc(db, CONTENT_DOC.collection, CONTENT_DOC.id), data, { merge: true });
}

async function adminLogin() {
    if (!ready) throw new Error('Firebase not configured. Edit assets/js/firebase-config.js first.');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    // Try popup first (faster UX). If browser blocks it (mobile / strict COOP), fall back to redirect.
    try {
        const result = await signInWithPopup(auth, provider);
        if (result.user.email.toLowerCase() !== window.ADMIN_EMAIL.toLowerCase()) {
            await signOut(auth);
            throw new Error(`Only ${window.ADMIN_EMAIL} can sign in to admin.`);
        }
        return result;
    } catch (err) {
        const fallbackCodes = ['auth/popup-blocked', 'auth/popup-closed-by-user', 'auth/cancelled-popup-request', 'auth/operation-not-supported-in-this-environment'];
        if (fallbackCodes.includes(err.code)) {
            await signInWithRedirect(auth, provider);
            return; // page will reload after Google redirects back
        }
        throw err;
    }
}

// On page load, check if we're returning from a redirect-based sign-in.
async function consumeRedirectResult() {
    if (!ready) return null;
    try {
        const result = await getRedirectResult(auth);
        if (!result) return null;
        if (result.user.email.toLowerCase() !== window.ADMIN_EMAIL.toLowerCase()) {
            await signOut(auth);
            throw new Error(`Only ${window.ADMIN_EMAIL} can sign in to admin.`);
        }
        return result;
    } catch (e) {
        console.warn('Redirect result error:', e);
        return null;
    }
}

async function adminLogout() {
    if (!ready) return;
    return signOut(auth);
}

function onAuthChange(cb) {
    if (!ready) { cb(null); return () => {}; }
    return onAuthStateChanged(auth, cb);
}

// Theme-meta persistence (admin override + custom festival overrides)
async function loadThemeMeta() {
    if (!ready) return { override: null };
    try {
        const snap = await getDoc(doc(db, 'site', 'theme'));
        return snap.exists() ? snap.data() : { override: null };
    } catch { return { override: null }; }
}

async function saveThemeMeta(meta) {
    if (!ready) throw new Error('Firebase not configured');
    await setDoc(doc(db, 'site', 'theme'), meta, { merge: true });
}

tryInit();

window.PortfolioData = {
    isReady: () => ready,
    loadContent,
    subscribeContent,
    saveContent,
    adminLogin,
    consumeRedirectResult,
    adminLogout,
    onAuthChange,
    loadThemeMeta,
    saveThemeMeta,
};
