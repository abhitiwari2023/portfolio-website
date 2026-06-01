# Portfolio Setup Guide

This site has two layers:

1. **Public site** ([index.html](index.html)) — what visitors see
2. **Admin panel** ([admin.html](admin.html)) — login-only dashboard where you edit everything

The site works out-of-the-box with **default content** (no setup needed). To enable the admin panel and persistent editing, you need to wire up Firebase (free, ~10 minutes).

---

## 1. Create a Firebase project

1. Go to **https://console.firebase.google.com** and click **Add project**
2. Name it anything (e.g. `abhi-portfolio`)
3. Disable Google Analytics (optional, not needed)
4. Wait for the project to be created

## 2. Add a Web app

1. In your Firebase project → click the **`</>` Web icon** ("Add app")
2. Name the app (e.g. `portfolio-site`), skip Firebase Hosting
3. Copy the `firebaseConfig` object Firebase shows you. It looks like:
   ```js
   {
     apiKey: "AIza...",
     authDomain: "abhi-portfolio.firebaseapp.com",
     projectId: "abhi-portfolio",
     storageBucket: "abhi-portfolio.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abc123"
   }
   ```

## 3. Paste your config

Open [`assets/js/firebase-config.js`](assets/js/firebase-config.js) and replace the placeholder values with your real ones. Then change:

```js
window.FIREBASE_ENABLED = false;
```

to:

```js
window.FIREBASE_ENABLED = true;
```

Also confirm `window.ADMIN_EMAIL` matches the email you'll use to log in.

## 4. Enable Google Sign-In

1. In Firebase Console → **Authentication** → **Get started**
2. Click **Sign-in method** tab → click **Google** → toggle **Enable**
3. Set the **Project support email** (your own email is fine) → **Save**
4. Done — no need to create user accounts. Anyone with the `ADMIN_EMAIL` Google account can log in; everyone else is rejected at sign-in.

## 5. Enable Firestore

1. In Firebase Console → **Firestore Database** → **Create database**
2. Choose **Start in production mode** → pick a region close to you (e.g. `asia-south1` for India)
3. After creation, go to the **Rules** tab and paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public site can read content
    match /site/{document=**} {
      allow read: if true;
      // Only the admin email can write
      allow write: if request.auth != null
                   && request.auth.token.email == "24.MCA.Abhi@gmail.com";
    }
  }
}
```

Change the email in the rule if you used a different admin email. Click **Publish**.

## 6. Add your domain to authorized origins

1. In Firebase Console → **Authentication** → **Settings** → **Authorized domains**
2. Add your site's domain (e.g. `abhitiwari2023.github.io`)
3. `localhost` is already allowed for local testing

## 7. Done — try it

1. Open `index.html` — site should look identical (defaults still showing)
2. Open `admin.html` → click **Sign in with Google** → choose your admin Google account
3. Edit anything, hit **Save** — refresh `index.html` and you'll see your changes live

> If you sign in with a non-admin Google account, you're immediately signed out with an error. To change the admin email, edit `ADMIN_EMAIL` in `assets/js/firebase-config.js` AND update the email in the Firestore security rules (step 5 above).

---

## Festival Themes

Themes auto-switch based on the date (see `assets/js/themes.js` for the date table):

| Festival         | Window         |
|------------------|----------------|
| 🇮🇳 Republic Day  | Jan 26         |
| 🎨 Holi          | ~Mar 13–15     |
| 🇮🇳 Independence  | Aug 15         |
| 🪔 Diwali        | ~Oct 19–23     |
| 🎄 Christmas     | Dec 24–26      |
| 🎆 New Year      | Dec 30 – Jan 2 |

**Holi and Diwali dates shift each year** — update the `FESTIVAL_DATES` table in `assets/js/themes.js` once a year.

From the admin panel → **🎨 Theme** tab you can also force a theme manually at any time, or switch back to "Auto".

---

## File map

```
portfolio-website/
├── index.html                  ← public site
├── admin.html                  ← admin login + dashboard
├── SETUP.md                    ← this file
├── profile.png
├── Abhishek_Tiwari_Resume.pdf
├── CNAME
└── assets/
    └── js/
        ├── firebase-config.js  ← YOU EDIT: paste your Firebase keys here
        ├── defaults.js          ← bundled fallback content
        ├── themes.js            ← festival theme palettes + dates
        ├── data-layer.js        ← Firestore read/write + auth
        ├── site.js              ← renders public site sections
        └── admin.js             ← admin panel UI + CRUD
```

## Admin features

- **Hero** — headline (4 word slots), tagline, stats counter
- **About** — title, subtitle, long bio, 3 highlight cards
- **Experience** — timeline of jobs (add/edit/remove)
- **Projects** — featured project + grid (add/edit/remove)
- **Skills** — categories with items (add/edit/remove)
- **Services** — service offerings (add/edit/remove)
- **Education** — degrees (add/edit/remove)
- **Achievements** — milestone cards
- **Testimonials** — quotes from clients/colleagues
- **Blog** — post listings with title/excerpt/date/URL
- **Contact** — phone, email, location, social URLs
- **Theme** — switch festival theme or force a specific one
- **Advanced** — export/import JSON backup, reset to defaults, view raw JSON

## Common tasks

**Hide a section**: leave its items empty in admin — the section still renders but with no cards. To remove the section entirely, comment out the `<section>` block in `index.html`.

**Change brand colors permanently**: edit `THEMES.default.vars` in `assets/js/themes.js`.

**Add a new festival**: extend `THEMES` and `FESTIVAL_DATES` in `assets/js/themes.js`.

**Backup**: admin → Advanced → Export JSON. Keep that file safe.

**Lost admin access**: from Firebase Console → Authentication, you can reset the password.
