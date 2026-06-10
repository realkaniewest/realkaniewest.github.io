export type Lang = "en" | "ru";

export interface PlanTask {
  title: string;
  description: string;
  status: "done" | "active" | "next";
}

export const content = {
  en: {
    toggleLanguage: "Switch language",
    toggleTheme: "Switch theme",
    nav: { work: "Work", trust: "Trust", process: "Process", contact: "Contact" },
    hero: {
      eyebrow: "backend / parsers / automation",
      title: "Reliable scripts for work that should not be manual",
      lead: "I build Python, PHP, and JavaScript automations: parsers, CRM integrations, marketplace flows, bots, and server-side tools that quietly run in production.",
      telegram: "Discuss a task",
    },
    reveal: [
      { text: "Backend", caption: "APIs, admin logic, production fixes" },
      { text: "Parsers", caption: "Selenium, schedules, anti-duplicate flow" },
      { text: "Integrations", caption: "Bitrix24, OpenCart, marketplaces, sheets" },
      { text: "Automation", caption: "Bots, cron, systemd, VPS handoff" },
    ],
    trust: {
      title: "Trusted by people who need reliable automation",
      description: "The work is small enough to stay practical and strict enough to survive production: status sync, parser pipelines, CRM links, reporting tables, and handoff instructions.",
      primary: ["Kwork rating 5.0", "100% delivered on time", "Repeat orders", "Production handoff"],
      secondary: ["CRM sync", "Parser reports", "Bot alerts", "Server deploy"],
    },
    process: {
      eyebrow: "how I work",
      title: "A compact plan before code, then steady delivery",
      description: "The process is intentionally boring: understand the business flow, agree on the result, build, test, deploy, document.",
      tasks: [
        { title: "Brief", description: "Clarify the current workflow, inputs, outputs, edge cases, and access limits.", status: "done" },
        { title: "Estimate", description: "Lock the scope, delivery format, milestones, and what counts as finished.", status: "done" },
        { title: "Build", description: "Implement the parser, backend, bot, or integration with visible progress.", status: "active" },
        { title: "Deploy", description: "Run it on the target VPS, hosting, CRM, or local environment.", status: "next" },
        { title: "Handoff", description: "Give instructions, explain settings, and leave the project maintainable.", status: "next" },
      ] satisfies PlanTask[],
    },
    contact: {
      eyebrow: "contact",
      title: "Got a routine that should run by itself?",
      description: "Send the task, current files/screenshots, and what result you want. I will help turn it into a clear technical plan.",
    },
  },
  ru: {
    toggleLanguage: "Переключить язык",
    toggleTheme: "Переключить тему",
    nav: { work: "Работы", trust: "Доверие", process: "Процесс", contact: "Контакты" },
    hero: {
      eyebrow: "бэкенд / парсеры / автоматизация",
      title: "Надёжные скрипты для задач, которые не должны делаться руками",
      lead: "Делаю автоматизации на Python, PHP и JavaScript: парсеры, CRM-интеграции, связки с маркетплейсами, ботов и серверные инструменты, которые спокойно работают в продакшене.",
      telegram: "Обсудить задачу",
    },
    reveal: [
      { text: "Бэкенд", caption: "API, логика админок, продакшен-фиксы" },
      { text: "Парсеры", caption: "Selenium, расписания, защита от дублей" },
      { text: "Интеграции", caption: "Bitrix24, OpenCart, маркетплейсы, таблицы" },
      { text: "Автоматизация", caption: "Боты, cron, systemd, VPS и инструкции" },
    ],
    trust: {
      title: "Мне доверяют задачи, где автоматизация должна работать стабильно",
      description: "Я делаю небольшие, понятные и живучие решения: синхронизацию статусов, цепочки парсинга, CRM-связки, отчёты в таблицах и инструкции после сдачи.",
      primary: ["Рейтинг Kwork 5.0", "100% сдано вовремя", "Повторные заказы", "Передача в прод"],
      secondary: ["CRM-синхронизация", "Отчёты парсера", "Уведомления бота", "Деплой на сервер"],
    },
    process: {
      eyebrow: "как я работаю",
      title: "Сначала короткий план, потом спокойная реализация",
      description: "Процесс специально простой: понять бизнес-поток, согласовать результат, собрать, проверить, задеплоить и объяснить.",
      tasks: [
        { title: "Разбор", description: "Уточняю текущий процесс, входные данные, результат, ограничения и доступы.", status: "done" },
        { title: "Оценка", description: "Фиксирую объём, формат сдачи, этапы и критерии готовности.", status: "done" },
        { title: "Разработка", description: "Делаю парсер, бэкенд, бота или интеграцию с понятным прогрессом.", status: "active" },
        { title: "Деплой", description: "Запускаю на VPS, хостинге, в CRM или локальном окружении.", status: "next" },
        { title: "Передача", description: "Оставляю инструкции, настройки и проект, который можно поддерживать.", status: "next" },
      ] satisfies PlanTask[],
    },
    contact: {
      eyebrow: "контакты",
      title: "Есть рутина, которая должна работать сама?",
      description: "Пришлите задачу, текущие файлы или скрины и желаемый результат. Помогу превратить это в понятный технический план.",
    },
  },
} as const;
