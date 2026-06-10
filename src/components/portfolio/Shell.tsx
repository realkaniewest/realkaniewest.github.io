import { FormEvent, KeyboardEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface PetApi {
  toDog: () => void;
  toCat: () => void;
  isDog: () => boolean;
}

type FsNode = string | { [name: string]: FsNode };
type RowKind = "plain" | "cmd" | "err" | "muted" | "ok" | "listing";
type Row = { id: number; kind: RowKind; text?: string; items?: { name: string; dir: boolean }[] };

const FS: Record<string, FsNode> = {
  "about.txt": [
    "realkaniewest, фриланс-разработчик.",
    "Бэкенд, парсеры, интеграции, автоматизация.",
    "Превращаю рутину в скрипты, которые тихо работают на сервере.",
  ].join("\n"),
  "stack.txt": "Python | PHP | JavaScript | Selenium | REST API | Google Sheets API | OpenCart | Bitrix24 | Telegram-боты | Linux/VPS | MySQL/SQLite | systemd",
  "contact.txt": [
    "telegram : https://t.me/realkaniewest2",
    "email    : isokokluu@gmail.com",
    "kwork    : realkaniewest (рейтинг 5.0)",
  ].join("\n"),
  projects: {
    "food-automation.md": "Автоматизация закупок сети ресторанов: парсер GFS + заказы Яндекс.Еды сами падают в СКИФ CRM с оплатой. Python, Selenium, systemd.",
    "b24-marketplaces.md": "Ozon и Wildberries в Битрикс24: заказы и статусы доставки синхронизируются без рук. PHP, REST API.",
    "avito-parser.md": "Парсер Avito: ежедневный сбор по 10 категориям, загрузка с фото, автоодобрение. Python, Selenium, SQLite.",
    "wb-analytics.md": "Аналитика Wildberries в Google Sheets: продажи и остатки обновляются сами. Python, Google Sheets API.",
    "ocstore-crm.md": "Доработки магазина на OCStore: СКИФ CRM, бонусы, SMS, починка оплат. PHP, MySQL.",
    "yafood-ui.md": "Интерфейс заказа в стиле Яндекс.Еды на домене сети ресторанов. PHP, JS, CSS.",
  },
  cats: {
    "README.txt": "Породы котов, которых я уважаю. cat <имя>.txt",
    "maine-coon.txt": "Мейн-кун: пушистый гигант до 12 кг, любит воду и поговорить. Пушистость 10/10.",
    "british-shorthair.txt": "Британец: плюшевый, вечно слегка недоволен, но это любя.",
    "sphynx.txt": "Сфинкс: лысый, тёплый как грелка, требует свитер и внимания.",
    "bengal.txt": "Бенгал: мини-леопард, энергии как у трёх котов, обожает воду и хаос.",
    "siamese.txt": "Сиам: громкий комментатор всего происходящего в доме.",
  },
  dogs: {
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

const COMMANDS: Record<string, string> = {
  help: "список команд",
  ls: "список файлов (ls -a - со скрытыми)",
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
  rm: "ничего не удаляет",
};

const isDir = (node: FsNode | undefined): node is Record<string, FsNode> => Boolean(node && typeof node === "object");
const prettyPath = (parts: string[]) => (parts.length ? "~/" + parts.join("/") : "~");
const homePath = (parts: string[]) => "/home/realkaniewest" + (parts.length ? "/" + parts.join("/") : "");

function nodeAt(parts: string[]) {
  let node: FsNode | undefined = FS;
  for (const part of parts) {
    if (isDir(node) && part in node) node = node[part];
    else return undefined;
  }
  return node;
}

function resolvePath(arg: string, cwd: string[]) {
  let parts = arg.startsWith("/") ? [] : cwd.slice();
  let value = arg;
  if (value === "~" || value.startsWith("~")) {
    parts = [];
    value = value.replace(/^~\/?/, "");
  }
  for (const seg of value.split("/")) {
    if (!seg || seg === ".") continue;
    if (seg === "..") parts.pop();
    else parts.push(seg);
  }
  return parts;
}

function Prompt({ cwd }: { cwd: string[] }) {
  return (
    <span className="term__ps1">
      <span className="term__ps1-user">realkaniewest@dev</span>
      <span className="term__ps1-path">:{prettyPath(cwd)}</span>
      <span className="term__ps1-tail">$</span>
    </span>
  );
}

export function Shell({ petApi, mounted, onPathChange }: { petApi: React.MutableRefObject<PetApi | null>; mounted: boolean; onPathChange: (path: string) => void }) {
  const [cwd, setCwd] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histPos, setHistPos] = useState(0);
  const shellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);

  const addRow = (row: Omit<Row, "id">) => setRows((current) => [...current, { id: ++idRef.current, ...row }]);
  const addText = (text: string, kind: RowKind = "plain") => addRow({ kind, text });

  useEffect(() => onPathChange("realkaniewest@dev: " + prettyPath(cwd)), [cwd, onPathChange]);
  useEffect(() => { shellRef.current?.scrollTo({ top: shellRef.current.scrollHeight }); }, [rows]);

  const handlers = useMemo(() => ({
    help: () => {
      addText("Доступные команды:", "ok");
      Object.entries(COMMANDS).forEach(([name, desc]) => addText("  " + name.padEnd(9) + " - " + desc, "muted"));
      addText("Подсказки: Tab - автодополнение, стрелки вверх/вниз - история.", "muted");
    },
    ls: (args: string[]) => {
      const showHidden = args.includes("-a");
      const pathArg = args.find((arg) => !arg.startsWith("-"));
      const parts = pathArg ? resolvePath(pathArg, cwd) : cwd.slice();
      const node = nodeAt(parts);
      if (node === undefined) return addText("ls: нет такого пути: " + pathArg, "err");
      if (!isDir(node)) return addText(pathArg || "", "plain");
      const items = Object.keys(node).filter((name) => showHidden || !name.startsWith(".")).sort().map((name) => ({ name, dir: isDir(node[name]) }));
      if (!items.length) return addText("(пусто)", "muted");
      addRow({ kind: "listing", items });
    },
    cd: (args: string[]) => {
      const target = args[0];
      if (!target || target === "~") return setCwd([]);
      const parts = resolvePath(target, cwd);
      const node = nodeAt(parts);
      if (node === undefined) return addText("cd: нет такой папки: " + target, "err");
      if (!isDir(node)) return addText("cd: это не папка: " + target, "err");
      setCwd(parts);
    },
    pwd: () => addText(homePath(cwd)),
    cat: (args: string[]) => {
      if (!args[0]) return addText("cat: укажи файл", "err");
      const node = nodeAt(resolvePath(args[0], cwd));
      if (node === undefined) return addText("cat: нет такого файла: " + args[0], "err");
      if (isDir(node)) return addText("cat: это папка: " + args[0], "err");
      addText(node);
    },
    tree: () => {
      const node = nodeAt(cwd);
      addText(prettyPath(cwd), "ok");
      const walk = (current: Record<string, FsNode>, prefix: string) => {
        const keys = Object.keys(current).filter((key) => !key.startsWith("."));
        keys.forEach((key, index) => {
          const last = index === keys.length - 1;
          addText(prefix + (last ? "└── " : "├── ") + (isDir(current[key]) ? key + "/" : key), "muted");
          if (isDir(current[key])) walk(current[key], prefix + (last ? "    " : "│   "));
        });
      };
      if (isDir(node)) walk(node, "");
    },
    echo: (args: string[]) => addText(args.join(" ")),
    whoami: () => addText("realkaniewest", "ok"),
    contact: () => {
      addText("telegram : https://t.me/realkaniewest2", "ok");
      addText("email    : isokokluu@gmail.com", "ok");
    },
    neofetch: () => [
      "        /\\_/\\     realkaniewest@dev",
      "       ( o.o )    -----------",
      "        > ^ <     ОС: GhostOS (терминальная)",
      "       /     \\    оболочка: kaniesh 1.0",
      "      ( | | | )   стек: Python, PHP, JS",
      "       \\_m_m_/    редактор: vim (btw)",
      "                  питомец: кот (клик по нему!)",
    ].forEach((line) => addText(line, "ok")),
    clear: () => setRows([]),
    history: () => history.forEach((item, index) => addText("  " + (index + 1) + "  " + item, "muted")),
    sudo: (args: string[]) => args.length ? addText("realkaniewest не в файле sudoers. Об инциденте доложено. (шутка)", "err") : addText("usage: sudo <команда>", "muted"),
    pet: () => {
      const api = petApi.current;
      if (!api) return addText("питомец спит :)", "muted");
      addText(api.isDog() ? "пёс виляет хвостом, язык наружу :Р" : "кот жмурится и мурлычет... ", "ok");
    },
    woof: () => {
      const api = petApi.current;
      if (api && !api.isDog()) { api.toDog(); addText("...кот превращается в пса. woof!", "ok"); }
      else addText("он и так пёс. woof!", "muted");
    },
    meow: () => {
      const api = petApi.current;
      if (api && api.isDog()) { api.toCat(); addText("...пёс снова стал котом. meow!", "ok"); }
      else addText("кот и так на месте. meow!", "muted");
    },
    rm: (args: string[]) => {
      if (args.includes("-rf") && (args.includes("/") || args.includes("/*"))) return addText("ну уж нет :) этот терминал бессмертен.", "err");
      addText("rm: тут нечего удалять, это витрина.", "muted");
    },
  }), [cwd, history, petApi]);

  const runCommand = (raw: string) => {
    addRow({ kind: "cmd", text: raw });
    const trimmed = raw.trim();
    if (trimmed) {
      setHistory((current) => [...current, trimmed]);
      setHistPos(history.length + 1);
    }
    if (!trimmed) return;
    const tokens = trimmed.split(/\s+/);
    const cmd = tokens[0].toLowerCase();
    const args = tokens.slice(1);
    const handler = handlers[cmd as keyof typeof handlers] as ((args: string[]) => void) | undefined;
    if (handler) handler(args);
    else addText(cmd + ": команда не найдена. набери help", "err");
  };

  const complete = () => {
    const tokens = input.split(/\s+/);
    const editing = tokens[tokens.length - 1];
    const pool = tokens.length <= 1 ? Object.keys(COMMANDS) : Object.keys(nodeAt(cwd) as Record<string, FsNode> || {});
    const matches = pool.filter((name) => name.startsWith(editing));
    if (matches.length === 1) {
      tokens[tokens.length - 1] = matches[0];
      setInput(tokens.join(" "));
    } else if (matches.length > 1) {
      addText(matches.join("   "), "muted");
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = input;
    setInput("");
    runCommand(value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHistPos((pos) => {
        const next = Math.max(0, pos - 1);
        setInput(history[next] || "");
        return next;
      });
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setHistPos((pos) => {
        const next = Math.min(history.length, pos + 1);
        setInput(history[next] || "");
        return next;
      });
    } else if (event.key === "Tab") {
      event.preventDefault();
      complete();
    }
  };

  const focusInput = (event: MouseEvent<HTMLDivElement>) => {
    if (window.getSelection && String(window.getSelection())) return;
    if (event.target instanceof HTMLInputElement) return;
    inputRef.current?.focus();
  };

  if (!mounted) return null;

  return (
    <div ref={shellRef} className="term__shell" onClick={focusInput}>
      <div className="term__hint">это рабочий терминал. набери <code>help</code> и жми Enter.</div>
      {rows.map((row) => {
        if (row.kind === "cmd") {
          return <div key={row.id} className="term__row term__row--cmd"><Prompt cwd={cwd} /> {row.text}</div>;
        }
        if (row.kind === "listing") {
          return <div key={row.id} className="term__row">{row.items?.map((item, index) => <span key={item.name} className={item.dir ? "term__dir" : "term__file"}>{item.name}{item.dir ? "/" : ""}{index < (row.items?.length || 0) - 1 ? "   " : ""}</span>)}</div>;
        }
        return <div key={row.id} className={cn("term__row", row.kind !== "plain" && `term__row--${row.kind}`)}>{row.text}</div>;
      })}
      <form className="term__promptline" onSubmit={onSubmit}>
        <Prompt cwd={cwd} />
        <input
          ref={inputRef}
          className="term__input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          maxLength={120}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Командная строка"
        />
      </form>
    </div>
  );
}
