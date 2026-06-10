import { Bot, Database, LineChart, ServerCog, ShoppingCart, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import DisplayCards from "@/components/ui/display-cards";
import { SparklesText } from "@/components/ui/sparkles-text";
import { SplineScene } from "@/components/ui/splite";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/portfolio/LanguageToggle";
import { ReviewsWall } from "@/components/portfolio/ReviewsWall";
import { dict, type Lang } from "@/i18n";

const projectIcons = [
  <ServerCog className="size-4 text-accent" />,
  <Bot className="size-4 text-accent" />,
  <Terminal className="size-4 text-accent" />,
  <LineChart className="size-4 text-accent" />,
  <Database className="size-4 text-accent" />,
  <ShoppingCart className="size-4 text-accent" />,
];

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = window.localStorage.getItem("lang");
    return saved === "en" || saved === "ru" ? saved : "ru";
  });
  const t = dict[lang];

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="site-header">
        <div className="container site-header__inner">
          <a className="brand" href="#top">realkaniewest<span className="brand__at">@</span>dev<span className="brand__cursor" /></a>
          <nav className="site-nav" aria-label="Навигация">
            <a href="#about">{t.nav.about}</a>
            <a href="#stack">{t.nav.stack}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#reviews">{t.nav.reviews}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <div className="header-actions">
            <LanguageToggle lang={lang} onToggle={() => setLang((current) => (current === "ru" ? "en" : "ru"))} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-shell">
          <ContainerScroll
            titleComponent={
              <div className="container hero-copy">
                <p className="hero__kicker">{t.hero.kicker}</p>
                <h1 className="hero__title">realkaniewest</h1>
                <p className="hero__subtitle">{t.hero.subtitle.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</p>
                <p className="hero__lead">{t.hero.lead}</p>
                <div className="hero__actions">
                  <a className="btn btn--accent" href="https://t.me/realkaniewest2">{t.hero.tg}</a>
                  <a className="btn btn--ghost" href="mailto:isokokluu@gmail.com">{t.hero.mail}</a>
                </div>
              </div>
            }
          >
            <div className="spline-card">
              <div className="spline-card__copy">
                <p>{t.hero.sceneTitle}</p>
                <span>{t.hero.sceneText}</span>
              </div>
              <SplineScene className="spline-card__scene" />
            </div>
          </ContainerScroll>
        </section>

        <section className="stats reveal-band">
          <div className="container stats__grid">
            {t.metrics.map(([num, label]) => <div className="stat" key={label}><div className="stat__num">{num}</div><div className="stat__label">{label}</div></div>)}
          </div>
        </section>

        <section className="section container about-grid reveal-pop" id="about">
          <div className="about-copy">
            <h2 className="section__title"><span>#</span> {t.about.title}</h2>
            <p className="section__note">{t.about.note}</p>
          </div>
          <div className="sparkles-footage" aria-label="Направления работы">
            <SparklesText text={t.about.sparklesA} className="sparkles-footage__top" sparklesCount={8} colors={{ first: "#ffffff", second: "#7ee787" }} />
            <SparklesText text={t.about.sparklesB} className="sparkles-footage__bottom" sparklesCount={14} colors={{ first: "#7ee787", second: "#9bdcff" }} />
            <span className="typewriter-footage__line" />
          </div>
        </section>

        <section className="section container reviews-section reveal-pop" id="reviews">
          <div className="section-head reviews-head">
            <div>
              <h2 className="section__title"><span>#</span> {t.reviews.title}</h2>
              <p className="section__note">{t.reviews.note}</p>
            </div>
            <div className="reviews-count">
              <strong>6+</strong>
              <span>{t.reviews.count}</span>
            </div>
          </div>
          <ReviewsWall lang={lang} />
        </section>

        <section className="section container" id="stack">
          <h2 className="section__title"><span>#</span> {t.stack}</h2>
          <div className="chips">{t.stackItems.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
        </section>

        <section className="section container projects-section reveal-pop" id="projects">
          <div className="section-head">
            <div>
              <h2 className="section__title"><span>#</span> {t.projectsTitle}</h2>
              <p className="section__note">{t.projectsNote}</p>
            </div>
          </div>
          <DisplayCards
            cards={t.projects.map(([title, description, date], index) => ({
              icon: projectIcons[index],
              title,
              description,
              date,
              className: `project-card [grid-area:stack] ${index === 1 ? "translate-x-10 translate-y-8" : ""} ${index === 2 ? "translate-x-20 translate-y-16" : ""} ${index === 3 ? "-translate-x-10 translate-y-24" : ""} ${index === 4 ? "translate-x-8 translate-y-32" : ""} ${index === 5 ? "translate-x-24 translate-y-40" : ""}`,
              iconClassName: "text-accent",
              titleClassName: "text-foreground",
            }))}
          />
        </section>

        <section className="section container">
          <h2 className="section__title"><span>#</span> {t.processTitle}</h2>
          <div className="log">
            {t.process.map((item, index) => <div key={item}><span>[{index + 1}]</span> {item}</div>)}
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="container cta__inner">
            <p className="cta__prompt">{t.ctaPrompt}</p>
            <h2 className="cta__title">{t.ctaTitle}</h2>
            <div className="cta__actions">
              <a className="btn btn--accent btn--lg" href="https://t.me/realkaniewest2">Telegram: @realkaniewest2</a>
              <a className="btn btn--ghost btn--lg" href="mailto:isokokluu@gmail.com">isokokluu@gmail.com</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <span>(c) realkaniewest, 2026</span>
          <span className="site-footer__cat">=^.^=</span>
        </div>
      </footer>
    </div>
  );
}
