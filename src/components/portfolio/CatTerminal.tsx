import { useCallback, useEffect, useRef, useState } from "react";
import { C, D, GLITCH, buildCatProgram, dogProgram, pad, renderPet, type PetFrame, type ProgramStep } from "./petFrames";
import { useReducedMotion } from "./useReducedMotion";
import { Shell, type PetApi } from "./Shell";

const command = "whoami";
const output = [
  "realkaniewest - бэкенд-разработчик",
  "Python, PHP, парсеры, интеграции, автоматизация",
  "Kwork: рейтинг 5.0, 100% в срок",
];

type Mode = "cat" | "morph" | "dog";

export function CatTerminal() {
  const reduceMotion = useReducedMotion();
  const [title, setTitle] = useState("realkaniewest@dev: ~");
  const [mode, setMode] = useState<Mode>("cat");
  const modeRef = useRef<Mode>("cat");
  const timerRef = useRef<number | null>(null);
  const lastCatFrameRef = useRef<[PetFrame, number]>([C.idle, 0]);
  const [petText, setPetText] = useState(renderPet(C.idle, 0));
  const [typed, setTyped] = useState("");
  const [typedOut, setTypedOut] = useState("");
  const [shellMounted, setShellMounted] = useState(false);
  const petApiRef = useRef<PetApi | null>(null);

  const setCurrentMode = (next: Mode) => {
    modeRef.current = next;
    setMode(next);
  };

  const clearTimer = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const runProgram = useCallback((factory: () => ProgramStep[], onFrame?: (lines: PetFrame, off: number) => void) => {
    clearTimer();
    const program = factory();
    let index = 0;
    const tick = () => {
      const [lines, off, ms] = program[index % program.length];
      setPetText(renderPet(lines, off));
      onFrame?.(lines, off);
      index += 1;
      timerRef.current = window.setTimeout(tick, ms);
    };
    tick();
  }, []);

  const startCat = useCallback(() => {
    setCurrentMode("cat");
    runProgram(buildCatProgram, (lines, off) => { lastCatFrameRef.current = [lines, off]; });
  }, [runProgram]);

  const startDog = useCallback(() => {
    setCurrentMode("dog");
    runProgram(() => dogProgram);
  }, [runProgram]);

  const morph = useCallback((fromLines: PetFrame, fromOff: number, toLines: PetFrame, toOff: number, done: () => void) => {
    setCurrentMode("morph");
    clearTimer();
    const from = fromLines.map((line) => pad(fromOff) + line);
    const to = toLines.map((line) => pad(toOff) + line);
    const width = Math.max(...from.map((line) => line.length), ...to.map((line) => line.length));
    const steps = 7;
    let step = 0;
    const tick = () => {
      step += 1;
      if (step > steps) {
        done();
        return;
      }
      const progress = step / steps;
      const mixed: string[] = [];
      for (let rowIndex = 0; rowIndex < 7; rowIndex += 1) {
        const a = (from[rowIndex] || "").padEnd(width);
        const b = (to[rowIndex] || "").padEnd(width);
        let row = "";
        for (let col = 0; col < width; col += 1) {
          if (step > 1 && step < steps && Math.random() < 0.05) row += GLITCH[(Math.random() * GLITCH.length) | 0];
          else row += Math.random() < progress ? b[col] : a[col];
        }
        mixed.push(row);
      }
      setPetText(mixed.join("\n"));
      timerRef.current = window.setTimeout(tick, 140);
    };
    tick();
  }, []);

  const toDog = useCallback(() => {
    if (modeRef.current !== "cat") return;
    if (reduceMotion) {
      setCurrentMode("dog");
      setPetText(renderPet(D.wagA, 0));
      return;
    }
    const [lines, off] = lastCatFrameRef.current;
    morph(lines, off, D.wagA, 0, startDog);
  }, [morph, reduceMotion, startDog]);

  const toCat = useCallback(() => {
    if (modeRef.current !== "dog") return;
    if (reduceMotion) {
      setCurrentMode("cat");
      setPetText(renderPet(C.idle, 0));
      return;
    }
    morph(D.wagA, 0, C.idle, 0, startCat);
  }, [morph, reduceMotion, startCat]);

  useEffect(() => {
    petApiRef.current = { toDog, toCat, isDog: () => modeRef.current === "dog" };
  }, [toDog, toCat]);

  useEffect(() => {
    if (reduceMotion) {
      clearTimer();
      setPetText(renderPet(C.idle, 0));
      setCurrentMode("cat");
      return;
    }
    startCat();
    return clearTimer;
  }, [reduceMotion, startCat]);

  useEffect(() => {
    let cancelled = false;
    if (reduceMotion) {
      setTyped(command);
      setTypedOut(output.join("\n"));
      setShellMounted(true);
      return;
    }
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    let char = 0;
    const typeChar = () => {
      if (cancelled) return;
      if (char < command.length) {
        setTyped((current) => current + command[char]);
        char += 1;
        later(typeChar, 90);
      } else {
        let line = 0;
        const printLine = () => {
          if (cancelled) return;
          if (line < output.length) {
            setTypedOut((current) => current + output[line] + "\n");
            line += 1;
            later(printLine, 260);
          } else {
            setShellMounted(true);
          }
        };
        later(printLine, 350);
      }
    };
    later(typeChar, 700);
    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduceMotion]);

  useEffect(() => {
    const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let pos = 0;
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      pos = key === konami[pos] ? pos + 1 : key === konami[0] ? 1 : 0;
      if (pos === konami.length) {
        pos = 0;
        petApiRef.current?.toDog();
        document.documentElement.classList.add("konami");
        window.setTimeout(() => document.documentElement.classList.remove("konami"), 1500);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const togglePet = () => {
    if (modeRef.current === "cat") toDog();
    else if (modeRef.current === "dog") toCat();
  };

  return (
    <div className="term term--hero h-full">
      <div className="term__bar">
        <span className="term__dot term__dot--r" />
        <span className="term__dot term__dot--y" />
        <span className="term__dot term__dot--g" />
        <span className="term__title">{title}</span>
      </div>
      <div className="term__body">
        <button className="term__cat" onClick={togglePet} type="button" aria-label={mode === "dog" ? "Вернуть кота" : "Превратить кота в пса"}>
          {petText}
        </button>
        <div className="term__line"><span className="term__prompt">$</span>&nbsp;<span>{typed}</span>{!shellMounted && <span className="cursor" />}</div>
        <div className="term__out">{typedOut}</div>
        <Shell petApi={petApiRef} mounted={shellMounted} onPathChange={setTitle} />
      </div>
    </div>
  );
}
