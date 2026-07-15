(() => {
  document.documentElement.classList.add("js");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const onReady = (fn) => {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  };

  onReady(() => requestAnimationFrame(() => document.documentElement.classList.add("is-loaded")));

  const headerEl = document.querySelector(".site-header");
  const syncHeaderState = () => headerEl?.classList.toggle("is-scrolled", window.scrollY > 8);
  syncHeaderState();
  window.addEventListener("scroll", syncHeaderState, { passive: true });

  if (!reduceMotion) {
    window.addEventListener("pointermove", (event) => {
      const x = Math.round((event.clientX / window.innerWidth) * 100);
      const y = Math.round((event.clientY / window.innerHeight) * 100);
      document.documentElement.style.setProperty("--spotlight-x", x + "%");
      document.documentElement.style.setProperty("--spotlight-y", y + "%");
    }, { passive: true });
  }

  const translations = {
    ru: {
      "nav.home": "Главная", "nav.stack": "Стек", "nav.router": "Разбор", "nav.brief": "Бриф", "nav.projects": "Проекты", "nav.services": "Услуги", "nav.faq": "FAQ", "nav.process": "Процесс", "nav.contact": "Контакты",
      "hero.kicker": "// фриланс-разработчик", "hero.title": "realkaniewest", "hero.subtitle": "Бэкенд, парсеры,<br>автоматизация",
      "hero.lead": "Делаю ботов, парсеры и интеграции, которые тихо работают на сервере и экономят людям часы ручной работы. Довожу до результата: код + деплой + инструкция.",
      "hero.telegram": "Написать в Telegram",
      "hero.proof.one": "реальные проекты", "hero.proof.two": "серверный запуск", "hero.proof.three": "без лишних обещаний",
      "hero.signals.one.label": "данные", "hero.signals.one.text": "сбор, очистка, выгрузка",
      "hero.signals.two.label": "интеграции", "hero.signals.two.text": "CRM, sheets, маркетплейсы",
      "hero.signals.three.label": "сервер", "hero.signals.three.text": "VPS, systemd, инструкция",
      "stats.rating": "рейтинг на Kwork", "stats.ordersValue": "заказы", "stats.orders": "выполнены и оплачены", "stats.time": "сдано вовремя", "stats.repeat": "повторных заказов",
      "stack.title": "Стек", "projects.title": "Проекты", "projects.note": "Реальные заказы с Kwork. Все работают в продакшене.",
      "fit.title": "Когда я полезен", "fit.note": "Лучше всего захожу в задачи, где нужно не рисовать красивую презентацию, а убрать ручную работу и довести скрипт до запуска.",
      "fit.one.kicker": "ручная рутина", "fit.one.title": "данные копируются руками", "fit.one.text": "делаю парсер или интеграцию, чтобы данные появлялись там, где они реально нужны",
      "fit.two.kicker": "разрозненные сервисы", "fit.two.title": "сайт, CRM и таблицы живут отдельно", "fit.two.text": "связываю заказы, статусы, оплаты и уведомления в один понятный поток",
      "fit.three.kicker": "linux и vps", "fit.three.title": "скрипт должен работать сам", "fit.three.text": "запускаю как сервис, добавляю базовые логи и оставляю инструкцию по поддержке",
      "router.kicker": "// быстрый разбор", "router.title": "Выберите свою задачу", "router.note": "Мини-консоль показывает, что обычно входит в такую работу, без завышенных обещаний и тумана.",
      "router.tabs.parser": "парсер", "router.tabs.crm": "crm", "router.tabs.bot": "бот", "router.tabs.vps": "vps",
      "router.output": "на выходе", "router.stack": "стек", "router.brief": "что прислать", "router.cta": "обсудить такую задачу",
      "brief.kicker": "// заявка без воды", "brief.title": "Соберите короткий бриф", "brief.note": "Выберите пару пунктов, сайт соберет сообщение, которое можно скопировать и отправить в Telegram.",
      "brief.fields.task": "задача", "brief.fields.source": "источник", "brief.fields.output": "результат", "brief.fields.tempo": "режим",
      "brief.options.task.parser": "парсер или сбор данных", "brief.options.task.crm": "интеграция с CRM", "brief.options.task.bot": "telegram бот", "brief.options.task.vps": "запуск на VPS",
      "brief.options.source.site": "сайт или каталог", "brief.options.source.marketplace": "маркетплейс", "brief.options.source.crm": "CRM или админка", "brief.options.source.sheet": "google sheets",
      "brief.options.output.sheets": "таблица", "brief.options.output.database": "база данных", "brief.options.output.telegram": "telegram уведомления", "brief.options.output.crm": "CRM сделка или заказ",
      "brief.options.tempo.once": "разово", "brief.options.tempo.daily": "каждый день", "brief.options.tempo.hourly": "каждый час", "brief.options.tempo.service": "как постоянный сервис",
      "brief.status.ready": "готово к отправке", "brief.status.copied": "скопировано", "brief.status.copyFail": "скопируйте вручную",
      "brief.copy": "Скопировать бриф", "brief.telegram": "Открыть Telegram",
      "services.title": "Что можно заказать", "services.note": "Не просто код ради кода, а маленькие системы, которые закрывают понятную бизнес задачу.",
      "services.parser.title": "Парсеры и сбор данных", "services.parser.text": "Соберу данные с сайтов, маркетплейсов или кабинетов и аккуратно сложу их в таблицу, CRM или базу.",
      "services.crm.title": "Интеграции с CRM", "services.crm.text": "Свяжу сайт, заказы, оплату, Telegram, Bitrix24, OCStore или Google Sheets в один рабочий процесс.",
      "services.bot.title": "Боты и автоматизация", "services.bot.text": "Сделаю Telegram бота, сервис на VPS или скрипт, который работает по расписанию и не требует ручного запуска.",
      "services.parser.meta": "на выходе: csv, sheets или база", "services.crm.meta": "на выходе: связка без ручного переноса", "services.bot.meta": "на выходе: запуск и инструкция",
      "formats.kicker": "// форматы работы", "formats.title": "Можно начать маленько", "formats.note": "Не обязательно сразу заказывать большую систему, можно начать с проверки идеи или маленького рабочего скрипта.",
      "formats.audit.title": "разбор задачи", "formats.audit.text": "смотрю источник данных, ограничения, доступы и предлагаю безопасный путь реализации",
      "formats.audit.one": "что реально автоматизировать", "formats.audit.two": "какие есть риски", "formats.audit.three": "какой нужен минимальный результат",
      "formats.build.title": "рабочий скрипт", "formats.build.text": "делаю понятный инструмент под одну задачу, который можно запустить и проверить на реальных данных",
      "formats.build.one": "код под задачу", "formats.build.two": "выгрузка результата", "formats.build.three": "инструкция по запуску",
      "formats.service.title": "боевой сервис", "formats.service.text": "выношу скрипт на VPS, добавляю запуск по расписанию, логи и базовую поддержку после сдачи",
      "formats.service.one": "systemd или cron", "formats.service.two": "логи и перезапуск", "formats.service.three": "передача инструкции",
      "cards.food.title": "Автоматизация закупок сети ресторанов", "cards.food.desc": "Парсер поставщика GFS + заказы Яндекс.Еды автоматически попадают в СКИФ CRM с оплатой. Работает круглосуточно как systemd-сервис.",
      "cards.b24.title": "Ozon и Wildberries в Битрикс24", "cards.b24.desc": "Заказы с маркетплейсов и статусы доставки синхронизируются с CRM сами, менеджер ничего не переносит руками.",
      "cards.avito.title": "Парсер Avito для доски объявлений", "cards.avito.desc": "Ежедневный сбор объявлений по 10 категориям, загрузка с фото на сайт, автоодобрение через админку, защита от дублей.",
      "cards.wb.title": "Аналитика Wildberries в Google Sheets", "cards.wb.desc": "Продажи и остатки подтягиваются в таблицы автоматически, сводные листы обновляются сами.",
      "cards.oc.title": "Доработки магазина на OCStore", "cards.oc.desc": "Интеграция со СКИФ CRM, бонусная программа, SMS-уведомления, починка оплат и авторизации.",
      "cards.ya.title": "YaFood UI для сети ресторанов", "cards.ya.desc": "Перенос интерфейса заказа в стиле Яндекс.Еды на основной домен: меню, корзина, оформление.",
      "proof.kicker": "// проверяемый результат", "proof.title": "Как понять что работа готова", "proof.note": "Для каждой задачи заранее выбирается простой способ проверки, чтобы финал был не на ощущениях.",
      "proof.parser.title": "данные сходятся", "proof.parser.text": "есть пример входа и выхода, дубли не плодятся, результат можно открыть и проверить",
      "proof.crm.title": "заявка доходит", "proof.crm.text": "тестовый заказ проходит весь путь, статусы видны, ошибка не теряется молча",
      "proof.bot.title": "сценарии отвечают", "proof.bot.text": "команды, уведомления и права проверены на понятных тестовых действиях",
      "proof.vps.title": "сервис переживает перезапуск", "proof.vps.text": "systemd или cron запускает задачу, логи доступны, инструкция не требует угадывать",
      "landings.kicker": "// лендинги под задачу", "landings.title": "Какие лендинги я умею делать", "landings.note": "Ниже несколько направлений: меняй кнопками и смотри, как может выглядеть первый экран.",
      "landings.tabs.shader": "Shader", "landings.tabs.paths": "Paths", "landings.tabs.orbit": "Orbit",
      "landings.badge": "DEMO HERO", "landings.status": "Доступен для новых проектов", "landings.cta": "Поехали",
      "landings.slides.shader.title": "Сделаю вам такой лендинг", "landings.slides.shader.text": "Тёмный первый экран с живым shader-фоном, сильным оффером и кнопкой заявки.",
      "landings.slides.paths.title": "Дизайн решает всё", "landings.slides.paths.text": "Сильный первый экран с WebGL-фоном, чистым интерфейсом и понятной кнопкой заявки.",
      "landings.slides.orbit.title": "И такой тоже", "landings.slides.orbit.text": "Кинематографичный hero для сервиса, стартапа или автоматизации: глубина, движение, премиальный вайб.",
      "process.title": "Как работаю", "process.one": "уточняю задачу и фиксирую ТЗ - без сюрпризов в конце", "process.two": "делаю и показываю прогресс, на связи в процессе", "process.three": "сдаю работающий результат, а не «почти готово»", "process.four": "передаю с инструкцией и остаюсь на связи после сдачи",
      "trust.title": "Почему спокойно работать",
      "trust.one.kicker": "01", "trust.one.title": "сначала ограничения", "trust.one.text": "до старта проверяю, есть ли API, доступы, лимиты, капчи и риск блокировок",
      "trust.two.kicker": "02", "trust.two.title": "без опасных фокусов", "trust.two.text": "токены, пароли и приватные данные не зашиваются в публичный код",
      "trust.three.kicker": "03", "trust.three.title": "после сдачи понятно", "trust.three.text": "оставляю инструкцию, как запустить, где смотреть логи и что делать при сбое",
      "limits.kicker": "// честные рамки", "limits.title": "Что проговариваю до старта",
      "limits.access.title": "доступы отдельно от кода", "limits.access.text": "пароли, токены и ключи не попадают в публичный репозиторий и не лежат в html",
      "limits.risk.title": "лимиты и антиботы обсуждаем сразу", "limits.risk.text": "если сайт защищен капчей или правилами, сначала выбираем безопасный способ работы",
      "limits.scope.title": "результат фиксируем словами", "limits.scope.text": "до разработки понятно, какие данные получаем, куда кладем и как проверяем готовность",
      "faq.kicker": "// частые вопросы", "faq.title": "Перед тем как написать",
      "faq.api.q": "если у сервиса нет API, это возможно?", "faq.api.a": "иногда да, через парсинг или браузерную автоматизацию, но сначала проверяю правила, капчи и риск блокировок",
      "faq.access.q": "нужно ли сразу давать доступы?", "faq.access.a": "нет, сначала можно обсудить задачу на примерах, доступы нужны только когда понятен безопасный план работы",
      "faq.support.q": "что будет после сдачи?", "faq.support.a": "передаю инструкцию, объясняю где смотреть логи и могу отдельно договориться о поддержке",
      "faq.small.q": "можно начать с маленькой задачи?", "faq.small.a": "да, часто лучше начать с минимального скрипта или разбора, а потом расширять если результат полезен",
      "cta.prompt": "$ есть задача?", "cta.title": "Напишите - обсудим",
      "cta.brief.one": "ссылка на сайт или сервис", "cta.brief.two": "что должно получиться", "cta.brief.three": "куда отдавать результат",
      "footer.copy": "(c) realkaniewest, 2026",
    },
    en: {
      "nav.home": "Home", "nav.stack": "Stack", "nav.router": "Router", "nav.brief": "Brief", "nav.projects": "Projects", "nav.services": "Services", "nav.faq": "FAQ", "nav.process": "Process", "nav.contact": "Contact",
      "hero.kicker": "// freelance developer", "hero.title": "realkaniewest", "hero.subtitle": "Backend, parsers,<br>automation",
      "hero.lead": "I build bots, parsers, and integrations that run quietly on servers and save hours of manual work. I deliver the full result: code + deploy + instructions.",
      "hero.telegram": "Message on Telegram",
      "hero.proof.one": "real projects", "hero.proof.two": "server launch", "hero.proof.three": "no overpromises",
      "hero.signals.one.label": "data", "hero.signals.one.text": "collect, clean, export",
      "hero.signals.two.label": "integrations", "hero.signals.two.text": "CRM, sheets, marketplaces",
      "hero.signals.three.label": "server", "hero.signals.three.text": "VPS, systemd, instructions",
      "stats.rating": "Kwork rating", "stats.ordersValue": "orders", "stats.orders": "completed and paid", "stats.time": "delivered on time", "stats.repeat": "repeat orders",
      "stack.title": "Stack", "projects.title": "Projects", "projects.note": "Real Kwork orders. All of them run in production.",
      "fit.title": "Where I fit best", "fit.note": "I am most useful when the job is not a pretty slide deck, but removing manual work and getting the script running.",
      "fit.one.kicker": "manual routine", "fit.one.title": "data is copied by hand", "fit.one.text": "I build a parser or integration so the data lands where it is actually needed",
      "fit.two.kicker": "scattered services", "fit.two.title": "site, CRM, and sheets live apart", "fit.two.text": "I connect orders, statuses, payments, and notifications into one clear flow",
      "fit.three.kicker": "linux and vps", "fit.three.title": "the script must run by itself", "fit.three.text": "I run it as a service, add basic logs, and leave maintenance instructions",
      "router.kicker": "// quick task router", "router.title": "Choose your task", "router.note": "A small console shows what is usually included, without inflated promises or fog.",
      "router.tabs.parser": "parser", "router.tabs.crm": "crm", "router.tabs.bot": "bot", "router.tabs.vps": "vps",
      "router.output": "output", "router.stack": "stack", "router.brief": "what to send", "router.cta": "discuss this task",
      "brief.kicker": "// no-fluff request", "brief.title": "Build a short brief", "brief.note": "Pick a few options and the site creates a message you can copy and send in Telegram.",
      "brief.fields.task": "task", "brief.fields.source": "source", "brief.fields.output": "result", "brief.fields.tempo": "mode",
      "brief.options.task.parser": "parser or data collection", "brief.options.task.crm": "CRM integration", "brief.options.task.bot": "telegram bot", "brief.options.task.vps": "VPS launch",
      "brief.options.source.site": "website or catalog", "brief.options.source.marketplace": "marketplace", "brief.options.source.crm": "CRM or admin panel", "brief.options.source.sheet": "google sheets",
      "brief.options.output.sheets": "spreadsheet", "brief.options.output.database": "database", "brief.options.output.telegram": "telegram notifications", "brief.options.output.crm": "CRM deal or order",
      "brief.options.tempo.once": "one time", "brief.options.tempo.daily": "daily", "brief.options.tempo.hourly": "hourly", "brief.options.tempo.service": "as a permanent service",
      "brief.status.ready": "ready to send", "brief.status.copied": "copied", "brief.status.copyFail": "copy manually",
      "brief.copy": "Copy brief", "brief.telegram": "Open Telegram",
      "services.title": "What I can build", "services.note": "Not code for the sake of code, but small systems that solve a clear business task.",
      "services.parser.title": "Parsers and data collection", "services.parser.text": "I collect data from websites, marketplaces, and dashboards, then send it to tables, CRM, or databases.",
      "services.crm.title": "CRM integrations", "services.crm.text": "I connect sites, orders, payments, Telegram, Bitrix24, OCStore, and Google Sheets into one working flow.",
      "services.bot.title": "Bots and automation", "services.bot.text": "I build Telegram bots, VPS services, and scheduled scripts that do not need manual launching.",
      "services.parser.meta": "output: csv, sheets, or database", "services.crm.meta": "output: no manual transfer", "services.bot.meta": "output: launch and instructions",
      "formats.kicker": "// work formats", "formats.title": "You can start small", "formats.note": "You do not need to order a large system right away, we can start with idea validation or a small working script.",
      "formats.audit.title": "task review", "formats.audit.text": "I check the data source, limits, access, and suggest a safe implementation path",
      "formats.audit.one": "what can really be automated", "formats.audit.two": "what risks exist", "formats.audit.three": "what minimum result is needed",
      "formats.build.title": "working script", "formats.build.text": "I build a clear tool for one task that can be launched and checked on real data",
      "formats.build.one": "task focused code", "formats.build.two": "result export", "formats.build.three": "launch instructions",
      "formats.service.title": "production service", "formats.service.text": "I move the script to VPS, add scheduled launch, logs, and basic support after delivery",
      "formats.service.one": "systemd or cron", "formats.service.two": "logs and restart", "formats.service.three": "handoff instructions",
      "cards.food.title": "Restaurant purchasing automation", "cards.food.desc": "A GFS supplier parser plus Yandex Food orders automatically land in SKIF CRM with payment data. Runs 24/7 as a systemd service.",
      "cards.b24.title": "Ozon and Wildberries in Bitrix24", "cards.b24.desc": "Marketplace orders and delivery statuses sync with the CRM automatically, so managers do not move data by hand.",
      "cards.avito.title": "Avito parser for a listing board", "cards.avito.desc": "Daily collection across 10 categories, photo upload to the site, admin approval flow, and duplicate protection.",
      "cards.wb.title": "Wildberries analytics in Google Sheets", "cards.wb.desc": "Sales and stock data are pulled into spreadsheets automatically, with summary sheets refreshing on their own.",
      "cards.oc.title": "OCStore shop improvements", "cards.oc.desc": "SKIF CRM integration, bonus program, SMS notifications, payment fixes, and login fixes.",
      "cards.ya.title": "YaFood UI for a restaurant chain", "cards.ya.desc": "A Yandex Food-style ordering interface on the main domain: menu, cart, and checkout.",
      "proof.kicker": "// verifiable result", "proof.title": "How we know it is ready", "proof.note": "For each task, a simple verification method is picked up front, so the finish is not based on vibes.",
      "proof.parser.title": "data matches", "proof.parser.text": "there is an input and output example, duplicates do not grow, and the result can be opened and checked",
      "proof.crm.title": "request arrives", "proof.crm.text": "a test order passes the full path, statuses are visible, and errors are not silent",
      "proof.bot.title": "flows respond", "proof.bot.text": "commands, notifications, and permissions are checked with clear test actions",
      "proof.vps.title": "service survives restart", "proof.vps.text": "systemd or cron launches the task, logs are available, and instructions do not require guessing",
      "landings.kicker": "// landing pages for the task", "landings.title": "Landing pages I can build", "landings.note": "Switch the buttons below to preview a few first-screen directions.",
      "landings.tabs.shader": "Shader", "landings.tabs.paths": "Paths", "landings.tabs.orbit": "Orbit",
      "landings.badge": "DEMO HERO", "landings.status": "Available for New Projects", "landings.cta": "Let's Go",
      "landings.slides.shader.title": "I can build you this landing", "landings.slides.shader.text": "A dark first screen with a live shader-style background, a sharp offer, and a clear request button.",
      "landings.slides.paths.title": "Design is Everything", "landings.slides.paths.text": "Unleashing creativity through bold visuals, clean interfaces, and a clear request button.",
      "landings.slides.orbit.title": "And this one too", "landings.slides.orbit.text": "A cinematic hero for a service, startup, or automation product: depth, motion, and a premium feel.",
      "process.title": "How I work", "process.one": "clarify the task and lock the spec, so there are no surprises at the end", "process.two": "build and show progress, staying available while the work is in motion", "process.three": "deliver a working result, not a vague almost-ready state", "process.four": "handoff with instructions and stay available after delivery",
      "trust.title": "Why the work stays calm",
      "trust.one.kicker": "01", "trust.one.title": "limits first", "trust.one.text": "before starting, I check API access, credentials, limits, captchas, and blocking risks",
      "trust.two.kicker": "02", "trust.two.title": "no dangerous tricks", "trust.two.text": "tokens, passwords, and private data are not hardcoded into public code",
      "trust.three.kicker": "03", "trust.three.title": "clear after delivery", "trust.three.text": "I leave instructions for launch, logs, and what to do if something fails",
      "limits.kicker": "// honest boundaries", "limits.title": "What I clarify before starting",
      "limits.access.title": "access stays outside code", "limits.access.text": "passwords, tokens, and keys do not go into a public repository or html",
      "limits.risk.title": "limits and antibot first", "limits.risk.text": "if a site has captcha or rules, we choose a safe way to work first",
      "limits.scope.title": "result is written down", "limits.scope.text": "before development, it is clear what data we get, where it goes, and how readiness is checked",
      "faq.kicker": "// frequent questions", "faq.title": "Before you message",
      "faq.api.q": "is it possible if the service has no API?", "faq.api.a": "sometimes yes, through parsing or browser automation, but first I check rules, captchas, and blocking risk",
      "faq.access.q": "do I need to give access immediately?", "faq.access.a": "no, we can first discuss the task on examples, access is needed only after a safe plan is clear",
      "faq.support.q": "what happens after delivery?", "faq.support.a": "I hand off instructions, explain where to check logs, and can agree on support separately",
      "faq.small.q": "can we start with a small task?", "faq.small.a": "yes, often it is better to start with a minimal script or review, then expand if the result is useful",
      "cta.prompt": "$ got a task?", "cta.title": "Send it - let's discuss",
      "cta.brief.one": "link to site or service", "cta.brief.two": "desired result", "cta.brief.three": "where the output should go",
      "footer.copy": "(c) realkaniewest, 2026",
    },
  };

  const applyTheme = (theme) => {
    const safeTheme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = safeTheme;
    document.getElementById("themeToggle")?.setAttribute("aria-pressed", String(safeTheme === "dark"));
    localStorage.setItem("theme", safeTheme);
  };

  const setLocalizedText = (el, text) => {
    el.textContent = "";
    String(text).split("<br>").forEach((part, index) => {
      if (index > 0) el.appendChild(document.createElement("br"));
      el.appendChild(document.createTextNode(part));
    });
  };

  const applyLang = (lang) => {
    const safeLang = lang === "en" ? "en" : "ru";
    const dict = translations[safeLang];
    document.documentElement.lang = safeLang;
    document.documentElement.dataset.lang = safeLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const text = dict[el.dataset.i18n];
      if (!text) return;
      setLocalizedText(el, text);
    });
    const thumb = document.getElementById("langThumb");
    const ghost = document.getElementById("langGhost");
    if (thumb) thumb.textContent = safeLang === "ru" ? "RU" : "EN";
    if (ghost) ghost.textContent = safeLang === "ru" ? "EN" : "RU";
    document.getElementById("langToggle")?.setAttribute("aria-pressed", String(safeLang === "en"));
    document.title = safeLang === "ru" ? "realkaniewest - backend, парсеры, автоматизация" : "realkaniewest - backend, parsers, automation";
    localStorage.setItem("lang", safeLang);
  };

  applyTheme(localStorage.getItem("theme") || "dark");
  applyLang(localStorage.getItem("lang") || "ru");

  document.getElementById("themeToggle")?.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
  });

  document.getElementById("langToggle")?.addEventListener("click", () => {
    applyLang(document.documentElement.dataset.lang === "en" ? "ru" : "en");
    const activeLanding = document.querySelector("[data-landing-tab].is-active")?.dataset.landingTab || "shader";
    setLandingDemo(activeLanding);
    const activeRoute = document.querySelector("[data-task-route].is-active")?.dataset.taskRoute || "parser";
    setTaskRoute(activeRoute);
    updateBrief();
  });

  const briefSelects = {
    task: document.getElementById("briefTask"),
    source: document.getElementById("briefSource"),
    output: document.getElementById("briefOutput"),
    tempo: document.getElementById("briefTempo"),
  };
  const briefPreview = document.getElementById("briefPreview");
  const briefStatus = document.getElementById("briefStatus");
  const copyBriefButton = document.getElementById("copyBrief");

  const briefLabels = {
    ru: {
      intro: "Привет, хочу обсудить задачу",
      task: "задача",
      source: "источник",
      output: "результат",
      tempo: "режим",
      context: "контекст",
      contextText: "могу прислать ссылку, пример результата и доступы после согласования",
      taskValues: { parser: "парсер или сбор данных", crm: "интеграция с CRM", bot: "telegram бот", vps: "запуск на VPS" },
      sourceValues: { site: "сайт или каталог", marketplace: "маркетплейс", crm: "CRM или админка", sheet: "google sheets" },
      outputValues: { sheets: "таблица", database: "база данных", telegram: "telegram уведомления", crm: "CRM сделка или заказ" },
      tempoValues: { once: "разово", daily: "каждый день", hourly: "каждый час", service: "как постоянный сервис" },
    },
    en: {
      intro: "Hi, I want to discuss a task",
      task: "task",
      source: "source",
      output: "result",
      tempo: "mode",
      context: "context",
      contextText: "I can send a link, expected output example, and access after agreement",
      taskValues: { parser: "parser or data collection", crm: "CRM integration", bot: "telegram bot", vps: "VPS launch" },
      sourceValues: { site: "website or catalog", marketplace: "marketplace", crm: "CRM or admin panel", sheet: "google sheets" },
      outputValues: { sheets: "spreadsheet", database: "database", telegram: "telegram notifications", crm: "CRM deal or order" },
      tempoValues: { once: "one time", daily: "daily", hourly: "hourly", service: "as a permanent service" },
    },
  };

  function getBriefText() {
    const lang = document.documentElement.dataset.lang === "en" ? "en" : "ru";
    const labels = briefLabels[lang];
    const task = briefSelects.task?.value || "parser";
    const source = briefSelects.source?.value || "site";
    const output = briefSelects.output?.value || "sheets";
    const tempo = briefSelects.tempo?.value || "once";
    return [
      labels.intro,
      `${labels.task}: ${labels.taskValues[task]}`,
      `${labels.source}: ${labels.sourceValues[source]}`,
      `${labels.output}: ${labels.outputValues[output]}`,
      `${labels.tempo}: ${labels.tempoValues[tempo]}`,
      `${labels.context}: ${labels.contextText}`,
    ].join("\n");
  }

  function updateBrief() {
    if (!briefPreview) return;
    briefPreview.textContent = getBriefText();
    const lang = document.documentElement.dataset.lang === "en" ? "en" : "ru";
    if (briefStatus) briefStatus.textContent = translations[lang]["brief.status.ready"];
  }

  Object.values(briefSelects).forEach((select) => {
    select?.addEventListener("change", updateBrief);
  });

  copyBriefButton?.addEventListener("click", async () => {
    const lang = document.documentElement.dataset.lang === "en" ? "en" : "ru";
    try {
      await navigator.clipboard.writeText(getBriefText());
      if (briefStatus) briefStatus.textContent = translations[lang]["brief.status.copied"];
    } catch (_error) {
      if (briefStatus) briefStatus.textContent = translations[lang]["brief.status.copyFail"];
      briefPreview?.focus();
    }
  });
  updateBrief();

  const taskRouteData = {
    ru: {
      parser: {
        title: "парсер данных",
        text: "Собрать данные из сайта, кабинета или маркетплейса и передать их в удобный формат.",
        output: ["таблица или база", "защита от дублей", "инструкция по запуску"],
        stack: "python, selenium, sqlite, systemd",
        brief: "ссылку, пример результата и частоту обновления",
      },
      crm: {
        title: "интеграция с crm",
        text: "Связать заказы, статусы, оплату, Telegram или таблицы, чтобы менеджер не переносил данные руками.",
        output: ["автоматическая передача данных", "лог ошибок и понятные статусы", "описание сценария работы"],
        stack: "php, rest api, bitrix24, ocstore, google sheets",
        brief: "какие системы связывать и пример одного заказа",
      },
      bot: {
        title: "telegram бот",
        text: "Сделать бота для заявок, уведомлений, простого кабинета или внутренней рутины.",
        output: ["сценарии команд", "админский поток", "запуск на сервере"],
        stack: "python, telegram api, sqlite, vps",
        brief: "роль бота, список команд и кто будет им пользоваться",
      },
      vps: {
        title: "запуск на vps",
        text: "Поставить скрипт или маленький сервис на сервер, чтобы он работал без ручного запуска.",
        output: ["systemd сервис", "базовые логи", "инструкция по перезапуску"],
        stack: "linux, ssh, systemd, nginx, sqlite",
        brief: "доступ, домен если есть, и как часто должен работать сервис",
      },
    },
    en: {
      parser: {
        title: "data parser",
        text: "Collect data from a site, dashboard, or marketplace and send it into a usable format.",
        output: ["table or database", "duplicate protection", "launch instructions"],
        stack: "python, selenium, sqlite, systemd",
        brief: "link, expected output example, and update frequency",
      },
      crm: {
        title: "crm integration",
        text: "Connect orders, statuses, payments, Telegram, or sheets so managers do not copy data by hand.",
        output: ["automatic data transfer", "error log and clear statuses", "flow description"],
        stack: "php, rest api, bitrix24, ocstore, google sheets",
        brief: "systems to connect and one sample order",
      },
      bot: {
        title: "telegram bot",
        text: "Build a bot for requests, notifications, a simple cabinet, or internal routine.",
        output: ["command scenarios", "admin flow", "server launch"],
        stack: "python, telegram api, sqlite, vps",
        brief: "bot role, command list, and who will use it",
      },
      vps: {
        title: "vps launch",
        text: "Put a script or small service on a server so it runs without manual launch.",
        output: ["systemd service", "basic logs", "restart instructions"],
        stack: "linux, ssh, systemd, nginx, sqlite",
        brief: "access, domain if any, and how often it should run",
      },
    },
  };

  const taskRouteButtons = [...document.querySelectorAll("[data-task-route]")];
  const taskRouteTitle = document.getElementById("taskRouteTitle");
  const taskRouteText = document.getElementById("taskRouteText");
  const taskRouteOutput = document.getElementById("taskRouteOutput");
  const taskRouteStack = document.getElementById("taskRouteStack");
  const taskRouteBrief = document.getElementById("taskRouteBrief");

  function setTaskRoute(name) {
    if (!taskRouteTitle || !taskRouteText || !taskRouteOutput || !taskRouteStack || !taskRouteBrief) return;
    const safeName = ["parser", "crm", "bot", "vps"].includes(name) ? name : "parser";
    const lang = document.documentElement.dataset.lang === "en" ? "en" : "ru";
    const route = taskRouteData[lang][safeName];
    taskRouteButtons.forEach((button) => {
      const active = button.dataset.taskRoute === safeName;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    taskRouteTitle.textContent = route.title;
    taskRouteText.textContent = route.text;
    taskRouteOutput.textContent = "";
    route.output.forEach((line) => {
      const item = document.createElement("li");
      item.textContent = line;
      taskRouteOutput.appendChild(item);
    });
    taskRouteStack.textContent = route.stack;
    taskRouteBrief.textContent = route.brief;
  }

  taskRouteButtons.forEach((button) => {
    button.addEventListener("click", () => setTaskRoute(button.dataset.taskRoute));
  });
  setTaskRoute(document.querySelector("[data-task-route].is-active")?.dataset.taskRoute || "parser");

  const landingDemo = document.getElementById("landingDemo");
  const landingButtons = [...document.querySelectorAll("[data-landing-tab]")];
  const landingTitle = document.getElementById("landingDemoTitle");
  const landingText = document.getElementById("landingDemoText");
  const setLandingDemo = (name) => {
    if (!landingDemo || !landingTitle || !landingText) return;
    const safeName = ["shader", "paths", "orbit"].includes(name) ? name : "shader";
    landingDemo.className = "landing-demo landing-demo--" + safeName;
    landingButtons.forEach((button) => {
      const active = button.dataset.landingTab === safeName;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    const lang = document.documentElement.dataset.lang === "en" ? "en" : "ru";
    landingTitle.textContent = translations[lang][`landings.slides.${safeName}.title`];
    landingText.textContent = translations[lang][`landings.slides.${safeName}.text`];
  };

  landingButtons.forEach((button) => {
    button.addEventListener("click", () => setLandingDemo(button.dataset.landingTab));
  });

  function bootLandingCanvas(canvas, mode) {
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;
    const vertexShader = "attribute vec2 position; void main(){ gl_Position = vec4(position, 0.0, 1.0); }";
    const lineShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;
        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i = 0; i < 5; i++){
            color[j] += lineWidth * float(i*i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
          }
        }
        color = vec3(color.g * 0.7, color.r * 1.35 + color.g * 0.25, color.b * 0.8);
        gl_FragColor = vec4(color, 1.0);
      }
    `;
    const webglShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
      void main(void) {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        float d = length(p) * distortion;
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);
        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `;
    const cloudShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      float rnd(vec2 p){ p=fract(p*vec2(12.9898,78.233)); p+=dot(p,p+34.56); return fract(p.x*p.y); }
      float noise(vec2 p){ vec2 i=floor(p), f=fract(p), u=f*f*(3.0-2.0*f); float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.0); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
      float fbm(vec2 p){ float t=0.0, a=1.0; mat2 m=mat2(1.0,-0.5,0.2,1.2); for(int i=0;i<5;i++){ t+=a*noise(p); p*=2.0*m; a*=0.5; } return t; }
      void main(void) {
        vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.x, resolution.y);
        vec2 st = uv * vec2(2.0, 1.0);
        vec3 col = vec3(0.0);
        float bg = fbm(vec2(st.x + time * 0.12, -st.y) * 2.0);
        uv *= 1.0 - 0.25 * (sin(time * 0.2) * 0.5 + 0.5);
        for(float i=1.0; i<12.0; i++){
          uv += 0.1 * cos(i * vec2(0.1 + 0.01 * i, 0.8) + i*i + time * 0.5 + 0.1 * uv.x);
          vec2 p = uv;
          float d = length(p);
          col += 0.00135 / d * (cos(sin(i) * vec3(1.0, 2.0, 3.0)) + 1.0);
          float b = noise(i + p + bg * 1.731);
          col += 0.002 * b / length(max(p, vec2(b * p.x * 0.02, p.y)));
          col = mix(col, vec3(bg * 0.05, bg * 0.22, bg * 0.15), d);
        }
        gl_FragColor = vec4(col, 1.0);
      }
    `;
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexShader));
    const fragmentSource = mode === "clouds" ? cloudShader : (mode === "webgl" ? webglShader : lineShader);
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    const resolution = gl.getUniformLocation(program, "resolution");
    const time = gl.getUniformLocation(program, "time");
    const xScale = gl.getUniformLocation(program, "xScale");
    const yScale = gl.getUniformLocation(program, "yScale");
    const distortion = gl.getUniformLocation(program, "distortion");
    let rafId = 0;
    let isVisible = false;
    let isRunning = false;
    let needsResize = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = Math.max(1, Math.floor(rect.width * dpr));
      const nextHeight = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width === nextWidth && canvas.height === nextHeight) return;
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const render = (now) => {
      if (!isRunning) return;
      if (needsResize) {
        resize();
        needsResize = false;
      }
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, now * 0.001);
      if (xScale) gl.uniform1f(xScale, 1.0);
      if (yScale) gl.uniform1f(yScale, 0.5);
      if (distortion) gl.uniform1f(distortion, 0.05);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduceMotion) rafId = requestAnimationFrame(render);
    };

    const start = () => {
      if (isRunning || document.hidden || (!isVisible && !reduceMotion)) return;
      isRunning = true;
      rafId = requestAnimationFrame(render);
    };
    const stop = () => {
      isRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };
    const updateVisibility = (visible) => {
      isVisible = visible;
      if (visible) start();
      else stop();
    };

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(() => {
      needsResize = true;
      if (!isRunning && isVisible) start();
    }) : null;
    resizeObserver?.observe(canvas);
    window.addEventListener("resize", () => {
      needsResize = true;
    }, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else if (isVisible || reduceMotion) start();
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      isVisible = true;
      start();
    } else {
      const canvasIo = new IntersectionObserver((entries) => {
        updateVisibility(entries.some((entry) => entry.isIntersecting));
      }, { rootMargin: "220px 0px", threshold: 0.01 });
      canvasIo.observe(canvas);
    }
  }

  document.querySelectorAll("[data-landing-canvas]").forEach((canvas) => {
    bootLandingCanvas(canvas, canvas.dataset.landingCanvas);
  });

  /* ===== ascii pet (кот, прогулка, секретный пёс) ===== */
  const pad = (n) => " ".repeat(Math.max(0, n));

  // Все кадры - ровно 7 строк, чтобы ничего не прыгало.
  const catSit = ({ eyes = "o.o", mouth = "> ^ <", paw = false, paws = "| | |", tail = "--," } = {}) => [
    "",
    "     /\\_/\\",
    `    ( ${eyes} )${paw ? "," : ""}`,
    `     ${mouth}${paw ? "/" : ""}`,
    "    /     \\",
    `   ( ${paws} )`,
    `    \\_m_m_/${tail}`,
  ];

  // Профильный кот на четырёх лапах. stride=true: лапы в шаге (диагональные
  // пары, как у настоящего кота), корпус чуть приподнят (боб).
  const catWalkRight = (stride) => {
    const back = stride ? "/ \\" : "| |";
    const front = stride ? "\\ /" : "| |";
    const rows = [
      "   (\\            /\\_/\\",
      "    \\\\___________( o.o )",
      "     |           |\\ ^ /",
      `     ${back}         ${front}`,
    ];
    return stride ? ["", "", ...rows, ""] : ["", ...rows, "", ""];
  };

  const catWalkLeft = (stride) => {
    const front = stride ? "\\ /" : "| |";
    const back = stride ? "/ \\" : "| |";
    const rows = [
      "  /\\_/\\            /)",
      " ( o.o )___________//",
      "  \\ ^ /|           |",
      `   ${front}         ${back}`,
    ];
    return stride ? ["", "", ...rows, ""] : ["", ...rows, "", ""];
  };

  const C = {
    idle:  catSit(),
    blink: catSit({ eyes: "-.-" }),
    tail:  catSit({ tail: "--'" }),
    pawup: catSit({ paw: true, paws: "| |  " }),
    lick1: catSit({ eyes: "-.o", mouth: "> u <", paw: true, paws: "| |  " }),
    lick2: catSit({ eyes: "-.o", mouth: "> w <", paw: true, paws: "| |  " }),
    walkR0: catWalkRight(false),
    walkR1: catWalkRight(true),
    walkL0: catWalkLeft(false),
    walkL1: catWalkLeft(true),
  };

  // Пёс с будкой и миской (хвост виляет, язык всегда наружу)
  const dogScene = (tailChar, eyes = "o.o") => [
    "",
    "   n____n         /\\",
    `  ( ${eyes}  )       /  \\`,
    "   \\_U__/       /____\\",
    "  /      \\      | __ |",
    " ( | |  | )     ||  ||",
    `  \\_w_w_/--${tailChar}    ||__||  (__)`,
  ];

  const D = {
    wagA: dogScene("~"),
    wagB: dogScene("/"),
    wagC: dogScene("\\"),
    blink: dogScene("~", "-.-"),
  };

  const WALK_END = 12; // на сколько колонок уходит вправо (профиль шире сидячего кота)
  const GLITCH = "#*+%@.";

  let petApi = null; // выставляется ниже, используется терминалом (pet/woof/meow)

  const catEl = document.getElementById("cat");

  // Программа кота: посидел-полизал слева, встал, дошёл до правого края,
  // полизал там, вернулся. Каждый элемент: [строки, смещение, мс].
  function buildCatProgram() {
    const steps = [];
    const lickCycle = (off, long) => {
      steps.push([C.idle, off, long ? 1100 : 800], [C.blink, off, 160], [C.idle, off, 700], [C.tail, off, 420]);
      steps.push([C.pawup, off, 380]);
      for (let i = 0; i < (long ? 3 : 2); i += 1) steps.push([C.lick1, off, 300], [C.lick2, off, 300]);
      steps.push([C.pawup, off, 380], [C.idle, off, long ? 1400 : 900], [C.blink, off, 160]);
    };
    const walk = (from, to) => {
      const right = to > from;
      const dir = right ? 2 : -2;
      const stand = right ? C.walkR0 : C.walkL0;
      const stride = right ? C.walkR1 : C.walkL1;
      steps.push([stand, from, 500]); // встал на четыре лапы, пауза
      let leg = false;
      for (let off = from; right ? off < to : off > to; off += dir) {
        steps.push([leg ? stride : stand, off, 260]);
        leg = !leg;
      }
      steps.push([stand, to, 500]); // дошёл, остановился
    };
    lickCycle(0, true);
    walk(0, WALK_END);
    lickCycle(WALK_END, false);
    walk(WALK_END, 0);
    return steps;
  }

  const dogProgram = [
    [D.wagA, 0, 260], [D.wagB, 0, 260], [D.wagA, 0, 260], [D.wagC, 0, 260],
    [D.wagA, 0, 260], [D.wagB, 0, 260], [D.blink, 0, 180], [D.wagC, 0, 260],
  ];

  if (catEl) {
    let mode = "cat";          // cat | morph | dog
    let timer = null;
    let lastCatFrame = [C.idle, 0];

    const render = (lines, off) => {
      catEl.textContent = lines.map((l) => pad(off) + l).join("\n");
    };

    const runProgram = (programFactory, onFrame) => {
      const program = programFactory();
      let i = 0;
      const tick = () => {
        const [lines, off, ms] = program[i % program.length];
        render(lines, off);
        if (onFrame) onFrame(lines, off);
        i += 1;
        timer = setTimeout(tick, ms);
      };
      tick();
    };

    const startCat = () => {
      mode = "cat";
      runProgram(buildCatProgram, (lines, off) => { lastCatFrame = [lines, off]; });
    };

    const startDog = () => {
      mode = "dog";
      runProgram(() => dogProgram);
    };

    // Глитч-морф: посимвольное перетекание одного арта в другой
    const morph = (fromLines, fromOff, toLines, toOff, done) => {
      mode = "morph";
      clearTimeout(timer);
      const from = fromLines.map((l) => pad(fromOff) + l);
      const to = toLines.map((l) => pad(toOff) + l);
      const width = Math.max(...from.map((l) => l.length), ...to.map((l) => l.length));
      const STEPS = 7;
      let step = 0;
      const tick = () => {
        step += 1;
        if (step > STEPS) { done(); return; }
        const p = step / STEPS;
        const mixed = [];
        for (let r = 0; r < 7; r += 1) {
          const a = (from[r] || "").padEnd(width);
          const b = (to[r] || "").padEnd(width);
          let row = "";
          for (let c = 0; c < width; c += 1) {
            if (step > 1 && step < STEPS && Math.random() < 0.05) {
              row += GLITCH[(Math.random() * GLITCH.length) | 0];
            } else {
              row += Math.random() < p ? b[c] : a[c];
            }
          }
          mixed.push(row);
        }
        catEl.textContent = mixed.join("\n");
        timer = setTimeout(tick, 140);
      };
      tick();
    };

    if (reduceMotion) {
      render(C.idle, 0);
      const toggle = () => {
        mode = mode === "dog" ? "cat" : "dog";
        render(mode === "dog" ? D.wagA : C.idle, 0);
      };
      catEl.addEventListener("click", toggle);
      petApi = {
        toDog: () => { mode = "dog"; render(D.wagA, 0); },
        toCat: () => { mode = "cat"; render(C.idle, 0); },
        isDog: () => mode === "dog",
      };
    } else {
      catEl.addEventListener("click", () => {
        if (mode === "cat") {
          const [lines, off] = lastCatFrame;
          morph(lines, off, D.wagA, 0, startDog);
        } else if (mode === "dog") {
          morph(D.wagA, 0, C.idle, 0, startCat);
        }
      });
      petApi = {
        toDog: () => {
          if (mode !== "cat") return;
          const [lines, off] = lastCatFrame;
          morph(lines, off, D.wagA, 0, startDog);
        },
        toCat: () => {
          if (mode !== "dog") return;
          morph(D.wagA, 0, C.idle, 0, startCat);
        },
        isDog: () => mode === "dog",
      };
      startCat();
    }
  }

  /* ===== typewriter ===== */
  const typedEl = document.getElementById("typed");
  const outEl = document.getElementById("typed-out");
  const cursorEl = document.getElementById("cursor");

  const command = "whoami";
  const output = [
    "realkaniewest - бэкенд-разработчик",
    "Python, PHP, парсеры, интеграции, автоматизация",
    "Kwork: рейтинг 5.0, 100% в срок",
  ];

  if (typedEl && outEl) {
    if (reduceMotion) {
      typedEl.textContent = command;
      outEl.textContent = output.join("\n");
      mountTerminal();
    } else {
      let c = 0;
      const typeChar = () => {
        if (c < command.length) {
          typedEl.textContent += command[c];
          c += 1;
          setTimeout(typeChar, 90);
        } else {
          cursorEl.style.display = "none";
          let l = 0;
          const printLine = () => {
            if (l < output.length) {
              outEl.textContent += output[l] + "\n";
              l += 1;
              setTimeout(printLine, 260);
            } else {
              mountTerminal();
            }
          };
          setTimeout(printLine, 350);
        }
      };
      setTimeout(typeChar, 700);
    }
  }

  /* ===== interactive shell ===== */
  // Виртуальная ФС: строка = файл, объект = папка. Контента бэкенда нет,
  // выполнять нечего; весь вывод печатается через textContent (без innerHTML).
  const FS = {
    "about.txt": [
      "realkaniewest, фриланс-разработчик.",
      "Бэкенд, парсеры, интеграции, автоматизация.",
      "Превращаю рутину в скрипты, которые тихо работают на сервере.",
    ].join("\n"),
    "stack.txt": "Python | PHP | JavaScript | Selenium | REST API | Google Sheets API | OpenCart | Bitrix24 | Telegram-боты | Linux/VPS | MySQL/SQLite | systemd",
    "fit.txt": [
      "если данные переносят руками      -> можно автоматизировать",
      "если заказы живут в разных местах -> можно связать",
      "если скрипт запускают вручную     -> можно вынести на VPS",
    ].join("\n"),
    "router.txt": [
      "parser : данные из сайта или кабинета",
      "crm    : связка заказов, оплат и статусов",
      "bot    : заявки, уведомления, простые панели",
      "vps    : запуск скрипта как сервиса",
    ].join("\n"),
    "brief-template.txt": [
      "Привет, хочу обсудить задачу",
      "задача: парсер или интеграция",
      "источник: сайт, CRM, маркетплейс или таблица",
      "результат: таблица, база, Telegram или CRM",
      "режим: разово, по расписанию или как сервис",
    ].join("\n"),
    "limits.txt": [
      "доступы не храню в публичном коде",
      "лимиты, капчи и правила обсуждаем до старта",
      "готовность фиксируем проверяемым результатом",
    ].join("\n"),
    "services.txt": [
      "parser   : сбор данных, каталоги, маркетплейсы, кабинеты",
      "crm      : Bitrix24, OCStore, Google Sheets, оплаты, статусы",
      "bot      : Telegram, уведомления, заявки, простые панели",
      "deploy   : VPS, systemd, инструкции, поддержка после сдачи",
    ].join("\n"),
    "formats.txt": [
      "audit   : быстро понять риски, доступы и минимальный результат",
      "build   : сделать рабочий скрипт под одну задачу",
      "service : вынести на VPS, добавить расписание, логи и инструкцию",
    ].join("\n"),
    "proof.txt": [
      "parser : вход и выход совпадают, дублей нет",
      "crm    : тестовый заказ доходит и получает статус",
      "bot    : команды и уведомления проверены",
      "vps    : сервис запускается после перезапуска",
    ].join("\n"),
    "faq.txt": [
      "нет API       : сначала проверяем правила и риски",
      "доступы       : не нужны до понятного плана",
      "после сдачи   : инструкция, логи, поддержка по договоренности",
      "малый старт   : можно начать с аудита или маленького скрипта",
    ].join("\n"),
    "contact.txt": [
      "telegram : https://t.me/realkaniewest2",
      "email    : isokokluu@gmail.com",
      "kwork    : realkaniewest (рейтинг 5.0)",
    ].join("\n"),
    "projects": {
      "food-automation.md": "Автоматизация закупок сети ресторанов: парсер GFS + заказы Яндекс.Еды сами падают в СКИФ CRM с оплатой. Python, Selenium, systemd.",
      "b24-marketplaces.md": "Ozon и Wildberries в Битрикс24: заказы и статусы доставки синхронизируются без рук. PHP, REST API.",
      "avito-parser.md": "Парсер Avito: ежедневный сбор по 10 категориям, загрузка с фото, автоодобрение. Python, Selenium, SQLite.",
      "wb-analytics.md": "Аналитика Wildberries в Google Sheets: продажи и остатки обновляются сами. Python, Google Sheets API.",
      "ocstore-crm.md": "Доработки магазина на OCStore: СКИФ CRM, бонусы, SMS, починка оплат. PHP, MySQL.",
      "yafood-ui.md": "Интерфейс заказа в стиле Яндекс.Еды на домене сети ресторанов. PHP, JS, CSS.",
    },
    "cats": {
      "README.txt": "Породы котов, которых я уважаю. cat <имя>.txt",
      "maine-coon.txt": "Мейн-кун: пушистый гигант до 12 кг, любит воду и поговорить. Пушистость 10/10.",
      "british-shorthair.txt": "Британец: плюшевый, вечно слегка недоволен, но это любя.",
      "sphynx.txt": "Сфинкс: лысый, тёплый как грелка, требует свитер и внимания.",
      "bengal.txt": "Бенгал: мини-леопард, энергии как у трёх котов, обожает воду и хаос.",
      "siamese.txt": "Сиам: громкий комментатор всего происходящего в доме.",
    },
    "dogs": {
      "README.txt": "Хорошие мальчики и девочки. cat <имя>.txt",
      "shiba-inu.txt": "Сиба-ину: very surprise, much wow, упрямый, но обаятельный. doge.",
      "husky.txt": "Хаски: голубоглазый драматург, орёт как будто его обижают (это не так).",
      "corgi.txt": "Корги: лапки коротенькие, харизма безграничная. Булочка на ножках.",
      "border-collie.txt": "Бордер-колли: умнее многих людей, нужна работа, иначе оптимизирует диван.",
      "samoyed.txt": "Самоед: облако с улыбкой и хвостом-бубликом.",
    },
    ".secrets": {
      "konami.txt": "Подсказка: на клавиатуре попробуй стрелки и буквы из старых игр. ↑ ↑ ↓ ↓ ← → ← → B A",
      "pet.sh": "#!/bin/sh\n# команды pet, meow, woof трогают питомца в терминале :)\necho 'погладь кота кликом или командой woof'",
      "todo.txt": "[x] сделать сайт\n[x] поселить кота\n[ ] выспаться",
    },
  };

  const COMMANDS = {
    help: "список команд",
    ls: "список файлов (ls -a - со скрытыми)",
    cd: "сменить папку (cd, cd .., cd ~)",
    pwd: "текущий путь",
    cat: "показать файл",
    tree: "дерево текущей папки",
    echo: "напечатать текст",
    whoami: "кто я",
    neofetch: "система и питомец",
    route: "быстрый разбор задач",
    briefgen: "собрать текст заявки",
    limits: "рамки работы",
    formats: "форматы работы",
    proof: "как проверяется готовность",
    faq: "частые вопросы",
    services: "что можно заказать",
    brief: "что прислать для оценки",
    clear: "очистить экран",
    pet: "погладить питомца",
    woof: "превратить в пса",
    meow: "вернуть кота",
    sudo: "...",
    contact: "как со мной связаться",
    history: "история команд",
  };

  const shellEl = document.getElementById("shell");
  const titleEl = document.querySelector(".term--hero .term__title");

  let cwd = []; // путь относительно ~ (например ["cats"])
  let inputEl = null;
  let promptLineEl = null;
  const history = [];
  let histPos = 0;

  function nodeAt(parts) {
    let node = FS;
    for (const p of parts) {
      if (node && typeof node === "object" && p in node) node = node[p];
      else return undefined;
    }
    return node;
  }

  function isDir(node) { return node && typeof node === "object"; }

  function prettyPath(parts) {
    return parts.length ? "~/" + parts.join("/") : "~";
  }

  function resolvePath(arg) {
    // возвращает массив частей или null (неверный путь)
    let parts = arg.startsWith("/") ? [] : cwd.slice();
    if (arg === "~" || arg.startsWith("~")) { parts = []; arg = arg.replace(/^~\/?/, ""); }
    for (const seg of arg.split("/")) {
      if (seg === "" || seg === ".") continue;
      if (seg === "..") { parts.pop(); continue; }
      parts.push(seg);
    }
    return parts;
  }

  function scrollDown() {
    if (shellEl) shellEl.scrollTop = shellEl.scrollHeight;
  }

  function addRow(text, cls) {
    const div = document.createElement("div");
    div.className = "term__row" + (cls ? " " + cls : "");
    div.textContent = text; // безопасно: текстовый узел, не HTML
    shellEl.insertBefore(div, promptLineEl);
    return div;
  }

  function echoCommandLine(raw) {
    const row = document.createElement("div");
    row.className = "term__row term__row--cmd";
    const ps = document.createElement("span");
    ps.className = "term__ps1";
    ps.appendChild(makePs1());
    row.appendChild(ps);
    row.appendChild(document.createTextNode(" " + raw));
    shellEl.insertBefore(row, promptLineEl);
  }

  function makePs1() {
    const frag = document.createDocumentFragment();
    const u = document.createElement("span");
    u.className = "term__ps1-user";
    u.textContent = "egor@dev";
    const p = document.createElement("span");
    p.className = "term__ps1-path";
    p.textContent = ":" + prettyPath(cwd);
    const t = document.createElement("span");
    t.className = "term__ps1-tail";
    t.textContent = "$";
    frag.append(u, p, t);
    return frag;
  }

  function refreshPrompt() {
    if (!promptLineEl) return;
    const ps = promptLineEl.querySelector(".term__ps1");
    ps.textContent = "";
    ps.appendChild(makePs1());
    if (titleEl) titleEl.textContent = "egor@dev: " + prettyPath(cwd);
  }

  const handlers = {
    help() {
      addRow("Доступные команды:", "term__row--ok");
      for (const [name, desc] of Object.entries(COMMANDS)) {
        addRow("  " + name.padEnd(9) + " - " + desc, "term__row--muted");
      }
      addRow("Подсказки: Tab - автодополнение, стрелки вверх/вниз - история.", "term__row--muted");
    },
    ls(args) {
      const showHidden = args.includes("-a");
      const pathArg = args.find((a) => !a.startsWith("-"));
      const parts = pathArg ? resolvePath(pathArg) : cwd.slice();
      const node = nodeAt(parts);
      if (node === undefined) return addRow("ls: нет такого пути: " + pathArg, "term__row--err");
      if (!isDir(node)) return addRow(pathArg, "term__file");
      const names = Object.keys(node).filter((n) => showHidden || !n.startsWith("."));
      if (!names.length) return addRow("(пусто)", "term__row--muted");
      names.sort();
      const row = document.createElement("div");
      row.className = "term__row";
      names.forEach((n, i) => {
        const span = document.createElement("span");
        const dir = isDir(node[n]);
        span.className = dir ? "term__dir" : "term__file";
        span.textContent = dir ? n + "/" : n;
        row.appendChild(span);
        if (i < names.length - 1) row.appendChild(document.createTextNode("   "));
      });
      shellEl.insertBefore(row, promptLineEl);
    },
    cd(args) {
      const target = args[0];
      if (!target || target === "~") { cwd = []; return refreshPrompt(); }
      const parts = resolvePath(target);
      const node = nodeAt(parts);
      if (node === undefined) return addRow("cd: нет такой папки: " + target, "term__row--err");
      if (!isDir(node)) return addRow("cd: это не папка: " + target, "term__row--err");
      cwd = parts;
      refreshPrompt();
    },
    pwd() { addRow("/home/egor" + (cwd.length ? "/" + cwd.join("/") : "")); },
    cat(args) {
      if (!args[0]) return addRow("cat: укажи файл", "term__row--err");
      const node = nodeAt(resolvePath(args[0]));
      if (node === undefined) return addRow("cat: нет такого файла: " + args[0], "term__row--err");
      if (isDir(node)) return addRow("cat: это папка: " + args[0], "term__row--err");
      addRow(node);
    },
    tree() {
      const node = nodeAt(cwd);
      addRow(prettyPath(cwd), "term__row--ok");
      const walk = (n, prefix) => {
        const keys = Object.keys(n).filter((k) => !k.startsWith("."));
        keys.forEach((k, i) => {
          const last = i === keys.length - 1;
          addRow(prefix + (last ? "└── " : "├── ") + (isDir(n[k]) ? k + "/" : k), "term__row--muted");
          if (isDir(n[k])) walk(n[k], prefix + (last ? "    " : "│   "));
        });
      };
      if (isDir(node)) walk(node, "");
    },
    echo(args) { addRow(args.join(" ")); },
    whoami() { addRow("egor", "term__row--ok"); },
    contact() {
      addRow("telegram : https://t.me/realkaniewest2", "term__row--ok");
      addRow("email    : isokokluu@gmail.com", "term__row--ok");
    },
    neofetch() {
      const lines = [
        "        /\\_/\\     egor@dev",
        "       ( o.o )    -----------",
        "        > ^ <     ОС: GhostOS (терминальная)",
        "       /     \\    оболочка: egorsh 1.0",
        "      ( | | | )   стек: Python, PHP, JS",
        "       \\_m_m_/    редактор: vim (btw)",
        "                  питомец: кот (клик по нему!)",
      ];
      lines.forEach((l) => addRow(l, "term__row--ok"));
    },
    services() {
      addRow("parser   : данные из сайтов, маркетплейсов и кабинетов", "term__row--ok");
      addRow("crm      : связка заказов, оплат, статусов и таблиц", "term__row--ok");
      addRow("bot      : Telegram бот или сервис на VPS", "term__row--ok");
      addRow("deploy   : запуск, инструкция, поддержка после сдачи", "term__row--ok");
    },
    route() {
      addRow("выбери тип задачи на странице или напиши мне в telegram:", "term__row--ok");
      addRow("parser : парсер, сбор и очистка данных", "term__row--muted");
      addRow("crm    : интеграция сайта, заказов, оплат и таблиц", "term__row--muted");
      addRow("bot    : telegram бот или уведомления", "term__row--muted");
      addRow("vps    : запуск скрипта как systemd сервиса", "term__row--muted");
    },
    briefgen() {
      getBriefText().split("\n").forEach((line) => addRow(line, "term__row--ok"));
    },
    limits() {
      addRow("доступы отдельно от кода", "term__row--ok");
      addRow("лимиты и антиботы обсуждаем до старта", "term__row--muted");
      addRow("результат фиксируем так, чтобы его можно было проверить", "term__row--muted");
    },
    formats() {
      addRow("audit   : разбор задачи и рисков", "term__row--ok");
      addRow("build   : рабочий скрипт под одну понятную задачу", "term__row--ok");
      addRow("service : запуск на VPS, расписание, логи, инструкция", "term__row--ok");
    },
    proof() {
      addRow("parser : проверяем вход, выход и дубли", "term__row--ok");
      addRow("crm    : тестовый заказ проходит весь путь", "term__row--ok");
      addRow("bot    : команды и уведомления отвечают", "term__row--ok");
      addRow("vps    : сервис запускается и пишет логи", "term__row--ok");
    },
    faq() {
      addRow("нет API     : иногда можно через парсинг, сначала проверка рисков", "term__row--muted");
      addRow("доступы     : не нужны до понятного плана", "term__row--muted");
      addRow("после сдачи : инструкция и возможная поддержка", "term__row--muted");
      addRow("малый старт : можно начать с аудита или скрипта", "term__row--muted");
    },
    brief() {
      addRow("1 ссылка на сайт, кабинет или API", "term__row--ok");
      addRow("2 что нужно получить на выходе", "term__row--ok");
      addRow("3 куда складывать результат: sheets, crm, база, telegram", "term__row--ok");
      addRow("4 если есть пример вручную сделанного результата - пришли его", "term__row--muted");
    },
    clear() {
      [...shellEl.querySelectorAll(".term__row")].forEach((r) => r.remove());
    },
    history() {
      history.forEach((h, i) => addRow("  " + (i + 1) + "  " + h, "term__row--muted"));
    },
    sudo(args) {
      if (!args.length) return addRow("usage: sudo <команда>", "term__row--muted");
      addRow("egor не в файле sudoers. Об инциденте доложено. (шутка)", "term__row--err");
    },
    pet() {
      if (!petApi) return addRow("питомец спит :)", "term__row--muted");
      if (petApi.isDog()) addRow("пёс виляет хвостом, язык наружу :Р", "term__row--ok");
      else addRow("кот жмурится и мурлычет... ", "term__row--ok");
    },
    woof(_args, raw) {
      if (petApi && !petApi.isDog()) { petApi.toDog(); addRow("...кот превращается в пса. woof!", "term__row--ok"); }
      else addRow("он и так пёс. woof!", "term__row--muted");
    },
    meow() {
      if (petApi && petApi.isDog()) { petApi.toCat(); addRow("...пёс снова стал котом. meow!", "term__row--ok"); }
      else addRow("кот и так на месте. meow!", "term__row--muted");
    },
    rm(args) {
      if (args.includes("-rf") && (args.includes("/") || args.includes("/*"))) {
        return addRow("ну уж нет :) этот терминал бессмертен.", "term__row--err");
      }
      addRow("rm: тут нечего удалять, это витрина.", "term__row--muted");
    },
  };

  function runCommand(raw) {
    const trimmed = raw.trim();
    echoCommandLine(raw);
    if (trimmed) {
      history.push(trimmed);
      histPos = history.length;
    }
    if (!trimmed) return;
    const tokens = trimmed.split(/\s+/);
    const cmd = tokens[0].toLowerCase();
    const args = tokens.slice(1);
    if (handlers[cmd]) handlers[cmd](args, raw);
    else addRow(cmd + ": команда не найдена. набери help", "term__row--err");
    refreshPrompt();
  }

  function complete() {
    const val = inputEl.value;
    const tokens = val.split(/\s+/);
    const editing = tokens[tokens.length - 1];
    let pool;
    if (tokens.length <= 1) {
      pool = Object.keys(COMMANDS);
    } else {
      const node = nodeAt(cwd);
      pool = isDir(node) ? Object.keys(node) : [];
    }
    const matches = pool.filter((n) => n.startsWith(editing));
    if (matches.length === 1) {
      tokens[tokens.length - 1] = matches[0];
      inputEl.value = tokens.join(" ");
    } else if (matches.length > 1) {
      addRow(matches.join("   "), "term__row--muted");
      scrollDown();
    }
  }

  function mountTerminal() {
    if (cursorEl) cursorEl.remove();
    if (!shellEl) return;

    const hint = document.createElement("div");
    hint.className = "term__hint";
    hint.textContent = "это рабочий терминал. набери ";
    const codeEl = document.createElement("code");
    codeEl.textContent = "help";
    hint.appendChild(codeEl);
    hint.appendChild(document.createTextNode(" и жми Enter."));
    shellEl.appendChild(hint);

    promptLineEl = document.createElement("div");
    promptLineEl.className = "term__promptline";
    const ps = document.createElement("span");
    ps.className = "term__ps1";
    ps.appendChild(makePs1());
    inputEl = document.createElement("input");
    inputEl.className = "term__input";
    inputEl.type = "text";
    inputEl.maxLength = 120;
    inputEl.autocomplete = "off";
    inputEl.autocapitalize = "off";
    inputEl.spellcheck = false;
    inputEl.setAttribute("aria-label", "Командная строка");
    promptLineEl.append(ps, inputEl);
    shellEl.appendChild(promptLineEl);

    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const v = inputEl.value;
        inputEl.value = "";
        runCommand(v);
        scrollDown();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (histPos > 0) { histPos -= 1; inputEl.value = history[histPos] || ""; }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (histPos < history.length) { histPos += 1; inputEl.value = history[histPos] || ""; }
      } else if (e.key === "Tab") {
        e.preventDefault();
        complete();
      }
    });

    shellEl.addEventListener("click", (e) => {
      if (window.getSelection && String(window.getSelection())) return; // не мешать выделению
      inputEl.focus();
    });

    refreshPrompt();
  }

  /* ===== konami code (bonus) ===== */
  const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let kPos = 0;
  document.addEventListener("keydown", (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    kPos = key === konami[kPos] ? kPos + 1 : (key === konami[0] ? 1 : 0);
    if (kPos === konami.length) {
      kPos = 0;
      if (petApi) petApi.toDog();
      document.documentElement.classList.add("konami");
      setTimeout(() => document.documentElement.classList.remove("konami"), 1500);
    }
  });

  /* ===== reveal on scroll ===== */
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
  }
})();
