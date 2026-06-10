import { useEffect, useState } from "react";
import { AgentPlan } from "./components/ui/agent-plan";
import { RevealImageList } from "./components/ui/reveal-images";
import { SectionWithMockup } from "./components/ui/section-with-mockup";
import { ShaderAnimation } from "./components/ui/shader-lines";
import { content, type Lang } from "./i18n";

type Theme = "dark" | "light";

function getStoredLang(): Lang {
  const saved = window.localStorage.getItem("lang");
  return saved === "ru" || saved === "en" ? saved : "en";
}

function getStoredTheme(): Theme {
  const saved = window.localStorage.getItem("theme");
  return saved === "light" || saved === "dark" ? saved : "dark";
}

export default function App() {
  const [lang, setLang] = useState<Lang>(getStoredLang);
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const t = content[lang];

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top">realkaniewest</a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#work">{t.nav.work}</a>
          <a href="#trust">{t.nav.trust}</a>
          <a href="#process">{t.nav.process}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <div className="toggles">
          <button className="pill-toggle" type="button" onClick={() => setLang(lang === "en" ? "ru" : "en")} aria-label={t.toggleLanguage}>
            <span className={lang === "en" ? "is-active" : ""}>EN</span>
            <span className={lang === "ru" ? "is-active" : ""}>RU</span>
          </button>
          <button className="pill-toggle" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={t.toggleTheme}>
            <span className={theme === "dark" ? "is-active" : ""}>D</span>
            <span className={theme === "light" ? "is-active" : ""}>L</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <ShaderAnimation />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="hero-lead">{t.hero.lead}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="https://t.me/realkaniewest2">{t.hero.telegram}</a>
              <a className="button button-secondary" href="mailto:isokokluu@gmail.com">isokokluu@gmail.com</a>
            </div>
          </div>
        </section>

        <RevealImageList items={t.reveal} />

        <SectionWithMockup
          id="trust"
          title={t.trust.title}
          description={t.trust.description}
          primary={<TrustMockup labels={t.trust.primary} />}
          secondary={<TrustMockup labels={t.trust.secondary} compact />}
        />

        <section className="process-section" id="process">
          <div className="section-copy">
            <p className="eyebrow">{t.process.eyebrow}</p>
            <h2>{t.process.title}</h2>
            <p>{t.process.description}</p>
          </div>
          <AgentPlan tasks={t.process.tasks} />
        </section>

        <section className="contact-section" id="contact">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://t.me/realkaniewest2">Telegram</a>
            <a className="button button-secondary" href="mailto:isokokluu@gmail.com">Email</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">(c) realkaniewest, 2026</footer>
    </div>
  );
}

function TrustMockup({ labels, compact = false }: { labels: readonly string[]; compact?: boolean }) {
  return (
    <div className={compact ? "mockup mockup-compact" : "mockup"}>
      <div className="mockup-topbar">
        <span />
        <span />
        <span />
      </div>
      <div className="mockup-grid">
        {labels.map((label, index) => (
          <div className="mockup-row" key={label}>
            <span className="mockup-index">0{index + 1}</span>
            <strong>{label}</strong>
            <i />
          </div>
        ))}
      </div>
    </div>
  );
}
