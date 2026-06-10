const MATERIAL_ORDER = ["X", "P", "Q", "R", "B", "N"]
const CAT_ORDER = ["P", "Q", "R", "B", "N", "p", "q", "r", "b", "n"]
const CASTLE_ORDER = ["K", "Q", "k", "q"]
const FILES = "abcdefgh"
const C_CACHE = new Map()

function C(n, k) {
  if (k < 0 || k > n) return 0n
  if (k === 0 || k === n) return 1n
  k = Math.min(k, n - k)
  const id = n + "," + k
  if (C_CACHE.has(id)) return C_CACHE.get(id)
  let r = 1n
  for (let i = 1; i <= k; i++) r = r * BigInt(n - k + i) / BigInt(i)
  C_CACHE.set(id, r)
  return r
}

function ceilLog2(x) {
  if (x <= 1n) return 0
  return (x - 1n).toString(2).length
}

function rankCombination(indices, n, k) {
  let r = 0n
  let start = 0
  for (let i = 0; i < k; i++) {
    for (let x = start; x < indices[i]; x++) {
      r += C(n - x - 1, k - i - 1)
    }
    start = indices[i] + 1
  }
  return r
}

function unrankCombination(r, n, k) {
  const res = []
  let start = 0
  for (let i = 0; i < k; i++) {
    for (let x = start; x < n; x++) {
      const count = C(n - x - 1, k - i - 1)
      if (r >= count) r -= count
      else {
        res.push(x)
        start = x + 1
        break
      }
    }
  }
  return res
}

function rankComposition(counts, total, parts) {
  const divs = []
  let s = 0
  for (let i = 0; i < parts - 1; i++) {
    s += counts[i]
    divs.push(s + i)
  }
  return rankCombination(divs, total + parts - 1, parts - 1)
}

function unrankComposition(r, total, parts) {
  const divs = unrankCombination(r, total + parts - 1, parts - 1)
  const counts = []
  let prev = -1
  for (const d of divs) {
    counts.push(d - prev - 1)
    prev = d
  }
  counts.push(total + parts - 1 - prev - 1)
  return counts
}

class BitWriter {
  constructor() {
    this.v = 0n
    this.len = 0
  }

  write(value, width) {
    value = BigInt(value)
    if (width === 0) return
    if (value < 0n || value >= (1n << BigInt(width))) {
      throw new Error("value too large for field")
    }
    this.v = (this.v << BigInt(width)) | value
    this.len += width
  }

  bits() {
    return this.v.toString(2).padStart(this.len, "0")
  }
}

class BitReader {
  constructor(bits) {
    this.bits = bits.replace(/\s+/g, "")
    this.i = 0
  }

  read(width) {
    if (width === 0) return 0n
    if (this.i + width > this.bits.length) throw new Error("not enough bits")
    const s = this.bits.slice(this.i, this.i + width)
    this.i += width
    return BigInt("0b" + s)
  }

  remaining() {
    return this.bits.length - this.i
  }
}

function sq(file, rank) {
  return rank * 8 + file
}

function squareName(s) {
  return FILES[s % 8] + String(Math.floor(s / 8) + 1)
}

function squareIndex(name) {
  if (name === "-" || !name) return -1
  const f = FILES.indexOf(name[0])
  const r = Number(name[1]) - 1
  if (f < 0 || r < 0 || r > 7) throw new Error("bad square " + name)
  return sq(f, r)
}

function parseFen(fen) {
  const parts = fen.trim().split(/\s+/)
  if (parts.length < 4) throw new Error("FEN needs at least 4 fields")

  const board = new Array(64).fill(null)
  const ranks = parts[0].split("/")
  if (ranks.length !== 8) throw new Error("bad board")

  for (let rr = 0; rr < 8; rr++) {
    let file = 0
    const rank = 7 - rr
    for (const ch of ranks[rr]) {
      if (/[1-8]/.test(ch)) {
        file += Number(ch)
      } else {
        if (!"PNBRQKpnbrqk".includes(ch)) throw new Error("bad piece " + ch)
        if (file >= 8) throw new Error("bad rank")
        board[sq(file, rank)] = ch
        file++
      }
    }
    if (file !== 8) throw new Error("bad rank width")
  }

  return {
    board,
    turn: parts[1],
    castling: parts[2],
    ep: parts[3]
  }
}

function boardToFen(board, turn, castling, ep) {
  const rows = []

  for (let rank = 7; rank >= 0; rank--) {
    let row = ""
    let empty = 0

    for (let file = 0; file < 8; file++) {
      const p = board[sq(file, rank)]
      if (!p) {
        empty++
      } else {
        if (empty) {
          row += String(empty)
          empty = 0
        }
        row += p
      }
    }

    if (empty) row += String(empty)
    rows.push(row)
  }

  return rows.join("/") + " " + turn + " " + (castling || "-") + " " + (ep || "-") + " 0 1"
}

function findKings(board) {
  const wk = []
  const bk = []

  for (let i = 0; i < 64; i++) {
    if (board[i] === "K") wk.push(i)
    if (board[i] === "k") bk.push(i)
  }

  if (wk.length !== 1 || bk.length !== 1) {
    throw new Error("position must contain exactly one white king and one black king")
  }

  if (wk[0] === bk[0]) throw new Error("kings overlap")

  return { wk: wk[0], bk: bk[0] }
}

function materialCounts(board, color) {
  const counts = { X: 15, P: 0, Q: 0, R: 0, B: 0, N: 0 }

  const map = color === "w"
    ? { P: "P", Q: "Q", R: "R", B: "B", N: "N" }
    : { P: "p", Q: "q", R: "r", B: "b", N: "n" }

  let live = 0

  for (const p of board) {
    for (const t of ["P", "Q", "R", "B", "N"]) {
      if (p === map[t]) {
        counts[t]++
        live++
      }
    }
  }

  if (live > 15) throw new Error("too many non-king pieces for " + color)

  counts.X = 15 - live

  return MATERIAL_ORDER.map(x => counts[x])
}

function catsFromMaterial(w, b) {
  return [
    w[1], w[2], w[3], w[4], w[5],
    b[1], b[2], b[3], b[4], b[5]
  ]
}

function removeByIndices(arr, indices) {
  const dead = new Set(indices)
  const out = []

  for (let i = 0; i < arr.length; i++) {
    if (!dead.has(i)) out.push(arr[i])
  }

  return out
}

function encodePositions(board, wk, bk, catCounts) {
  let available = []

  for (let i = 0; i < 64; i++) {
    if (i !== wk && i !== bk) available.push(i)
  }

  const ranks = []
  const radices = []

  for (let c = 0; c < CAT_ORDER.length; c++) {
    const piece = CAT_ORDER[c]
    const k = catCounts[c]
    const positions = []

    for (let i = 0; i < available.length; i++) {
      if (board[available[i]] === piece) positions.push(i)
    }

    if (positions.length !== k) {
      throw new Error("material does not match board for " + piece)
    }

    positions.sort((a, b) => a - b)

    const radix = C(available.length, k)
    const rank = rankCombination(positions, available.length, k)

    ranks.push(rank)
    radices.push(radix)

    available = removeByIndices(available, positions)
  }

  let total = 1n
  for (const r of radices) total *= r

  let mixed = 0n
  for (let i = 0; i < ranks.length; i++) {
    mixed = mixed * radices[i] + ranks[i]
  }

  return {
    mixed,
    bits: ceilLog2(total),
    total
  }
}

function decodePositions(reader, wk, bk, catCounts) {
  let available = []

  for (let i = 0; i < 64; i++) {
    if (i !== wk && i !== bk) available.push(i)
  }

  const radices = []
  let n = available.length

  for (const k of catCounts) {
    const radix = C(n, k)
    radices.push(radix)
    n -= k
  }

  let total = 1n
  for (const r of radices) total *= r

  const width = ceilLog2(total)
  let mixed = reader.read(width)

  if (mixed >= total) throw new Error("invalid position block")

  const ranks = new Array(radices.length)

  for (let i = radices.length - 1; i >= 0; i--) {
    ranks[i] = mixed % radices[i]
    mixed /= radices[i]
  }

  const board = new Array(64).fill(null)

  board[wk] = "K"
  board[bk] = "k"

  for (let c = 0; c < CAT_ORDER.length; c++) {
    const k = catCounts[c]
    const idxs = unrankCombination(ranks[c], available.length, k)

    for (const idx of idxs) {
      board[available[idx]] = CAT_ORDER[c]
    }

    available = removeByIndices(available, idxs)
  }

  return board
}

function plausibleCastles(board) {
  const out = []

  if (board[squareIndex("e1")] === "K" && board[squareIndex("h1")] === "R") out.push("K")
  if (board[squareIndex("e1")] === "K" && board[squareIndex("a1")] === "R") out.push("Q")
  if (board[squareIndex("e8")] === "k" && board[squareIndex("h8")] === "r") out.push("k")
  if (board[squareIndex("e8")] === "k" && board[squareIndex("a8")] === "r") out.push("q")

  return CASTLE_ORDER.filter(x => out.includes(x))
}

function encodeCastling(writer, board, castling) {
  const plausible = plausibleCastles(board)
  const rights = castling === "-" ? "" : castling

  for (const r of rights) {
    if (!plausible.includes(r)) throw new Error("castling right not plausible: " + r)
  }

  for (const r of plausible) {
    writer.write(rights.includes(r) ? 1 : 0, 1)
  }
}

function decodeCastling(reader, board) {
  const plausible = plausibleCastles(board)
  let s = ""

  for (const r of plausible) {
    if (reader.read(1) === 1n) s += r
  }

  return s || "-"
}

function epCandidates(board, turn) {
  const out = []

  if (turn === "w") {
    for (let f = 0; f < 8; f++) {
      if (board[sq(f, 4)] !== "p") continue

      const left = f > 0 && board[sq(f - 1, 4)] === "P"
      const right = f < 7 && board[sq(f + 1, 4)] === "P"

      if (left || right) out.push(f)
    }
  } else {
    for (let f = 0; f < 8; f++) {
      if (board[sq(f, 3)] !== "P") continue

      const left = f > 0 && board[sq(f - 1, 3)] === "p"
      const right = f < 7 && board[sq(f + 1, 3)] === "p"

      if (left || right) out.push(f)
    }
  }

  return out
}

function epFileFromFen(ep) {
  if (ep === "-" || !ep) return -1
  return FILES.indexOf(ep[0])
}

function epSquareFromFile(file, turn) {
  if (file < 0) return "-"
  return FILES[file] + (turn === "w" ? "6" : "3")
}

function encodeEp(writer, board, turn, ep) {
  const cand = epCandidates(board, turn)

  if (cand.length > 5) throw new Error("too many EP candidates")

  const states = cand.length + 1
  const width = ceilLog2(BigInt(states))
  const f = epFileFromFen(ep)

  let rank = 0

  if (f >= 0) {
    const idx = cand.indexOf(f)
    if (idx < 0) throw new Error("EP square is not plausible")
    rank = idx + 1
  }

  writer.write(rank, width)
}

function decodeEp(reader, board, turn) {
  const cand = epCandidates(board, turn)

  if (cand.length > 5) throw new Error("too many EP candidates")

  const states = cand.length + 1
  const width = ceilLog2(BigInt(states))
  const rank = Number(reader.read(width))

  if (rank >= states) throw new Error("invalid EP code")
  if (rank === 0) return "-"

  return epSquareFromFile(cand[rank - 1], turn)
}

function encodeFenToBits(fen) {
  const pos = parseFen(fen)
  const { board, turn, castling, ep } = pos

  if (turn !== "w" && turn !== "b") throw new Error("bad turn")

  const { wk, bk } = findKings(board)

  const wm = materialCounts(board, "w")
  const bm = materialCounts(board, "b")

  const wr = rankComposition(wm, 15, 6)
  const br = rankComposition(bm, 15, 6)

  const catCounts = catsFromMaterial(wm, bm)
  const posBlock = encodePositions(board, wk, bk, catCounts)

  const writer = new BitWriter()

  writer.write(turn === "b" ? 1 : 0, 1)
  writer.write(wk, 6)
  writer.write(bk, 6)
  writer.write(wr, 14)
  writer.write(br, 14)
  writer.write(posBlock.mixed, posBlock.bits)

  encodeCastling(writer, board, castling)
  encodeEp(writer, board, turn, ep)

  return writer.bits()
}

function decodeBitsToFen(bits) {
  const reader = new BitReader(bits)

  const turn = reader.read(1) === 1n ? "b" : "w"

  const wk = Number(reader.read(6))
  const bk = Number(reader.read(6))

  if (wk === bk) throw new Error("invalid king positions")

  const wr = reader.read(14)
  const br = reader.read(14)

  const materialStates = C(20, 5)

  if (wr >= materialStates || br >= materialStates) {
    throw new Error("invalid material code")
  }

  const wm = unrankComposition(wr, 15, 6)
  const bm = unrankComposition(br, 15, 6)

  const catCounts = catsFromMaterial(wm, bm)
  const board = decodePositions(reader, wk, bk, catCounts)

  const castling = decodeCastling(reader, board)
  const ep = decodeEp(reader, board, turn)

  return boardToFen(board, turn, castling, ep)
}

function initChessEncodingDemo() {
  const fenInput = document.getElementById("fen-input")
  const bitsOutput = document.getElementById("bits-output")
  const fenOutput = document.getElementById("fen-output")
  const encodeButton = document.getElementById("encode-fen")
  const decodeButton = document.getElementById("decode-bits")
  const status = document.getElementById("demo-status")

  if (!fenInput || !bitsOutput || !fenOutput || !encodeButton || !decodeButton || !status) return

  function setStatus(message, isError) {
    status.textContent = message
    status.classList.toggle("is-error", Boolean(isError))
  }

  function encode() {
    try {
      const bits = encodeFenToBits(fenInput.value)
      bitsOutput.value = bits
      fenOutput.value = decodeBitsToFen(bits)
      setStatus(bits.length + " bits generated.", false)
    } catch (error) {
      setStatus(error.message, true)
    }
  }

  function decode() {
    try {
      const bits = bitsOutput.value.replace(/\s+/g, "")
      const fen = decodeBitsToFen(bits)
      fenOutput.value = fen
      setStatus("Decoded " + bits.length + " bits.", false)
    } catch (error) {
      setStatus(error.message, true)
    }
  }

  encodeButton.addEventListener("click", encode)
  decodeButton.addEventListener("click", decode)
  encode()
}

if (typeof window !== "undefined") {
  window.ChessEncoding = {
    encodeFenToBits,
    decodeBitsToFen
  }

  document.addEventListener("DOMContentLoaded", initChessEncodingDemo)
}
