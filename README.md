# realkaniewest@dev — сайт-портфолио

Одностраничный сайт-портфолио в терминальном стиле: тёмная тема, ASCII-котик,
который лижет лапку, typewriter-эффект `$ whoami`. Чистая статика без сборки
и зависимостей: HTML + CSS + vanilla JS.

Живёт на https://realkaniewest.github.io (GitHub Pages).

## Локальный запуск

```
python -m http.server 8080
```

и открыть http://localhost:8080

## Структура

- `index.html` — вся разметка
- `css/style.css` — тёмная терминальная тема (JetBrains Mono + Unbounded)
- `js/main.js` — кадры котика, typewriter, появление секций
- `tools/` — скрипты скриншот-проверки (Playwright)
