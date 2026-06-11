(() => {
  document.documentElement.classList.add("js");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const translations = {
    ru: {
      "nav.home": "Главная", "nav.stack": "Стек", "nav.projects": "Проекты", "nav.process": "Процесс", "nav.contact": "Контакты",
      "hero.kicker": "// фриланс-разработчик", "hero.title": "Егор", "hero.subtitle": "Бэкенд, парсеры,<br>автоматизация",
      "hero.lead": "Делаю ботов, парсеры и интеграции, которые тихо работают на сервере и экономят людям часы ручной работы. Довожу до результата: код + деплой + инструкция.",
      "hero.telegram": "Написать в Telegram",
      "stats.rating": "рейтинг на Kwork", "stats.ordersValue": "заказы", "stats.orders": "выполнены и оплачены", "stats.time": "сдано вовремя", "stats.repeat": "повторных заказов",
      "stack.title": "Стек", "projects.title": "Проекты", "projects.note": "Реальные заказы с Kwork. Все работают в продакшене.",
      "cards.food.title": "Автоматизация закупок сети ресторанов", "cards.food.desc": "Парсер поставщика GFS + заказы Яндекс.Еды автоматически попадают в СКИФ CRM с оплатой. Работает круглосуточно как systemd-сервис.",
      "cards.b24.title": "Ozon и Wildberries в Битрикс24", "cards.b24.desc": "Заказы с маркетплейсов и статусы доставки синхронизируются с CRM сами, менеджер ничего не переносит руками.",
      "cards.avito.title": "Парсер Avito для доски объявлений", "cards.avito.desc": "Ежедневный сбор объявлений по 10 категориям, загрузка с фото на сайт, автоодобрение через админку, защита от дублей.",
      "cards.wb.title": "Аналитика Wildberries в Google Sheets", "cards.wb.desc": "Продажи и остатки подтягиваются в таблицы автоматически, сводные листы обновляются сами.",
      "cards.oc.title": "Доработки магазина на OCStore", "cards.oc.desc": "Интеграция со СКИФ CRM, бонусная программа, SMS-уведомления, починка оплат и авторизации.",
      "cards.ya.title": "YaFood UI для сети ресторанов", "cards.ya.desc": "Перенос интерфейса заказа в стиле Яндекс.Еды на основной домен: меню, корзина, оформление.",
      "landings.kicker": "// лендинги под задачу", "landings.title": "Какие лендинги я умею делать", "landings.note": "Ниже несколько направлений: меняй кнопками и смотри, как может выглядеть первый экран.",
      "landings.tabs.shader": "Shader", "landings.tabs.paths": "Paths", "landings.tabs.orbit": "Orbit",
      "landings.badge": "DEMO HERO", "landings.status": "Доступен для новых проектов", "landings.cta": "Поехали",
      "landings.slides.shader.title": "Дизайн решает всё", "landings.slides.shader.text": "Сильный первый экран с WebGL-фоном, чистым интерфейсом и понятной кнопкой заявки.",
      "landings.slides.paths.title": "И такой", "landings.slides.paths.text": "Лёгкий лендинг с плавными линиями, аккуратной анимацией и чистым продуктовым текстом.",
      "landings.slides.orbit.title": "И такой тоже", "landings.slides.orbit.text": "Кинематографичный hero для сервиса, стартапа или автоматизации: глубина, движение, премиальный вайб.",
      "process.title": "Как работаю", "process.one": "уточняю задачу и фиксирую ТЗ — без сюрпризов в конце", "process.two": "делаю и показываю прогресс, на связи в процессе", "process.three": "сдаю работающий результат, а не «почти готово»", "process.four": "передаю с инструкцией и остаюсь на связи после сдачи",
      "cta.prompt": "$ есть задача?", "cta.title": "Напишите — обсудим", "footer.copy": "(c) Егор, 2026",
    },
    en: {
      "nav.home": "Home", "nav.stack": "Stack", "nav.projects": "Projects", "nav.process": "Process", "nav.contact": "Contact",
      "hero.kicker": "// freelance developer", "hero.title": "Egor", "hero.subtitle": "Backend, parsers,<br>automation",
      "hero.lead": "I build bots, parsers, and integrations that run quietly on servers and save hours of manual work. I deliver the full result: code + deploy + instructions.",
      "hero.telegram": "Message on Telegram",
      "stats.rating": "Kwork rating", "stats.ordersValue": "orders", "stats.orders": "completed and paid", "stats.time": "delivered on time", "stats.repeat": "repeat orders",
      "stack.title": "Stack", "projects.title": "Projects", "projects.note": "Real Kwork orders. All of them run in production.",
      "cards.food.title": "Restaurant purchasing automation", "cards.food.desc": "A GFS supplier parser plus Yandex Food orders automatically land in SKIF CRM with payment data. Runs 24/7 as a systemd service.",
      "cards.b24.title": "Ozon and Wildberries in Bitrix24", "cards.b24.desc": "Marketplace orders and delivery statuses sync with the CRM automatically, so managers do not move data by hand.",
      "cards.avito.title": "Avito parser for a listing board", "cards.avito.desc": "Daily collection across 10 categories, photo upload to the site, admin approval flow, and duplicate protection.",
      "cards.wb.title": "Wildberries analytics in Google Sheets", "cards.wb.desc": "Sales and stock data are pulled into spreadsheets automatically, with summary sheets refreshing on their own.",
      "cards.oc.title": "OCStore shop improvements", "cards.oc.desc": "SKIF CRM integration, bonus program, SMS notifications, payment fixes, and login fixes.",
      "cards.ya.title": "YaFood UI for a restaurant chain", "cards.ya.desc": "A Yandex Food-style ordering interface on the main domain: menu, cart, and checkout.",
      "landings.kicker": "// landing pages for the task", "landings.title": "Landing pages I can build", "landings.note": "Switch the buttons below to preview a few first-screen directions.",
      "landings.tabs.shader": "Shader", "landings.tabs.paths": "Paths", "landings.tabs.orbit": "Orbit",
      "landings.badge": "DEMO HERO", "landings.status": "Available for New Projects", "landings.cta": "Let's Go",
      "landings.slides.shader.title": "Design is Everything", "landings.slides.shader.text": "Unleashing creativity through bold visuals, clean interfaces, and a clear request button.",
      "landings.slides.paths.title": "And this one", "landings.slides.paths.text": "A light landing with flowing paths, clean animation, and focused product copy.",
      "landings.slides.orbit.title": "And this one too", "landings.slides.orbit.text": "A cinematic hero for a service, startup, or automation product: depth, motion, and a premium feel.",
      "process.title": "How I work", "process.one": "clarify the task and lock the spec, so there are no surprises at the end", "process.two": "build and show progress, staying available while the work is in motion", "process.three": "deliver a working result, not a vague almost-ready state", "process.four": "handoff with instructions and stay available after delivery",
      "cta.prompt": "$ got a task?", "cta.title": "Send it — let's discuss", "footer.copy": "(c) Egor, 2026",
    },
  };

  const applyTheme = (theme) => {
    const safeTheme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = safeTheme;
    document.getElementById("themeToggle")?.setAttribute("aria-pressed", String(safeTheme === "dark"));
    localStorage.setItem("theme", safeTheme);
  };

  const applyLang = (lang) => {
    const safeLang = lang === "en" ? "en" : "ru";
    const dict = translations[safeLang];
    document.documentElement.lang = safeLang;
    document.documentElement.dataset.lang = safeLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const text = dict[el.dataset.i18n];
      if (!text) return;
      if (text.includes("<br>")) el.innerHTML = text;
      else el.textContent = text;
    });
    const thumb = document.getElementById("langThumb");
    const ghost = document.getElementById("langGhost");
    if (thumb) thumb.textContent = safeLang === "ru" ? "RU" : "EN";
    if (ghost) ghost.textContent = safeLang === "ru" ? "EN" : "RU";
    document.getElementById("langToggle")?.setAttribute("aria-pressed", String(safeLang === "en"));
    document.title = safeLang === "ru" ? "Егор — бэкенд, парсеры, автоматизация" : "Egor — backend, parsers, automation";
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
  });

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
        vec3 color = vec3(r * 0.45, g * 1.2, b * 0.72);
        gl_FragColor = vec4(color, 1.0);
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
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, mode === "clouds" ? cloudShader : lineShader));
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
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const render = (now) => {
      resize();
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
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
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
    "Егор - бэкенд-разработчик",
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
      "Егор, фриланс-разработчик.",
      "Бэкенд, парсеры, интеграции, автоматизация.",
      "Превращаю рутину в скрипты, которые тихо работают на сервере.",
    ].join("\n"),
    "stack.txt": "Python | PHP | JavaScript | Selenium | REST API | Google Sheets API | OpenCart | Bitrix24 | Telegram-боты | Linux/VPS | MySQL/SQLite | systemd",
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
    ls: "список файлов (ls -a — со скрытыми)",
    cd: "сменить папку (cd, cd .., cd ~)",
    pwd: "текущий путь",
    cat: "показать файл",
    tree: "дерево текущей папки",
    echo: "напечатать текст",
    whoami: "кто я",
    neofetch: "система и питомец",
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
