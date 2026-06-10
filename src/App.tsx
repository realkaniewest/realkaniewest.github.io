import { Bot, Database, LineChart, ServerCog, ShoppingCart, Terminal } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import DisplayCards from "@/components/ui/display-cards";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CatTerminal } from "@/components/portfolio/CatTerminal";

const stack = ["Python", "PHP", "JavaScript", "Selenium", "REST API", "Google Sheets API", "OpenCart / OCStore", "Bitrix24", "Telegram-боты", "Linux / VPS", "MySQL / SQLite", "systemd"];

const projects = [
  { icon: <ServerCog className="size-4 text-accent" />, title: "Автоматизация закупок", description: "GFS + Яндекс.Еда -> СКИФ CRM", date: "Python / Selenium / systemd" },
  { icon: <Bot className="size-4 text-accent" />, title: "Маркетплейсы в Битрикс24", description: "Ozon и WB без ручного переноса", date: "PHP / REST API / Bitrix24" },
  { icon: <Terminal className="size-4 text-accent" />, title: "Парсер Avito", description: "10 категорий, фото, автоодобрение", date: "Python / Selenium / SQLite" },
  { icon: <LineChart className="size-4 text-accent" />, title: "WB Analytics", description: "Продажи и остатки в Google Sheets", date: "Python / Google Sheets API" },
  { icon: <Database className="size-4 text-accent" />, title: "OCStore + CRM", description: "СКИФ CRM, бонусы, SMS, оплаты", date: "PHP / MySQL / OCStore" },
  { icon: <ShoppingCart className="size-4 text-accent" />, title: "YaFood UI", description: "Меню, корзина, оформление заказа", date: "PHP / JavaScript / CSS" },
];

const metrics = [
  ["5.0", "рейтинг на Kwork"],
  ["заказы", "выполнены и оплачены"],
  ["100%", "сдано вовремя"],
  ["50%", "повторных заказов"],
];

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="site-header">
        <div className="container site-header__inner">
          <a className="brand" href="#top">realkaniewest<span className="brand__at">@</span>dev<span className="brand__cursor" /></a>
          <nav className="site-nav" aria-label="Навигация">
            <a href="#about">Обо мне</a>
            <a href="#stack">Стек</a>
            <a href="#projects">Проекты</a>
            <a href="#contact">Контакты</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main id="top">
        <section className="hero-shell">
          <ContainerScroll
            titleComponent={
              <div className="container hero-copy">
                <p className="hero__kicker">// фриланс-разработчик</p>
                <h1 className="hero__title">realkaniewest</h1>
                <p className="hero__subtitle">Бэкенд, парсеры,<br />автоматизация</p>
                <p className="hero__lead">Делаю ботов, парсеры и интеграции, которые тихо работают на сервере и экономят людям часы ручной работы. Довожу до результата: код + деплой + инструкция.</p>
                <div className="hero__actions">
                  <a className="btn btn--accent" href="https://t.me/realkaniewest2">Написать в Telegram</a>
                  <a className="btn btn--ghost" href="mailto:isokokluu@gmail.com">isokokluu@gmail.com</a>
                </div>
              </div>
            }
          >
            <CatTerminal />
          </ContainerScroll>
        </section>

        <section className="stats reveal-band">
          <div className="container stats__grid">
            {metrics.map(([num, label]) => <div className="stat" key={label}><div className="stat__num">{num}</div><div className="stat__label">{label}</div></div>)}
          </div>
        </section>

        <section className="section container about-grid" id="about">
          <div>
            <h2 className="section__title"><span>#</span> Обо мне</h2>
            <p className="section__note">Я беру скучную ручную работу, разбираю её на понятные шаги и превращаю в скрипты, интеграции и сервисы, которые спокойно живут на сервере.</p>
          </div>
          <div className="gooey-panel" aria-label="Направления работы">
            <GooeyText
              texts={["бэкенд", "парсеры", "автоматизация", "интеграции", "сделаем проект лучше"]}
              morphTime={1.1}
              cooldownTime={0.7}
              className="h-28"
              textClassName="font-display text-4xl text-accent md:text-6xl"
            />
          </div>
        </section>

        <section className="section container" id="stack">
          <h2 className="section__title"><span>#</span> Стек</h2>
          <div className="chips">{stack.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
        </section>

        <section className="section container projects-section" id="projects">
          <div className="section-head">
            <div>
              <h2 className="section__title"><span>#</span> Проекты</h2>
              <p className="section__note">Реальные заказы с Kwork. Все работают в продакшене.</p>
            </div>
          </div>
          <DisplayCards
            cards={projects.map((project, index) => ({
              ...project,
              className: `project-card [grid-area:stack] ${index === 1 ? "translate-x-10 translate-y-8" : ""} ${index === 2 ? "translate-x-20 translate-y-16" : ""} ${index === 3 ? "-translate-x-10 translate-y-24" : ""} ${index === 4 ? "translate-x-8 translate-y-32" : ""} ${index === 5 ? "translate-x-24 translate-y-40" : ""}`,
              iconClassName: "text-accent",
              titleClassName: "text-foreground",
            }))}
          />
        </section>

        <section className="section container">
          <h2 className="section__title"><span>#</span> Как работаю</h2>
          <div className="log">
            <div><span>[1]</span> уточняю задачу и фиксирую ТЗ - без сюрпризов в конце</div>
            <div><span>[2]</span> делаю и показываю прогресс, на связи в процессе</div>
            <div><span>[3]</span> сдаю работающий результат, а не "почти готово"</div>
            <div><span>[4]</span> передаю с инструкцией и остаюсь на связи после сдачи</div>
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="container cta__inner">
            <p className="cta__prompt">$ есть задача?</p>
            <h2 className="cta__title">Напишите - обсудим</h2>
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
