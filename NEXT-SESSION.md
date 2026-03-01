# Next Session Context — Neil Joseph Portfolio

## What was built this session

### Contact Section (fully rebuilt)
The contact section now has a **two-column layout**:
- **Left column** — contact info cards (location tags + LinkedIn)
- **Right column** — a working contact form

#### Contact Info Cards
- Location card: label `OPEN TO WORK`, inline cyan tags: `Delhi-NCR · Remote · Worldwide`
- LinkedIn card: official LinkedIn SVG logo (brand blue `#0A66C2`, permanent), label `LinkedIn`, value `Want to connect?`
- Email and GitHub links were removed

#### Contact Form (right column)
Fields: Name (maxlength 100), Email, Subject (dropdown), Message (maxlength 3000)

Subject dropdown options:
1. Request CV
2. Job Opportunity
3. Freelance / Consulting
4. Invite me for a Talk
5. Request a Collaboration
6. Just saying hi

**Backend:** Formspree — endpoint `https://formspree.io/f/xqedobqa`

**Spam protection:** Honeypot field (`name="_gotcha"`, hidden via `style="display:none"` inline). Client-side check in JS + Formspree server-side `_gotcha` check.

**On submit behaviour:** Form hides via JS (`display:none`), success div (`#cfSuccess`) has `hidden` attribute removed and `.visible` class added → fades in with CSS animation. No popup, no redirect.

**Bug that was fixed:** Originally the honeypot and success state were hidden/shown purely via CSS (`position:absolute`, `opacity:0`, `inset:0`). On the live site the browser served cached old CSS (without form styles), so the honeypot was visible and the success state rendered below the form in document flow. Fixed by:
- Honeypot: `style="display:none"` directly in HTML
- Success state: `hidden` HTML attribute by default; JS removes it on success and hides the form

---

## Current file structure
```
neiljo10.github.io/
├── index.html        — single-page portfolio, all content
├── css/
│   └── styles.css    — all styles (tokens, nav, sections, form, responsive)
├── js/
│   └── main.js       — nav scroll, reveal, hamburger, exp tabs, prof bars, contact form
├── photo.jpeg        — Neil's profile photo
├── Resume.pdf        — source of all resume data
└── README.md         — repo readme (created via GitHub UI)
```

---

## What to build next — AI Feature

We discussed four ideas. Neil liked all of them but paused to handle another project first.

### The four ideas ranked by impressiveness / on-brand fit:

**1. AI-Powered Interactive Terminal** ⭐ Most on-brand
- The terminal widget in the hero section (currently static JSON display) becomes interactive
- Visitors type real commands: `./skills`, `./experience`, `ask "what makes Neil different?"`
- Claude responds in character, in terminal style
- Instantly memorable, shows off Neil's AI knowledge by demonstration

**2. Chat with My Resume**
- Floating chat widget, anywhere on the page
- Claude pre-primed with Neil's full resume as system context
- Visitors ask natural questions: "Is he open to Dubai roles?", "What's his management style?"
- Answers as Neil in first person

**3. Job Fit Analyzer**
- Recruiter pastes a job description
- AI outputs structured match: matching skills, relevant experience, any gaps
- Most practical for the target audience (hiring managers / recruiters)

**4. Personalized Pitch Generator**
- Visitor picks context (hiring / collaborating / speaking invite)
- AI writes a tailored 3-sentence pitch
- Short, interactive, immediately useful

### Implementation constraint to resolve first
All four require calling an AI API. **The API key cannot live in the frontend HTML** (public GitHub repo). Options:
- **Cloudflare Worker** (free tier, zero config, stays closest to static-site spirit)
- **Vercel serverless function** (would require moving hosting from GitHub Pages to Vercel)
- **Netlify function** (same trade-off as Vercel)

Neil needs to decide: stay on GitHub Pages + add a Cloudflare Worker proxy, or move hosting to Vercel/Netlify for a fully integrated serverless setup.

---

## Neil's data (quick reference)
- **Name:** Neil Joseph
- **Email (private):** offwork03@gmail.com
- **Location:** New Delhi, India (also mentions Dubai/UAE in resume)
- **Experience:** 7 years at Unisys — Sr. Engineer, Product Owner, Scrum Master
- **Cert:** CSM (Scrum Alliance), Apr 2023–Apr 2027, ID 001515646
- **Education:** M.Tech BITS Pilani (2021–2023), B.Tech CHRIST University (2015–2019)
- **GitHub:** github.com/neiljo10
- **LinkedIn:** linkedin.com/in/neil-j-3a4693137/

## Design tokens (for reference)
- `--cyan: #00b4d8`, `--cyan-d: #0090b0`
- `--ink: #0d1117`, `--ink2: #1e2636`
- `--bg: #f4f6fb`, `--white: #ffffff`
- Fonts: Space Mono (mono), DM Sans (sans), Syne (display)
- Contact section background: `var(--ink2)` = `#1e2636`
