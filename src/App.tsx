import { useEffect, useMemo, useState } from "react";
import { portfolio } from "./lib/portfolio";

function decodeB64(v?: string): string {
  if (!v) return "";
  if (v.includes("@")) return v;
  try {
    return atob(v);
  } catch {
    return v;
  }
}

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const s = localStorage.getItem("theme");
      return s === "light" || s === "dark" ? (s as any) : "dark";
    } catch {
      return "dark";
    }
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const idsKey = ids.join(",");
  useEffect(() => {
    const list = idsKey.split(",");
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    list.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [idsKey]);
  return active;
}

const GROUP_TITLES: Record<string, string> = {
  systems: "Systems",
  networkWireless: "Network & Wireless",
  offensive: "Offensive Security",
  defensive: "Detection & Response",
  engineering: "Engineering & Automation",
  productivityResearch: "Docs & Research",
  programming: "Programming",
};

function setMeta(name: string, content: string, attr = "name") {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function App() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  const p: any = portfolio;
  const email = useMemo(() => decodeB64(p.profile?.email), [p.profile]);
  const telegram = useMemo(() => decodeB64(p.profile?.telegram), [p.profile]);

  const skillEntries: [string, string[]][] = useMemo(() => {
    const s = p.skills ?? {};
    return Object.entries(s).filter(([, v]) => Array.isArray(v) && (v as string[]).length > 0) as any;
  }, [p.skills]);

  const certifications: any[] = p.certifications ?? (p as any).Courses ?? [];

  const active = useActiveSection(["home", "experience", "skills", "projects", "contact"]);

  useEffect(() => {
    const title = p.seo?.title || `${p.profile?.name} — SOC Analyst & Penetration Tester`;
    const desc =
      p.seo?.description ||
      `${p.profile?.name}: 4 years in SOC, vulnerability assessment, penetration testing, red teaming and OSINT.`;
    document.title = title;
    setMeta("description", desc);
    setMeta("og:title", title, "property");
    setMeta("og:description", desc, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);
    if (p.seo?.canonical) {
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = p.seo.canonical;
    }
  }, [p.seo, p.profile]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const pct = doc.scrollHeight > doc.clientHeight ? (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100 : 0;
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <header className="nav">
        <div className="container nav-inner">
          <a href="#home" className="brand">
            <span className="brand-mark">AS</span>
            <span>{p.profile?.shortName || p.profile?.name}</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#home" className={active === "home" ? "active" : ""}>Home</a>
            <a href="#experience" className={active === "experience" ? "active" : ""}>Experience</a>
            <a href="#skills" className={active === "skills" ? "active" : ""}>Skills</a>
            <a href="#projects" className={active === "projects" ? "active" : ""}>Projects</a>
            <a href="#contact" className={active === "contact" ? "active" : ""}>Contact</a>
          </nav>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? "☀ light" : "☾ dark"}
            </button>
            <button className="hamburger" aria-label="Menu" onClick={() => setMobileOpen((v) => !v)}>
              <span />
            </button>
          </div>
        </div>
        <div className={`mobile-drawer ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen(false)}>
          <a href="#home">Home</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <style>{`@media(min-width:880px){.hamburger{display:none!important}}.nav-links{display:flex}@media(max-width:879px){.nav-links{display:none!important}}`}</style>
      </header>

      <main className="container">
        <section id="home" className="hero" aria-labelledby="home-heading">
          <div className="eyebrow">{(p.focus ?? []).join(" · ")}</div>
          <h1 id="home-heading">
            {p.profile?.name}
            <em>{p.profile?.title} — {p.profile?.location}</em>
          </h1>
          <p className="lead">{p.profile?.about}</p>
          <div className="hero-actions">
            <a className="btn btn-neon" href={`mailto:${email}`}>✉ {email}</a>
            <a className="btn" href="#skills">View skills</a>
          </div>
          <div className="tagrow">
            {(p.focus ?? []).map((f: string) => (
              <span key={f} className="pill neon">{f}</span>
            ))}
            <span className="pill">SOC · Blue Team · Research</span>
          </div>
        </section>

        <section id="experience" className="section" aria-labelledby="experience-heading">
          <div className="section-head">
            <h2 id="experience-heading">Experience <em>· SOC · Lab · Field</em></h2>
            <div className="section-sub">4 years · SOC · Network · Research</div>
          </div>
          <div className="card-grid">
            {(p.experience ?? []).map((e: any) => (
              <article key={e.id} className="card" aria-label={`${e.role} at ${e.org}`}>
                <div className="card-meta">{e.period}</div>
                <h3>{e.role}</h3>
                <p className="mono" style={{ fontSize: 12 }}>{e.org}</p>
                <ul>
                  {(e.points ?? []).map((pt: string) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section" aria-labelledby="education-heading">
          <div className="section-head">
            <h2 id="education-heading">Education & Recognition</h2>
          </div>
          <div className="card-grid two">
            {(p.education ?? []).map((e: any) => (
              <article key={e.id} className="card" aria-label={e.degree}>
                <div className="card-meta">{e.period}</div>
                <h3>{e.degree}</h3>
                <p>{e.school}</p>
              </article>
            ))}
            {(p.achievements ?? []).map((a: any) => (
              <article key={a.id} className="card" aria-label={a.title}>
                <div className="card-meta">{a.period}</div>
                <h3>{a.title}</h3>
                <p>{a.org}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section" aria-labelledby="skills-heading">
          <div className="section-head">
            <h2 id="skills-heading">Skills <em>· SOC · Pentest · Engineering</em></h2>
            <div className="section-sub">OSINT · Vulnerability assessment · Red teaming · Python · C++ · Wireless · Cloud</div>
          </div>
          <div className="card-grid two">
            {skillEntries.map(([key, items]) => (
              <article key={key} className="card" aria-label={GROUP_TITLES[key] ?? key}>
                <h3>{GROUP_TITLES[key] ?? key}</h3>
                <div className="tags">
                  {items.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="card-grid two" style={{ marginTop: 10 }}>
            <article className="card" aria-label="Certifications and courses">
              <h3>Certifications & Courses</h3>
              <div className="tags">
                {certifications.map((c: any) => (
                  <span key={c.id} className="tag neon">{c.name} — {c.issuer}</span>
                ))}
              </div>
            </article>
            <article className="card" aria-label="Languages">
              <h3>Languages</h3>
              <div className="tags">
                {(p.languages ?? []).map((l: any) => (
                  <span key={l.id} className="tag">
                    {l.name}{l.level ? ` — ${l.level}` : l.reading ? ` — R:${l.reading} W:${l.writing} S:${l.speaking}` : ""}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-heading">
          <div className="section-head">
            <h2 id="projects-heading">Research & Projects</h2>
            <div className="section-sub">Nuclei · WAF · Linux · RE</div>
          </div>
          <div className="card-grid two">
            {(p.projects ?? []).map((pr: any) => (
              <article key={pr.id} className="card" aria-label={pr.title}>
                <div className="card-meta">{pr.category}</div>
                <h3>{pr.title}</h3>
                <p>{pr.description}</p>
                <div className="tags">
                  {(pr.technologies ?? []).map((t: string) => (
                    <span key={t} className="tag neon">{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-heading">
          <div className="section-head">
            <h2 id="contact-heading">Contact</h2>
            <div className="section-sub">Proton Mail — open hire inquiries</div>
          </div>
          <div className="contact-box">
            <div className="mono" style={{ fontSize: 11, color: "var(--faint)", marginBottom: 6 }}>EMAIL — PROTON</div>
            <a className="email-link" href={`mailto:${email}`}>{email}</a>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <button className="btn btn-neon" onClick={copyEmail}>{copied ? "Copied ✓" : "Copy"}</button>
              <a className="btn" href={`mailto:${email}`}>Open mail →</a>
              {telegram && (
                <a className="btn" href={`https://t.me/${telegram}`} target="_blank" rel="noreferrer">Telegram: {telegram}</a>
              )}
            </div>
          </div>
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} {p.profile?.name} — minimal neon</span>
          <span>dark / light · data from portfolio.json</span>
        </footer>
      </main>
    </>
  );
}
