(() => {
  document.documentElement.classList.add("js");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  const catStand = (legs) => [
    "     /\\_/\\",
    "    ( o.o )",
    "     > ^ <",
    "    |     |",
    "    |     |",
    `    ${legs}`,
    "",
  ];

  const C = {
    idle:  catSit(),
    blink: catSit({ eyes: "-.-" }),
    tail:  catSit({ tail: "--'" }),
    pawup: catSit({ paw: true, paws: "| |  " }),
    lick1: catSit({ eyes: "-.o", mouth: "> u <", paw: true, paws: "| |  " }),
    lick2: catSit({ eyes: "-.o", mouth: "> w <", paw: true, paws: "| |  " }),
    standA: catStand("/\\   /\\"),
    standB: catStand(" |\\ /| "),
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

  const WALK_END = 20; // на сколько колонок уходит вправо
  const GLITCH = "#*+%@.";

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
      const dir = to > from ? 2 : -2;
      let leg = false;
      for (let off = from; dir > 0 ? off < to : off > to; off += dir) {
        steps.push([leg ? C.standA : C.standB, off, 150]);
        leg = !leg;
      }
    };
    lickCycle(0, true);
    steps.push([C.standA, 0, 350]);
    walk(0, WALK_END);
    steps.push([C.standB, WALK_END, 350]);
    lickCycle(WALK_END, false);
    steps.push([C.standA, WALK_END, 350]);
    walk(WALK_END, 0);
    steps.push([C.standB, 0, 350]);
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
      catEl.addEventListener("click", () => {
        mode = mode === "cat" ? "dog" : "cat";
        render(mode === "dog" ? D.wagA : C.idle, 0);
      });
    } else {
      catEl.addEventListener("click", () => {
        if (mode === "cat") {
          const [lines, off] = lastCatFrame;
          morph(lines, off, D.wagA, 0, startDog);
        } else if (mode === "dog") {
          morph(D.wagA, 0, C.idle, 0, startCat);
        }
      });
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

  function finishShell() {
    const line = document.createElement("div");
    line.className = "term__line";
    line.innerHTML = '<span class="term__prompt">$</span>&nbsp;';
    outEl.after(line);
    line.appendChild(cursorEl);
  }

  if (typedEl && outEl) {
    if (reduceMotion) {
      typedEl.textContent = command;
      outEl.textContent = output.join("\n");
      finishShell();
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
              cursorEl.style.display = "";
              finishShell();
            }
          };
          setTimeout(printLine, 350);
        }
      };
      setTimeout(typeChar, 700);
    }
  }

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
