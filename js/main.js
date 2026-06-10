(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===== ascii cat ===== */
  const cat = (eyes, mouth, paws, tail) => [
    "     /\\_/\\",
    `    ( ${eyes} )${mouth.paw ? "," : ""}`,
    `     ${mouth.row}${mouth.paw ? "/" : ""}`,
    "    /     \\",
    `   ( ${paws} )`,
    `    \\_m_m_/${tail}`,
  ].join("\n");

  const F = {
    idle:  cat("o.o", { row: "> ^ <" }, "| | |", "--,"),
    blink: cat("-.-", { row: "> ^ <" }, "| | |", "--,"),
    tail:  cat("o.o", { row: "> ^ <" }, "| | |", "--'"),
    pawup: cat("o.o", { row: "> ^ <", paw: true }, "| |  ", "--,"),
    lick1: cat("-.o", { row: "> u <", paw: true }, "| |  ", "--,"),
    lick2: cat("-.o", { row: "> w <", paw: true }, "| |  ", "--,"),
  };

  const playlist = [
    ["idle", 1100], ["blink", 160], ["idle", 900], ["tail", 420],
    ["idle", 1300], ["pawup", 380],
    ["lick1", 300], ["lick2", 300], ["lick1", 300], ["lick2", 300], ["lick1", 300],
    ["pawup", 380], ["idle", 2000], ["blink", 160],
  ];

  const catEl = document.getElementById("cat");
  if (catEl) {
    if (reduceMotion) {
      catEl.textContent = F.idle;
    } else {
      let i = 0;
      const tick = () => {
        const [name, ms] = playlist[i % playlist.length];
        catEl.textContent = F[name];
        i += 1;
        setTimeout(tick, ms);
      };
      tick();
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
    "Kwork: рейтинг 5.0, 8 заказов, 100% в срок",
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
