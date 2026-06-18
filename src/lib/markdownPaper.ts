export interface MarkdownTocEntry {
  level: "section" | "subsection";
  number: string;
  title: string;
  id: string;
}

export interface RenderedMarkdownPaper {
  title: string;
  abstractHtml: string;
  bodyHtml: string;
  tocEntries: MarkdownTocEntry[];
}

interface RenderOptions {
  idPrefix?: string;
}

interface RenderState {
  idPrefix: string;
  tocEntries: MarkdownTocEntry[];
  inReferences: boolean;
}

export function renderMarkdownPaper(markdown: string, options: RenderOptions = {}): RenderedMarkdownPaper {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  const title = normalized.match(/^#\s+(.+)$/m)?.[1].trim() ?? "Untitled";
  const abstractMatch = normalized.match(/^##\s+Abstract\s*$/m);

  if (!abstractMatch || abstractMatch.index === undefined) {
    throw new Error("Missing Markdown paper abstract");
  }

  const afterAbstract = normalized.slice(abstractMatch.index + abstractMatch[0].length).trimStart();
  const nextSection = afterAbstract.match(/^##\s+/m);
  const abstractSource =
    nextSection && nextSection.index !== undefined ? afterAbstract.slice(0, nextSection.index) : afterAbstract;
  const bodySource =
    nextSection && nextSection.index !== undefined ? afterAbstract.slice(nextSection.index) : "";

  const state: RenderState = {
    idPrefix: options.idPrefix ?? "",
    tocEntries: [],
    inReferences: false,
  };

  return {
    title,
    abstractHtml: renderBlocks(abstractSource, state, false),
    bodyHtml: renderBlocks(bodySource, state, true),
    tocEntries: state.tocEntries,
  };
}

export function markdownSlugify(value: string) {
  return value
    .toLowerCase()
    .replace(/\\\([^)]*\\\)/g, "")
    .replace(/\$[^$]*\$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderBlocks(source: string, state: RenderState, collectToc: boolean) {
  const lines = source.split("\n");
  const html: string[] = [];
  const paragraph: string[] = [];

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text) html.push(`<p>${formatInline(text)}</p>`);
    paragraph.length = 0;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    if (line === "\\newpage" || line.startsWith(">")) {
      flushParagraph();
      continue;
    }

    if (line === "$$") {
      flushParagraph();
      const mathLines: string[] = [];
      while (index + 1 < lines.length) {
        index += 1;
        if (lines[index].trim() === "$$") break;
        mathLines.push(lines[index]);
      }
      html.push(`<div class="math-display">\\[\n${escapeHtml(mathLines.join("\n"))}\n\\]</div>`);
      continue;
    }

    const headingMatch = line.match(/^(#{2,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      const markdownLevel = headingMatch[1].length;
      const title = stripHeadingMarkup(headingMatch[2]);
      state.inReferences = title === "References";
      const htmlLevel = Math.min(markdownLevel, 4);
      const id = prefixedId(state.idPrefix, title);
      html.push(`<h${htmlLevel} id="${id}">${formatInline(title)}</h${htmlLevel}>`);

      if (collectToc && (markdownLevel === 2 || markdownLevel === 3)) {
        state.tocEntries.push({
          level: markdownLevel === 2 ? "section" : "subsection",
          number: extractHeadingNumber(title),
          title: stripLeadingNumber(title),
          id,
        });
      }
      continue;
    }

    if (state.inReferences && /^\[[^\]]+\]\s+/.test(line)) {
      flushParagraph();
      const referenceLines = [line];
      while (index + 1 < lines.length && /^\[[^\]]+\]\s+/.test(lines[index + 1].trim())) {
        index += 1;
        referenceLines.push(lines[index].trim());
      }
      html.push(renderReferences(referenceLines));
      continue;
    }

    if (line.startsWith("|") && index + 1 < lines.length && /^\|\s*-/.test(lines[index + 1].trim())) {
      flushParagraph();
      const tableLines = [line, lines[index + 1].trim()];
      index += 1;
      while (index + 1 < lines.length && lines[index + 1].trim().startsWith("|")) {
        index += 1;
        tableLines.push(lines[index].trim());
      }
      html.push(renderTable(tableLines));
      continue;
    }

    const listMatch = line.match(/^(\*|\d+\.)\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      const ordered = listMatch[1] !== "*";
      const items = [listMatch[2]];

      while (index + 1 < lines.length) {
        const next = lines[index + 1].trim();
        const nextItem = next.match(/^(\*|\d+\.)\s+(.+)$/);
        if (nextItem && (nextItem[1] !== "*") === ordered) {
          index += 1;
          items.push(nextItem[2]);
          continue;
        }
        if (!next && index + 2 < lines.length) {
          const afterBlank = lines[index + 2].trim();
          const afterBlankItem = afterBlank.match(/^(\*|\d+\.)\s+(.+)$/);
          if (afterBlankItem && (afterBlankItem[1] !== "*") === ordered) {
            index += 2;
            items.push(afterBlankItem[2]);
            continue;
          }
        }
        break;
      }

      html.push(renderList(items, ordered));
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  return html.join("\n");
}

function renderReferences(lines: string[]) {
  const items = lines.map((line) => {
    const match = line.match(/^\[([^\]]+)\]\s+(.+)$/);
    if (!match) return `<li>${formatInline(line)}</li>`;
    return `<li><span class="paper-ref-label">[${escapeHtml(match[1])}]</span> ${formatInline(match[2])}</li>`;
  });

  return `<ol class="paper-reference-list">${items.join("")}</ol>`;
}

function renderTable(lines: string[]) {
  const rows = lines
    .filter((_, index) => index !== 1)
    .map((line) =>
      line
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((cell) => cell.trim())
    );
  const [head, ...body] = rows;

  return `<div class="paper-table-wrap"><table class="paper-table"><thead><tr>${head
    .map((cell) => `<th>${formatInline(cell)}</th>`)
    .join("")}</tr></thead><tbody>${body
    .map((row) => `<tr>${row.map((cell) => `<td>${formatInline(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;
}

function renderList(items: string[], ordered: boolean) {
  const tag = ordered ? "ol" : "ul";
  return `<${tag}>${items.map((item) => `<li>${formatInline(item)}</li>`).join("")}</${tag}>`;
}

function formatInline(value: string) {
  const normalized = value.replace(/\*\*Proof\*\*/g, "<strong>Proof.</strong>");
  const mathified = normalizeInlineMath(normalized);
  const tokens: string[] = [];
  const protectedText = mathified.replace(/\\\((.+?)\\\)/g, (_, math: string) => {
    const token = `@@MATH${tokens.length}@@`;
    tokens.push(`\\(${escapeHtml(math)}\\)`);
    return token;
  });

  let html = escapeHtml(protectedText)
    .replace(/&lt;strong&gt;(.+?)&lt;\/strong&gt;/g, "<strong>$1</strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");

  tokens.forEach((token, index) => {
    html = html.replace(`@@MATH${index}@@`, token);
  });

  return html;
}

function normalizeInlineMath(value: string) {
  let normalized = "";

  for (let index = 0; index < value.length; index += 1) {
    if (value[index] !== "(") {
      normalized += value[index];
      continue;
    }

    const end = findMatchingParen(value, index);
    if (end < 0) {
      normalized += value[index];
      continue;
    }

    const content = value.slice(index + 1, end);
    if (content.length <= 160 && looksLikeMath(content)) {
      normalized += `\\(${content}\\)`;
    } else {
      normalized += value.slice(index, end + 1);
    }
    index = end;
  }

  return normalized;
}

function looksLikeMath(value: string) {
  const trimmed = value.trim();
  if (!trimmed || /[.;:]$/.test(trimmed)) return false;
  if (/[\\_^{}=<>|]/.test(trimmed)) return true;
  if (/^[A-Za-z][A-Za-z0-9]*[,'][A-Za-z0-9,']*$/.test(trimmed)) return true;
  if (/^[A-Za-z]$/.test(trimmed)) return true;
  if (/^[A-Za-z]+_\d+$/.test(trimmed)) return true;
  return false;
}

function findMatchingParen(value: string, start: number) {
  let depth = 0;

  for (let index = start; index < value.length; index += 1) {
    if (value[index] === "\n") return -1;
    if (value[index] === "(") depth += 1;
    if (value[index] === ")") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  return -1;
}

function stripHeadingMarkup(value: string) {
  return value.replace(/\*\*/g, "").trim();
}

function extractHeadingNumber(title: string) {
  return title.match(/^(\d+(?:\.\d+)*)\.?/)?.[1] ?? "";
}

function stripLeadingNumber(title: string) {
  return title.replace(/^\d+(?:\.\d+)*\.?\s*/, "");
}

function prefixedId(prefix: string, value: string) {
  const slug = markdownSlugify(value);
  return prefix ? `${prefix}-${slug}` : slug;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
