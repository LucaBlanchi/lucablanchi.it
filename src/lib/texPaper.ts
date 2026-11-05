export interface TocEntry {
  level: "section" | "subsection";
  number: string;
  title: string;
  titleHtml?: string;
  id: string;
}

export interface RenderedTexPaper {
  title: string;
  author: string;
  date: string;
  abstractHtml: string;
  bodyHtml: string;
  bibliographyHtml: string;
  tocEntries: TocEntry[];
}

interface RenderState {
  section: number;
  subsection: number;
  theorem: number;
  citeLabels: Map<string, string>;
  idPrefix: string;
}

export function renderTexPaper(tex: string, options: { idPrefix?: string } = {}): RenderedTexPaper {
  tex = tex.replace(/(\\begin\{(?:theorem|proposition|lemma|corollary|definition|problem|conjecture|remark|example|assumption|principle)\})\[([^\]]+)\]/g,
    (_, begin, title) => `${begin}[${title.replace(/\s+/g, " ")}]`);
  const title = extractRequired(tex, /\\title(?:\[[^\]]*\])?\{([^{}]+)\}/, "title");
  const author = extractRequired(tex, /\\author\{([^{}]+)\}/, "author");
  const date = extractRequired(tex, /\\date\{([^{}]+)\}/, "date");
  const abstractSource = tex.match(/\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/)?.[1] ?? "";
  const bibliographySource =
    tex.match(/\\begin\{thebibliography\}\{[^}]*\}([\s\S]*?)\\end\{thebibliography\}/)?.[1] ??
    "";
  const firstSectionMatch = /\\section\*?\{/.exec(tex);
  const bodyStart = firstSectionMatch?.index ?? -1;
  const bibliographyStart = tex.indexOf("\\begin{thebibliography}");
  const bodyEnd = bibliographyStart >= 0 ? bibliographyStart : tex.indexOf("\\end{document}");
  let bodySource = bodyStart >= 0 && bodyEnd > bodyStart ? tex.slice(bodyStart, bodyEnd) : "";
  const appendixStart = bodySource.indexOf("\\appendix");
  if (appendixStart >= 0) {
    let appendix = 0;
    bodySource = bodySource.slice(0, appendixStart) + bodySource.slice(appendixStart)
      .replace("\\appendix", "")
      .replace(/\\section\{(.+)\}/g, (_, title) => `\\section*{${String.fromCharCode(65 + appendix++)} ${title}}`);
  }
  const citeLabels = collectCiteLabels(bibliographySource);
  const idPrefix = options.idPrefix ?? "";
  const tocEntries = collectToc(bodySource, idPrefix);
  const state: RenderState = {
    section: 0,
    subsection: 0,
    theorem: 0,
    citeLabels,
    idPrefix,
  };

  tocEntries.forEach((entry) => { entry.titleHtml = formatInline(entry.title, state); });

  return {
    title,
    author,
    date,
    abstractHtml: renderFragment(abstractSource, state),
    bodyHtml: renderFragment(bodySource, state),
    bibliographyHtml: renderBibliography(bibliographySource, citeLabels, idPrefix),
    tocEntries,
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/\\\([^)]*\\\)/g, "")
    .replace(/\$[^$]*\$/g, "")
    .replace(/\\[a-zA-Z]+\*?\{?([^{}]*)\}?/g, "$1")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractRequired(source: string, pattern: RegExp, label: string) {
  const match = source.match(pattern);
  if (!match) throw new Error(`Missing TeX ${label}`);
  return match[1].trim();
}

function collectCiteLabels(source: string) {
  const labels = new Map<string, string>();
  const regex = /\\bibitem(?:\[([^\]]+)\])?\{([^}]+)\}/g;
  let index = 1;
  for (const match of source.matchAll(regex)) {
    labels.set(match[2], match[1] ?? String(index));
    index += 1;
  }
  return labels;
}

function collectToc(source: string, idPrefix: string): TocEntry[] {
  const sectionTitlePattern = /^\\(section|subsection)(\*)?\{(.+)\}\s*$/gm;
  const entries: TocEntry[] = [];
  let section = 0;
  let subsection = 0;

  for (const match of source.matchAll(sectionTitlePattern)) {
    const level = match[1] as "section" | "subsection";
    const isStarred = Boolean(match[2]);
    const title = match[3];
    if (isStarred) {
      entries.push({ level, number: "", title, id: prefixedId(idPrefix, title) });
      continue;
    }

    if (level === "section") {
      section += 1;
      subsection = 0;
      entries.push({ level, number: String(section), title, id: prefixedId(idPrefix, `${section}-${title}`) });
    } else {
      subsection += 1;
      entries.push({
        level,
        number: `${section}.${subsection}`,
        title,
        id: prefixedId(idPrefix, `${section}-${subsection}-${title}`),
      });
    }
  }

  return entries;
}

function renderFragment(source: string, state: RenderState): string {
  const lines = source.trim().split(/\r?\n/);
  const html: string[] = [];
  const paragraph: string[] = [];

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text) html.push(`<p>${formatInline(text, state)}</p>`);
    paragraph.length = 0;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    if (line === "\\maketitle" || line === "\\tableofcontents") {
      flushParagraph();
      continue;
    }

    const sectionMatch = line.match(/^\\section(\*)?\{(.+)\}$/);
    if (sectionMatch) {
      flushParagraph();
      const isStarred = Boolean(sectionMatch[1]);
      const title = sectionMatch[2];
      if (isStarred) {
        html.push(`<h2 id="${prefixedId(state.idPrefix, title)}">${formatInline(title, state)}</h2>`);
      } else {
        state.section += 1;
        state.subsection = 0;
        state.theorem = 0;
        html.push(`<h2 id="${prefixedId(state.idPrefix, `${state.section}-${title}`)}">${state.section} ${formatInline(title, state)}</h2>`);
      }
      continue;
    }

    const subsectionMatch = line.match(/^\\subsection(\*)?\{(.+)\}$/);
    if (subsectionMatch) {
      flushParagraph();
      const isStarred = Boolean(subsectionMatch[1]);
      const title = subsectionMatch[2];
      if (isStarred) {
        html.push(`<h3 id="${prefixedId(state.idPrefix, title)}">${formatInline(title, state)}</h3>`);
      } else {
        state.subsection += 1;
        html.push(
          `<h3 id="${prefixedId(state.idPrefix, `${state.section}-${state.subsection}-${title}`)}">${state.section}.${state.subsection} ${formatInline(title, state)}</h3>`
        );
      }
      continue;
    }

    const paragraphHeading = line.match(/^\\paragraph\{(.+)\}$/);
    if (paragraphHeading) {
      flushParagraph();
      html.push(`<p class="paper-statement-label">${formatInline(paragraphHeading[1], state)}</p>`);
      continue;
    }

    if (line === "\\[" || line === "\\begin{align*}") {
      flushParagraph();
      const endMarker = line === "\\[" ? "\\]" : "\\end{align*}";
      const mathLines = [line];
      while (index + 1 < lines.length) {
        index += 1;
        mathLines.push(lines[index]);
        if (lines[index].trim() === endMarker) break;
      }
      html.push(`<div class="math-display">${escapeHtml(mathLines.join("\n"))}</div>`);
      continue;
    }

    const environmentMatch = line.match(/^\\begin\{([a-z]+)\}(\[[^\]]+\])?/);
    if (environmentMatch) {
      flushParagraph();
      const environment = environmentMatch[1];
      const optionalTitle = environmentMatch[2]?.slice(1, -1);
      const end = findEnvironmentEnd(lines, index, environment);
      const inner = lines.slice(index + 1, end).join("\n");
      index = end;

      if (environment === "proof") {
        html.push(`<div class="paper-proof"><p class="paper-proof-label">Proof.</p>${renderFragment(inner, state)}</div>`);
        continue;
      }

      if (environment === "enumerate") {
        html.push(renderList(inner, state, "ol", optionalTitle?.includes("\\roman") ? "paper-list-roman" : undefined));
        continue;
      }

      if (environment === "itemize") {
        html.push(renderList(inner, state, "ul"));
        continue;
      }

      if (environment === "description") {
        html.push(renderDescriptionList(inner, state));
        continue;
      }

      if (environment === "center") {
        html.push(renderFragment(inner, state));
        continue;
      }

      if (environment === "tabular") {
        const rows = inner.replace(/\\(?:hline|toprule|midrule|bottomrule)/g, "")
          .split(/\\\\/).map((row) => row.trim()).filter(Boolean);
        html.push(`<div class="paper-table-wrap" tabindex="0" role="region" aria-label="Scrollable table"><table class="paper-table">${rows.map((row, i) =>
          `<tr>${row.split(/(?<!\\)&/).map((cell) => `<${i === 0 ? "th" : "td"}>${formatInline(cell.trim(), state)}</${i === 0 ? "th" : "td"}>`).join("")}</tr>`
        ).join("")}</table></div>`);
        continue;
      }

      const labels: Record<string, string> = {
        theorem: "Theorem",
        proposition: "Proposition",
        lemma: "Lemma",
        corollary: "Corollary",
        definition: "Definition",
        problem: "Problem",
        conjecture: "Conjecture",
        remark: "Remark",
        example: "Example",
        assumption: "Assumption",
        principle: "Principle",
      };

      const label = labels[environment];
      if (label) {
        state.theorem += 1;
        const title = `${label} ${state.section}.${state.theorem}${optionalTitle ? ` (${optionalTitle})` : ""}.`;
        html.push(
          `<section class="paper-statement"><p class="paper-statement-label">${formatInline(title, state)}</p>${renderFragment(inner, state)}</section>`
        );
        continue;
      }

      throw new Error(`Unsupported TeX environment: ${environment}`);
    }

    paragraph.push(line);
  }

  flushParagraph();
  return html.join("\n");
}

function findEnvironmentEnd(lines: string[], start: number, environment: string) {
  let depth = 0;
  for (let index = start; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.includes(`\\begin{${environment}}`)) depth += 1;
    if (line.includes(`\\end{${environment}}`)) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  return start;
}

function renderList(source: string, state: RenderState, tag: "ol" | "ul", className?: string) {
  const items = source
    .split(/\\item(?:\[[^\]]+\])?\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const classAttribute = className ? ` class="${className}"` : "";

  return `<${tag}${classAttribute}>${items.map((item) => `<li>${renderFragment(item, state)}</li>`).join("")}</${tag}>`;
}

function renderDescriptionList(source: string, state: RenderState) {
  const regex = /\\item(?:\[([^\]]+)\])?\s*/g;
  const starts = [...source.matchAll(regex)];
  const items: string[] = [];

  starts.forEach((match, index) => {
    const contentStart = (match.index ?? 0) + match[0].length;
    const contentEnd = starts[index + 1]?.index ?? source.length;
    const label = match[1]?.trim() ?? "";
    const content = source.slice(contentStart, contentEnd).trim();
    items.push(
      `<dt>${label ? formatInline(label, state) : ""}</dt><dd>${renderFragment(content, state)}</dd>`
    );
  });

  return `<dl class="paper-description-list">${items.join("")}</dl>`;
}

function renderBibliography(source: string, citeLabels: Map<string, string>, idPrefix: string) {
  const regex = /\\bibitem(?:\[([^\]]+)\])?\{([^}]+)\}/g;
  const starts = [...source.matchAll(regex)];
  const items: string[] = [];

  starts.forEach((match, index) => {
    const contentStart = (match.index ?? 0) + match[0].length;
    const contentEnd = starts[index + 1]?.index ?? source.length;
    const content = source.slice(contentStart, contentEnd).trim();
    const key = match[2];
    const label = citeLabels.get(key) ?? match[1] ?? String(index + 1);
    items.push(
      `<li id="${refId(idPrefix, key)}"><span class="paper-ref-label">[${label}]</span> ${formatInline(content, { section: 0, subsection: 0, theorem: 0, citeLabels, idPrefix })}</li>`
    );
  });

  return `<ol>${items.join("")}</ol>`;
}

function prefixedId(prefix: string, value: string) {
  const slug = slugify(value);
  return prefix ? `${prefix}-${slug}` : slug;
}

function refId(prefix: string, key: string) {
  return prefix ? `${prefix}-ref-${key}` : `ref-${key}`;
}

let inlineSequence = 0;

function formatInline(value: string, state: RenderState): string {
  const tokens: string[] = [];
  const prefix = `@@INLINE${inlineSequence++}-`;
  const token = (html: string) => { tokens.push(html); return `${prefix}${tokens.length - 1}@@`; };
  let source = value.replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$(?:\\.|[^$])+\$/g, (math) => token(escapeHtml(math)));
  // The printed argument is authoritative; the second is only a PDF bookmark fallback.
  source = source.replace(/\\texorpdfstring\{([^{}]*)\}\{[^{}]*\}/g, "$1");
  const tags: Record<string, string> = { textbf: "strong", emph: "em", textit: "em", texttt: "code", textup: "span", underline: "u", mbox: "span" };
  source = replaceBracedCommands(source, Object.keys(tags), (name, contents) => token(`<${tags[name]}>${formatInline(contents, state)}</${tags[name]}>`));
  let html = escapeHtml(source)
    .replace(/\\(?:noindent|smallskip|medskip|bigskip|newpage|tightlist|sloppy|newblock)\s*/g, "")
    .replace(/\\(?:small|footnotesize)\b/g, "")
    .replace(/\\cite\{([^}]+)\}/g, (_, keys: string) => keys.split(",").map((key) => {
      const trimmed = key.trim();
      return `<a href="#${refId(state.idPrefix, trimmed)}">[${state.citeLabels.get(trimmed) ?? "?"}]</a>`;
    }).join(", "))
    .replace(/\\url\{([^}]+)\}/g, '<a href="$1">$1</a>')
    .replace(/\\href\{([^}]+)\}\{([^}]+)\}/g, '<a href="$1">$2</a>')
    .replace(/\\([%&#_{}])/g, "$1")
    .replace(/\\textbackslash\s*/g, "\\")
    .replace(/``/g, "“").replace(/''/g, "”")
    .replace(/---/g, "—").replace(/--/g, "–")
    .replace(/~/g, "\u00a0");
  // Formatting tokens can contain earlier math tokens.
  for (let i = tokens.length - 1; i >= 0; i -= 1) html = html.replaceAll(`${prefix}${i}@@`, () => tokens[i]);
  return html;
}

function bracedArgument(source: string, start: number) {
  let depth = 0;
  for (let i = start; i < source.length; i += 1) {
    if (source[i] === "\\") { i += 1; continue; }
    if (source[i] === "{") depth += 1;
    if (source[i] === "}" && --depth === 0) return { value: source.slice(start + 1, i), end: i + 1 };
  }
  throw new Error("Unclosed TeX argument");
}

function replaceBracedCommands(source: string, names: string[], replacement: (name: string, value: string) => string) {
  const pattern = new RegExp(`\\\\(${names.join("|")})\\{`, "g");
  let output = "", cursor = 0;
  for (let match; (match = pattern.exec(source));) {
    const argument = bracedArgument(source, pattern.lastIndex - 1);
    output += source.slice(cursor, match.index) + replacement(match[1], argument.value);
    cursor = argument.end;
    pattern.lastIndex = argument.end;
  }
  return output + source.slice(cursor);
}

/** Read MathJax definitions from the downloadable source, not a second per-page copy. */
export function extractTexMacros(tex: string): Record<string, string | [string, number]> {
  const macros: Record<string, string | [string, number]> = {};
  const pattern = /\\(?:newcommand|renewcommand|providecommand|DeclareMathOperator)\*?\{\\(\w+)\}(?:\[(\d+)\])?\s*\{/g;
  for (let match; (match = pattern.exec(tex));) {
    const argument = bracedArgument(tex, pattern.lastIndex - 1);
    const value = match[0].includes("DeclareMathOperator") ? `\\operatorname{${argument.value}}` : argument.value;
    macros[match[1]] = match[2] ? [value, Number(match[2])] : value;
    pattern.lastIndex = argument.end;
  }
  return macros;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
