# Khushi Kushwaha — Personal Portfolio

A modern, professional portfolio website built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript**.  
No frameworks. No build tools. No backend. Just open `index.html` and go.

---

## 🚀 Quick Start

```bash
# Option 1 — open directly in a browser
Double-click index.html

# Option 2 — use VS Code Live Server extension (recommended for development)
Right-click index.html → "Open with Live Server"

# Option 3 — Python local server
python -m http.server 8000
# then open http://localhost:8000
```

---

## 📁 File Structure

```
portfolio/
│
├── index.html          ← All page sections / semantic HTML
├── style.css           ← All styles, themes, animations, responsive
├── script.js           ← All JavaScript features
│
├── assets/
│   ├── profile.jpg     ← YOUR profile photo (replace this)
│   ├── resume.pdf      ← YOUR resume PDF (replace this)
│   └── projects/       ← Optional project screenshots
│       ├── project1.png
│       ├── project2.png
│       └── ...
│
└── README.md
```

---

## ✏️ Personalisation Checklist

Search for `<!-- REPLACE` comments in `index.html` and `// REPLACE` comments in `script.js`.  
Every item below maps to one of those comments.

### Personal Info

| What | Where | What to Change |
|------|-------|----------------|
| GitHub URL | `index.html` — hero socials, contact, footer | `https://github.com/khushikushwaha` → your URL |
| LinkedIn URL | `index.html` — hero socials, resume, contact, footer | `https://linkedin.com/in/khushikushwaha` → your URL |
| Email address | `index.html` — contact section + footer | `khushi@example.com` → your email |
| Location | `index.html` — contact section | `India` → your city/state |
| Profile image | `assets/profile.jpg` | Replace file with your photo (keep same filename) |
| Resume | `assets/resume.pdf` | Replace file with your PDF (keep same filename) |
| GitHub username | `script.js` — `CONFIG.githubUsername` | `'khushikushwaha'` → your username |
| Contact email fallback | `script.js` — `CONFIG.contactEmail` | `'khushi@example.com'` → your email |

### Projects

Each project card in `index.html` has this structure — replace the placeholder values:

```html
<article class="project-card reveal" data-category="fullstack">
  <!--
    data-category options: web | javascript | fullstack | other
    Change the gradient in style="" to personalise the thumbnail colour.
    OR swap the <div class="project-thumb-icon"> for an <img> tag.
  -->
  <div class="project-thumb" style="--grad: linear-gradient(...)">
    <div class="project-thumb-icon">🛒</div>
    <!-- OR: <img src="assets/projects/project1.png" alt="..." loading="lazy" /> -->
  </div>
  <div class="project-body">
    <h3 class="project-name">YOUR PROJECT NAME</h3>
    <p class="project-problem"><strong>Problem:</strong> ...</p>
    <p class="project-solution"><strong>Solution:</strong> ...</p>
    <div class="project-tech">
      <span class="tech-tag">React</span>
      <!-- add/remove tech tags -->
    </div>
    <div class="project-links">
      <a href="https://github.com/YOU/REPO" ...>GitHub</a>
      <a href="https://your-live-demo.com" ...>Live Demo</a>
    </div>
  </div>
</article>
```

To **add a new project**, copy any `<article class="project-card ...">` block and paste it inside `<div class="projects-grid" id="projectsGrid">`.

To **add a new filter category**, add a button inside `.project-filters`:

```html
<button class="filter-btn" data-filter="yourCategory">Your Label</button>
```

Then set `data-category="yourCategory"` on the project card.

### Achievements & Certifications

Each card in the Achievements section follows this pattern:

```html
<div class="achievement-card reveal">
  <div class="achievement-icon">🏅</div>
  <div class="achievement-body">
    <span class="achievement-type">Certification</span>  <!-- or Hackathon / Internship -->
    <h3>Your Certification Name</h3>
    <p>Issuing Org · Month Year</p>
    <p class="achievement-desc">Brief description.</p>
  </div>
  <a href="https://link-to-certificate" class="achievement-link">View →</a>
</div>
```

### Experience / Timeline

Each timeline entry:

```html
<div class="timeline-item reveal">
  <div class="timeline-dot"></div>
  <div class="timeline-content">
    <div class="timeline-header">
      <h3>Role / Degree Title</h3>
      <span class="timeline-date">2022 — Present</span>
    </div>
    <p class="timeline-org">Organisation / Platform</p>
    <p class="timeline-desc">What you did / learned.</p>
    <div class="timeline-tags">
      <span>Skill</span>
      <span>Another Skill</span>
    </div>
  </div>
</div>
```

### Typing Animation Roles

In `script.js`, edit the `CONFIG` object at the top:

```js
const CONFIG = {
  githubUsername: 'your-username',

  typingRoles: [
    'B.Tech CSE Student',
    'Aspiring Software Developer',
    // add or remove roles here
  ],

  typeSpeed:   80,   // ms per character typed
  deleteSpeed: 45,   // ms per character deleted
  pauseAfterType:   1800,  // pause before deleting (ms)
  pauseAfterDelete: 400,   // pause before typing next (ms)
};
```

### Colour Theme

All colours are CSS variables in `style.css` — edit the `:root` block:

```css
:root {
  --clr-accent-1:    #6c63ff;   /* primary purple-blue */
  --clr-accent-2:    #4f9eff;   /* sky blue highlight  */
  --clr-accent-3:    #a78bfa;   /* soft violet         */
  --clr-accent-grad: linear-gradient(135deg, var(--clr-accent-1), var(--clr-accent-2));
  /* ... */
}
```

Change `--clr-accent-1` and `--clr-accent-2` to any two colours and the entire palette updates automatically.

---

## 📬 Contact Form Setup

The form supports two modes — choose one:

### Option A — Formspree (recommended, free tier available)

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form → copy your endpoint URL (looks like `https://formspree.io/f/xabcdefg`)
3. In `index.html`, find the `<form>` tag and update the `action`:

```html
<form
  class="contact-form"
  id="contactForm"
  action="https://formspree.io/f/xabcdefg"   ← paste your endpoint here
  ...
>
```

Done — the JS will automatically detect the Formspree URL and submit via `fetch`.

### Option B — mailto fallback (zero setup)

Leave the form `action` as-is (containing `YOUR_FORM_ID`).  
The JS detects this and opens the user's email client with a pre-filled message.  
Update `CONFIG.contactEmail` in `script.js` with your email address.

---

## 🌐 Deployment

### Vercel (recommended)

```bash
# Option 1 — drag & drop
Go to vercel.com → New Project → drag the portfolio folder

# Option 2 — Vercel CLI
npm i -g vercel
vercel   # run from the portfolio folder
```

### GitHub Pages

1. Push the folder contents to a GitHub repository
2. Go to repo **Settings → Pages**
3. Set source to **Deploy from a branch → main → / (root)**
4. Your site will be live at `https://yourusername.github.io/repo-name`

### Netlify

Drag the folder to [app.netlify.com/drop](https://app.netlify.com/drop) — instant deploy.

---

## ✨ Features

| Feature | Implementation |
|---------|---------------|
| Dark / Light theme | CSS variables + `localStorage` |
| Sticky navbar | `scroll` event + `classList.toggle` |
| Hide navbar on scroll down | Scroll direction detection |
| Mobile menu | Hamburger toggle + `aria-expanded` |
| Typing animation | Vanilla JS state machine |
| Scroll reveal | `IntersectionObserver` |
| Active nav link | `IntersectionObserver` per section |
| Project filtering | `data-category` + `classList.toggle('hidden')` |
| Skill bar animation | `IntersectionObserver` + CSS `transition` |
| GitHub stats | Public GitHub REST API v3 (no auth) |
| Contribution grid | Randomly weighted decorative grid |
| Contact form | Client-side validation + Formspree / mailto |
| Back to top | Scroll position check + smooth scroll |
| Responsive | CSS Grid + Flexbox + `clamp()` typography |
| Accessibility | Semantic HTML, ARIA roles, focus-visible, reduced-motion |
| SEO | `<title>`, meta description, Open Graph, Twitter Card |

---

## 🛠 Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).  
Uses `IntersectionObserver` (supported everywhere since 2019) and CSS custom properties.  
No polyfills required.

---

## 📄 License

Free to use and modify for personal portfolio purposes.  
If you find it helpful, a ⭐ on GitHub is always appreciated!

---

*Built with ❤️ — Khushi Kushwaha*
