export type PetFrame = string[];
export type ProgramStep = [PetFrame, number, number];

export const pad = (n: number) => " ".repeat(Math.max(0, n));

const catSit = ({ eyes = "o.o", mouth = "> ^ <", paw = false, paws = "| | |", tail = "--," } = {}) => [
  "",
  "     /\\_/\\",
  `    ( ${eyes} )${paw ? "," : ""}`,
  `     ${mouth}${paw ? "/" : ""}`,
  "    /     \\",
  `   ( ${paws} )`,
  `    \\_m_m_/${tail}`,
];

const catWalkRight = (stride: boolean) => {
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

const catWalkLeft = (stride: boolean) => {
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

export const C = {
  idle: catSit(),
  blink: catSit({ eyes: "-.-" }),
  tail: catSit({ tail: "--'" }),
  pawup: catSit({ paw: true, paws: "| |  " }),
  lick1: catSit({ eyes: "-.o", mouth: "> u <", paw: true, paws: "| |  " }),
  lick2: catSit({ eyes: "-.o", mouth: "> w <", paw: true, paws: "| |  " }),
  walkR0: catWalkRight(false),
  walkR1: catWalkRight(true),
  walkL0: catWalkLeft(false),
  walkL1: catWalkLeft(true),
};

const dogScene = (tailChar: string, eyes = "o.o") => [
  "",
  "   n____n         /\\",
  `  ( ${eyes}  )       /  \\`,
  "   \\_U__/       /____\\",
  "  /      \\      | __ |",
  " ( | |  | )     ||  ||",
  `  \\_w_w_/--${tailChar}    ||__||  (__)`,
];

export const D = {
  wagA: dogScene("~"),
  wagB: dogScene("/"),
  wagC: dogScene("\\"),
  blink: dogScene("~", "-.-"),
};

const WALK_END = 12;
export const GLITCH = "#*+%@.";

export function buildCatProgram(): ProgramStep[] {
  const steps: ProgramStep[] = [];
  const lickCycle = (off: number, long: boolean) => {
    steps.push([C.idle, off, long ? 1100 : 800], [C.blink, off, 160], [C.idle, off, 700], [C.tail, off, 420]);
    steps.push([C.pawup, off, 380]);
    for (let i = 0; i < (long ? 3 : 2); i += 1) steps.push([C.lick1, off, 300], [C.lick2, off, 300]);
    steps.push([C.pawup, off, 380], [C.idle, off, long ? 1400 : 900], [C.blink, off, 160]);
  };
  const walk = (from: number, to: number) => {
    const right = to > from;
    const dir = right ? 2 : -2;
    const stand = right ? C.walkR0 : C.walkL0;
    const stride = right ? C.walkR1 : C.walkL1;
    steps.push([stand, from, 500]);
    let leg = false;
    for (let off = from; right ? off < to : off > to; off += dir) {
      steps.push([leg ? stride : stand, off, 260]);
      leg = !leg;
    }
    steps.push([stand, to, 500]);
  };
  lickCycle(0, true);
  walk(0, WALK_END);
  lickCycle(WALK_END, false);
  walk(WALK_END, 0);
  return steps;
}

export const dogProgram: ProgramStep[] = [
  [D.wagA, 0, 260], [D.wagB, 0, 260], [D.wagA, 0, 260], [D.wagC, 0, 260],
  [D.wagA, 0, 260], [D.wagB, 0, 260], [D.blink, 0, 180], [D.wagC, 0, 260],
];

export const renderPet = (lines: PetFrame, off: number) => lines.map((line) => pad(off) + line).join("\n");
