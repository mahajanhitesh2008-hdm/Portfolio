# Hitesh Mahajan — Personal Developer Portfolio

A clean, modern, elegant, and responsive personal portfolio website for **Hitesh Mahajan**, built with semantic **HTML5**, **CSS3**, and **Vanilla JavaScript** (Zero external dependencies or build tools, lightweight, fast, and GitHub Pages ready).

---

## 📁 Project Structure

```text
Hit_Portfolio/
│
├── index.html       # Complete semantic HTML5 structure
├── style.css        # Minimalist light theme, responsive CSS, modal & chatbot styling
├── script.js        # Vanilla JS for chatbot, resume modal, typing animation, & nav
├── serve.ps1        # Built-in lightweight local PowerShell server (Zero setup needed)
├── README.md        # Documentation and guide
└── assets/          # Directory for your photo, resume PDF, and media assets
    ├── README.md
    ├── hitesh.jpg                   (Upload your profile photo here)
    └── hitesh-mahajan-resume.pdf    (Upload your resume PDF here)
```

---

## 🚀 How to Run Locally

You can preview and run the website immediately using the included lightweight local server:

### Option 1: Using the Included PowerShell Server (Recommended)
Open PowerShell in the `Hit_Portfolio` folder and run:
```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1 -Port 8080
```
Then visit: **[http://localhost:8080/](http://localhost:8080/)**

### Option 2: Direct File Opening
Double-click `index.html` or open it with Google Chrome / Microsoft Edge.

### Option 3: VS Code Live Server
Open the folder in VS Code, right-click `index.html`, and select **"Open with Live Server"**.

---

## 📸 1. How to Upload Your Personal Photo

1. Prepare your photo in `.jpg` or `.png` format.
2. Save it directly inside the `assets/` folder with the filename:
   ```text
   assets/hitesh.jpg
   ```
3. Refresh your browser! The photo will automatically appear in the hero frame with a clean circular border.
4. *(Note: While no photo is present, the website automatically displays an elegant fallback monogram card with your initials and student details).*

---

## 📄 2. How to Upload and Activate Your Resume

1. Save your completed resume PDF in the `assets/` folder with the filename:
   ```text
   assets/hitesh-mahajan-resume.pdf
   ```
2. Open `script.js` in any text editor and look at lines 15–23:
   ```javascript
   const RESUME_CONFIG = {
     isAvailable: true, // <-- Change false to true!
     pdfPath: 'assets/hitesh-mahajan-resume.pdf',
     downloadFileName: 'Hitesh-Mahajan-Resume.pdf'
   };
   ```
3. Save `script.js`.
4. Now, whenever visitors click the **"Download Resume"** button in the hero section, it will instantly download your PDF as `Hitesh-Mahajan-Resume.pdf`.
5. *(While `isAvailable` is `false`, clicking the button opens a professional "My Resume is Coming Soon!" modal dialog).*

---

## 💬 3. How to Customize the "Ask Hitesh" Chatbot

The chatbot runs 100% locally in your browser using pure JavaScript (no API keys, no backend, and total visitor privacy).

- **To add new question answers:**
  Open `script.js` and locate the `getBotResponse(question)` function. Add new conditions:
  ```javascript
  if (q.includes('internship') || q.includes('experience')) {
    return "Hitesh is currently a second-year student open to software development internship opportunities!";
  }
  ```
- **To add or update suggested questions:**
  Open `index.html` and look for `<div class="suggestions-pills" id="suggestions-pills">`. You can add new `<button>` tags with the `data-question` attribute.

---

## 🔗 4. Social & Coding Profiles Included

In the **Contact** section, the following official profiles are displayed in a neat, responsive row with recognized logos and tooltips:
- **GitHub:** `https://github.com/hiteshmahajan2008-hdm`
- **LinkedIn:** `https://www.linkedin.com/in/hitesh-mahajan-477370443/`
- **CodeChef:** `https://www.codechef.com/users/rcpit251109084`

---

## 🌐 5. Publishing to GitHub Pages (Free Hosting)

1. **Initialize Git and Commit:**
   ```bash
   git init
   git add .
   git commit -m "Update portfolio with photo frame, chatbot, and resume modal"
   ```

2. **Add Your GitHub Remote and Push:**
   ```bash
   git remote add origin https://github.com/hiteshmahajan2008-hdm/<YOUR-REPO-NAME>.git
   git branch -M main
   git push -u origin main
   ```

3. **Turn on GitHub Pages:**
   - In your repository, go to **Settings** > **Pages**.
   - Under **Build and deployment**, select **Branch: main** and folder **/ (root)**.
   - Click **Save**. Your website will be live in 1–2 minutes!

---

## 📄 License & Ownership
Created for **Hitesh Mahajan** (Second-Year Information Technology Student, R.C. Patel Institute of Technology, Shirpur).
