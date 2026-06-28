export type Locale = "en" | "it";

export type LocalizedText = Record<Locale, string>;

export type DraftVisual =
  | {
      kind: "concept";
      items: string[];
      bits: string[];
    }
  | {
      kind: "board";
      cells: string[];
      bits: string[];
      large?: boolean;
    };

export interface Draft {
  slug: string;
  href: string;
  title: LocalizedText;
  description: LocalizedText;
  dateTime: string;
  visual: DraftVisual;
}

export function formatDraftDate(dateTime: string, locale: Locale = "en") {
  return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${dateTime}T00:00:00`));
}

const homeBoard = Array.from({ length: 64 }, (_, index) => {
  if (index === 27) return "Q";
  if (index === 36) return "k";
  if (index === 60) return "K";
  return "";
});

const chessStartBoard = [
  "r", "n", "b", "q", "k", "b", "n", "r",
  "p", "p", "p", "p", "p", "p", "p", "p",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "P", "P", "P", "P", "P", "P", "P", "P",
  "R", "N", "B", "Q", "K", "B", "N", "R"
];

export const drafts = [
  {
    slug: "morra-cinese-con-svantaggio",
    href: "/drafts/morra-cinese-con-svantaggio.html",
    title: {
      en: "Rock-paper-scissors with a disadvantage",
      it: "Morra cinese con svantaggio"
    },
    description: {
      en: "A game-theoretic note on a rock-paper-scissors variant where one player cannot play scissors, reducing the game to guessing a positive integer.",
      it: "Una nota di teoria dei giochi su una variante della morra cinese in cui un giocatore non può giocare forbici, ridotta al problema di indovinare un intero positivo."
    },
    dateTime: "2026-06-28",
    visual: {
      kind: "concept",
      items: ["paper ties", "scissors turn", "guess N", "1/N"],
      bits: ["A", "B", "p > 0"]
    }
  },
  {
    slug: "half-bit-storage",
    href: "/drafts/half-bit-storage.html",
    title: {
      en: "Half bit storage",
      it: "Storage da mezzo bit"
    },
    description: {
      en: "A defective one-bit storage cell loses a continuous amount of useful information as read noise increases; Shannon entropy pinpoints the flip probability that leaves half a bit.",
      it: "Una cella di memoria difettosa perde una quantità continua di informazione utile al crescere del rumore di lettura; l'entropia di Shannon individua la probabilità di flip che lascia mezzo bit."
    },
    dateTime: "2026-06-14",
    visual: {
      kind: "concept",
      items: ["bit", "flip p", "H(p)", "1 - H"],
      bits: ["0", "1", "p = 11%", "0.5 bit"]
    }
  },
  {
    slug: "gioco-numero-piu-grande",
    href: "/drafts/gioco-numero-piu-grande.html",
    title: {
      en: "Largest Number Game",
      it: "Gioco del numero più grande"
    },
    description: {
      en: "A draft about short descriptions, enormous numbers, and Ackermann-style recursion.",
      it: "Una bozza su un gioco di descrizioni corte, numeri enormi e ricorsioni alla Ackermann."
    },
    dateTime: "2026-06-13",
    visual: {
      kind: "concept",
      items: ["50 ASCII", "Ackermann", "hyperoperators", "hill king"],
      bits: ["9!", "↑³⁶²⁸⁸¹", "~"]
    }
  },
  {
    slug: "meta-theory",
    href: "/drafts/meta-theory.html",
    title: {
      en: "Game META theory",
      it: "Teoria del Meta"
    },
    description: {
      en: "A draft about populations of strategies, game graphs, simplex dynamics, and categorical operations.",
      it: "Una bozza su popolazioni di strategie, grafi di gioco, dinamiche nel simplesso e operazioni categoriali."
    },
    dateTime: "2021-12-01",
    visual: {
      kind: "concept",
      items: ["strategies", "payoff graph", "simplex flow", "quotients"],
      bits: ["s′", "As", "⊙s"]
    }
  },
  {
    slug: "cool-prime-formula",
    href: "/drafts/cool-prime-formula.html",
    title: {
      en: "A cool formula with primes",
      it: "Una formula carina con i numeri primi"
    },
    description: {
      en: "An informal heuristic about primes, written as a nested formula and compressed into an infinite product.",
      it: "Un'euristica informale sui numeri primi, scritta come formula annidata e poi compressa in una produttoria."
    },
    dateTime: "2026-06-12",
    visual: {
      kind: "concept",
      items: ["2", "3", "5", "7..."],
      bits: ["1/p", "∏(1-1/p)", "0"]
    }
  },
  {
    slug: "chess-encoding",
    href: "/drafts/chess-encoding.html",
    title: {
      en: "Chess encoding",
      it: "Codifica degli scacchi"
    },
    description: {
      en: "Encoding chess moves, positions, games, and game graphs using as few bits as reasonably possible while keeping positions readable and reconstructible.",
      it: "Codificare mosse, posizioni, partite e grafi di partite di scacchi con il minor numero di bit ragionevole, senza perdere leggibilità e ricostruibilità."
    },
    dateTime: "2026-06-10",
    visual: {
      kind: "board",
      cells: homeBoard,
      bits: ["10", "0110", "111001"]
    }
  }
] as const satisfies readonly Draft[];

export function getDraft(slug: string): Draft {
  const draft = drafts.find((item) => item.slug === slug);

  if (!draft) {
    throw new Error(`Draft not found: ${slug}`);
  }

  return draft;
}

export function getArticleVisual(slug: string): DraftVisual {
  if (slug === "chess-encoding") {
    return {
      kind: "board",
      cells: chessStartBoard,
      bits: ["1", "000100", "111100", "0011010011"],
      large: true
    };
  }

  return getDraft(slug).visual;
}
