# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Одностраничный сайт-портфолио Егора в терминальном стиле (по мотивам ghostty.org) с ASCII-котиком, задеплоенный на realkaniewest.github.io.

**Architecture:** Чистая статика без сборки: index.html + css/style.css + js/main.js. Анимация котика - массив ASCII-кадров в `<pre>`, typewriter для `$ whoami`, IntersectionObserver для появления секций. Деплой - пуш в репо realkaniewest.github.io через gh CLI.

**Tech Stack:** HTML/CSS/JS (vanilla), Google Fonts (JetBrains Mono + Inter), GitHub Pages, Playwright (только для скриншот-проверки, из C:\Users\twink\kwork-agent\node_modules).

**Спека:** `docs/superpowers/specs/2026-06-10-portfolio-site-design.md` - весь контент (тексты проектов, цифры, контакты) зафиксирован там.

---

### Task 1: index.html - полная разметка

**Files:**
- Create: `index.html`

- [ ] **Step 1: Создать index.html**

Полная разметка со всем реальным контентом из спеки (хиро, цифры 5.0/8/100%/50%, стек-чипы, 6 проектов-минитерминалов, процесс, футер-CTA, контакты t.me/realkaniewest2 и isokokluu@gmail.com). Семантические секции с id для якорей: `#stack`, `#projects`, `#contact`. Терминал хиро: `pre#cat` для котика, `span#typed` + `span#cursor` + `div#typed-out` для typewriter. Все анимируемые секции имеют класс `reveal`.

- [ ] **Step 2: Проверить валидность разметки**

Run: `node -e "const s=require('fs').readFileSync('index.html','utf8'); console.log(/id=\"cat\"/.test(s), /realkaniewest2/.test(s), /isokokluu@gmail.com/.test(s), (s.match(/~\/projects\//g)||[]).length)"`
Expected: `true true true 6`

- [ ] **Step 3: Commit**

```powershell
git add index.html
git commit -m "feat: page markup with real content"
```

### Task 2: css/style.css - стили

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: Создать стили**

Токены: `--bg:#0b0e14; --panel:#10141d; --term:#0a0d13; --border:#1c2433; --text:#e8ebf1; --muted:#8b93a5; --accent:#7ee787; --red:#ff5f57; --yellow:#febc2e; --green:#28c840;`
Ключевые компоненты:
- фон body: цвет + точечная сетка `radial-gradient(circle, rgba(255,255,255,.04) 1px, transparent 1px)` size 28px;
- шапка sticky с blur и нижней границей;
- хиро-грид 2 колонки (1fr 1fr, gap 48px), < 900px - одна колонка;
- `.term` - окно терминала: скругление 10px, бар с тремя кружками (--red/--yellow/--green), тень, фон --term;
- `.term__cat` - JetBrains Mono 14px, line-height 1.15, цвет --accent;
- `.cursor` - блочный мигающий (animation blink 1s steps(1) infinite);
- `.chip` - моно-чипы с бордером, hover бордер --accent;
- `.stat__num` - 40px mono bold --accent;
- `.card` - мини-терминал проекта: бар с путём `~/projects/...`, hover: border --accent + translateY(-3px);
- `.log-line` - строки процесса, номер `[n]` цветом --accent;
- `.btn--accent` - фон --accent, текст #0b0e14, hover ярче; `.btn--ghost` - бордер;
- `.reveal` - opacity 0 + translateY(14px), `.is-visible` - переход 0.5s к норме;
- `@media (prefers-reduced-motion: reduce)` - отключить blink, reveal-переходы;
- адаптив: метрики grid 4 -> 2x2, карточки 3 -> 2 -> 1 колонка.

- [ ] **Step 2: Commit**

```powershell
git add css/style.css
git commit -m "feat: terminal-style dark theme"
```

### Task 3: js/main.js + favicon.svg

**Files:**
- Create: `js/main.js`
- Create: `favicon.svg`

- [ ] **Step 1: main.js**

Три блока:

1. Котик. Кадры - шаблонные строки одинаковой ширины/высоты (7 строк). Меняются только строка глаз, строка рта и строка торса:

```js
const cat = (eyes, mouth, body) => [
  "    /\\_/\\",
  `   ( ${eyes} )`,
  `    ${mouth}`,
  `   ${body}`,
  "  ( | | | )   _",
  "   \\_m_m_/ --'",
  "",
].join("\n");

const F = {
  idle:  cat("o.o", "> ^ <", "/     \\"),
  blink: cat("-.-", "> ^ <", "/     \\"),
  pawup: cat("o.o", ">( )<", "/  |  \\"),
  lick1: cat("-.-", ">(u)<", "/  |  \\"),
  lick2: cat("o.o", ">(~)<", "/  |  \\"),
};

const playlist = [
  ["idle", 900], ["blink", 180], ["idle", 1200], ["pawup", 350],
  ["lick1", 320], ["lick2", 320], ["lick1", 320], ["lick2", 320],
  ["lick1", 320], ["pawup", 350], ["idle", 1500], ["blink", 180],
];
```

Аниматор: setTimeout-цикл по playlist, пишет кадр в `#cat.textContent`. При `matchMedia('(prefers-reduced-motion: reduce)')` - один статичный кадр idle.

2. Typewriter: печатает `whoami` в `#typed` по 90мс/символ, затем в `#typed-out` построчно добавляет: `Егор - бэкенд-разработчик`, `Python, PHP, парсеры, интеграции, автоматизация`, `Kwork: рейтинг 5.0, сдаю вовремя` (каждая через 250мс), затем новая строка промпта с мигающим курсором.

3. IntersectionObserver: все `.reveal` получают `.is-visible` при появлении (threshold 0.15, один раз).

- [ ] **Step 2: favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0b0e14"/>
  <text x="32" y="42" font-family="monospace" font-size="26" fill="#7ee787" text-anchor="middle">=^.^=</text>
</svg>
```

- [ ] **Step 3: Commit**

```powershell
git add js/main.js favicon.svg
git commit -m "feat: cat animation, typewriter, reveals"
```

### Task 4: Локальная проверка скриншотами

**Files:**
- Create: `tools/screenshot.mjs`

- [ ] **Step 1: Скрипт скриншотов (Playwright из kwork-agent)**

```js
import { createRequire } from "node:module";
const require = createRequire("file:///C:/Users/twink/kwork-agent/package.json");
const { chromium } = require("playwright");

const url = process.argv[2] || "http://localhost:8080";
const browser = await chromium.launch({ channel: "chrome" });
for (const [name, w, h] of [["desktop", 1440, 900], ["mobile", 375, 740]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `shots/${name}.png`, fullPage: true });
  await page.close();
}
await browser.close();
console.log("done: shots/desktop.png, shots/mobile.png");
```

- [ ] **Step 2: Поднять сервер и снять скриншоты**

```powershell
Start-Process -WindowStyle Hidden python -ArgumentList "-m","http.server","8080"
node tools/screenshot.mjs
```

Expected: `done: ...`, файлы в shots/.

- [ ] **Step 3: Визуальная сверка (смотреть скриншоты глазами агента)**

Чек-лист: котик целый и читаемый во всех кадрах (снять 2-3 скриншота с паузой - поймать разные кадры), терминал не разваливается, сетка-точки видна но не мешает, на 375px ничего не вылазит, контраст текста достаточный, карточки ровные. Подкрутить кадры котика/отступы по результатам. Это итеративный шаг - повторять скриншот после каждой правки.

- [ ] **Step 4: Commit правок**

```powershell
git add -A
git commit -m "polish: visual tuning after screenshot review"
```

### Task 5: README + деплой на GitHub Pages

**Files:**
- Create: `README.md`
- Create: `.gitignore`

- [ ] **Step 1: .gitignore и README**

`.gitignore`: `shots/`. README: одно-двухабзацное описание (сайт-портфолио, стек, как запустить локально, адрес).

- [ ] **Step 2: Создать репо и запушить**

```powershell
gh repo create realkaniewest/realkaniewest.github.io --public --source . --push
```

Expected: репо создан, ветка запушена. Если Pages не включился сам - включить:

```powershell
gh api repos/realkaniewest/realkaniewest.github.io/pages -X POST -f "source[branch]=master" -f "source[path]=/" 2>$null
```

- [ ] **Step 3: Проверить прод**

Подождать сборку Pages (до 3 минут, опрашивать раз в 30 сек):

```powershell
Invoke-WebRequest https://realkaniewest.github.io -UseBasicParsing | Select-Object StatusCode
node tools/screenshot.mjs https://realkaniewest.github.io
```

Expected: 200, финальные скриншоты прода выглядят как локальные.

- [ ] **Step 4: Финальный коммит**

```powershell
git add -A
git commit -m "chore: readme and deploy"
git push
```

---

## Self-review

- **Spec coverage:** разметка и контент (Task 1), стили и адаптив и reduced-motion (Task 2), котик/typewriter/reveal (Task 3), мобильная проверка и качество (Task 4), деплой и критерии приёмки 1-7 (Task 4-5). Все секции спеки покрыты.
- **Placeholders:** кадры котика, playlist, тексты typewriter, favicon - конкретные. Полотно HTML/CSS не дублируется в плане целиком - оно определено спекой (контент) + Task 2 (точные токены и поведение компонентов); итеративная визуальная подгонка - явный шаг Task 4 Step 3 с чек-листом.
- **Type consistency:** id `#cat/#typed/#typed-out/#cursor` совпадают между Task 1 и Task 3; классы `.term/.chip/.card/.reveal/.log-line` между Task 1 и Task 2.
