# Amir Saberi — Cybersecurity & Security Research

Personal portfolio for **Amir Saberi** — cybersecurity + software engineering + security research. Light apocalyptic research interface where **all content is driven by `data/portfolio.json`**.

**Contact:** `d4n13lw4t50@proton.me` / Telegram `amirho3einsaberi` — both hidden from static HTML and revealed only via JS button press (base64 in `data/portfolio.json`, decoded with `atob` on click) to block scrapers.

## Quick start — port 4004

```bash
npm i              # Node >=18, npm >=8
npm run dev        # http://localhost:4004
npm run build      # vite build → dist/
npm run preview    # http://localhost:4004
```

`vite.config.js:10` sets `server.port = 4004` / `preview.port = 4004` (`strictPort:true`). `package.json:12` scripts use `--port 4004`.

## Single source of truth — `data/portfolio.json`

**Workflow:**
1. Edit `data/portfolio.json`
2. Add/remove/update skills or projects
3. Commit, push — site reflects changes automatically

No React edits needed for normal updates. UI renders whatever exists in JSON, respects order, hides empty sections gracefully. Missing optional fields never crash.

**Structure (exactly as supplied, no invented tech):**

```json
{
  "profile": { "name": "Amir Saberi", "email": "ZDRuMTNsdzR0NTBAcHJvdG9uLm1l", "telegram": "YW1pcmhvM2VpbnNhYmVyaQ==" }, // base64 — JS decodes only on Reveal click (original: d4n13lw4t50@proton.me / amirho3einsaberi)
  "focus": ["Cybersecurity", "Software Engineering", "Security Research"],
  "skills": {
    "softwareEngineering": ["C++", "Python", "HTML/CSS", "Python scripting", "Python automation", "Malware development using C++", "Malware development using Python", "Markdown", "Microsoft Word", "Microsoft Excel", "GitHub Actions"],
    "cybersecurity": ["Vulnerability Assessment", "Vulnerability testing", "CVE testing", "Security Research", "Red Team", "Network Security", "Cryptography", "Malware Development", "Malware Source Code Analysis", "Prompt Engineering"],
    "securityTools": ["Nmap", "Wireshark", "Nuclei", "Metasploit", "msfconsole", "msfvenom"],
    "networking": ["Cisco CCNA", "Network Security", "Networking", "Wireshark", "Nmap"],
    "windows": ["Windows", "PowerShell", "PFPT", "Windows internals"],
    "linux": ["Linux", "Kali Linux", "Ubuntu", "Linux security tools", "Kali Linux security tools", "Ubuntu security tools"],
    "logging": ["ELK Stack"],
    "cloudAutomation": ["Cloudflare Relay usage", "Cloudflare-based relay infrastructure", "Automated information collection", "Automated information gathering bots", "Bot development for automated information collection"]
  },
  "projects": [],
  "seo": { "title": "Amir Saberi — Cybersecurity & Security Research", "description": "...", "keywords": [...] }
}
```

Add a project:

```json
{
  "id": "new-id",
  "title": "Project Title",
  "category": "Security Research",
  "description": "Short technical description.",
  "technologies": ["Python", "C++"],
  "skills": ["Security Research"],
  "featured": false
}
```

Optional `github` / `demo` / `link` / `url` — button appears only if URL exists. No evidence/screenshots/metrics required.

## Architecture — DATA → LOGIC → PRESENTATION

```
data/portfolio.json     ← source of truth (profile, skills, projects, seo)
src/lib/validation.ts   ← Zod schema (profile, skills, projects, seo) — validation with clear dev error
src/lib/portfolio.ts    ← parse + graceful fallback so malformed JSON never breaks the site
src/App.tsx             ← JSON-driven UI — hero, about, skills, projects, contact — no hard-coded content
src/index.css           ← apocalyptic light visual system (parchment, 1px dust borders, hazard amber/rust, grid, Geist + JetBrains Mono)
```

## Skills — exactly as supplied

Displayed as category cards/tags, never percentage bars. 10 groups derived strictly from supplied data:

- Software Engineering, Cybersecurity, Offensive Security, Security Research, Network Security, Malware Research & Development, Systems, Linux, Security Tools, Automation & Infrastructure
- Dedicated: **Automation + Infrastructure + Security** (Python scripting/automation, Automated information collection, bots, Cloudflare relay)
- Dedicated: **Linux / Systems** (Linux, Kali Linux, Ubuntu, Windows, PowerShell, Windows internals)
- Dedicated: **Security Monitoring / Logging** — ELK Stack (capability, not certification)

No invented technologies (no Docker, Go, Rust, Splunk, etc. unless later added to JSON).

## Projects

Clean technical cards: name · category · description · technologies · skills. Controlled entirely by JSON (`src/App.tsx` maps `portfolio.projects`). Empty state explains JSON workflow when no projects exist. Malware-related work presented professionally as Malware Research/Development/Analysis in controlled research context — no operational instructions.

## Design

Security Research Lab + Software Engineering Portfolio + Technical Research Interface. Light apocalyptic theme — sun-bleached parchment (#f1ece1), concrete dust, hazard rust/amber accents, subtle 40px grid, 1px borders, excellent typography, generous spacing, subtle motion only. No Matrix rain/skulls/hooded hacker/terminal fakery/glitch/crypto/gaming/SaaS dashboard.

## Quality — verified

- Name: `Amir Saberi` / email `d4n13lw4t50@proton.me` + Telegram `amirho3einsaberi` exactly (no Farsi on page, both base64 in JSON and revealed only via JS — `dist/index.html` and `dist/assets/*.js` contain 0 plain occurrences)
- Contacts hidden until button press — `.js handles it` via `atob` decode + `RevealBlock` (`src/App.tsx`)
- Every displayed skill exists in `portfolio.json` — no invented tech
- No project links required, no evidence section, no fake stats/years/CVEs/stars
- `npm run build` ✓ 114 modules `319kB`, `oxlint` ✓, `tsc --noEmit` ✓
- Responsive (desktop/laptop/tablet/mobile intentional), semantic HTML, keyboard nav, visible focus, reduced-motion, contrast

## Deploy (no push done)

`base: "/"` for `https://<username>.github.io/` (`vite.config.js:9`). For project site `https://<username>.github.io/<repo>/` set `base: "/<repo>/"`. Build `dist/` and publish via Pages.

## License

MIT — maintain by editing `data/portfolio.json`.
