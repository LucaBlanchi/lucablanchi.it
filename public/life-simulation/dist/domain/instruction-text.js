import { directions, formatInstruction, inst, num, opcodes, reg, registers } from "./instructions.js";
export const instructionSpecs = {
    NOOP: [],
    SLEEP: [],
    SET: ["reg", "value"],
    COPY: ["reg", "reg"],
    ADD: ["reg", "value"],
    SUB: ["reg", "value"],
    MUL: ["reg", "value"],
    MOD: ["reg", "value"],
    RAND: ["reg", "value"],
    CMP: ["reg", "value", "value"],
    SENSE_FOOD: ["reg", "direction"],
    SENSE_LIFE: ["reg", "direction"],
    SENSE_EMPTY: ["reg", "direction"],
    SENSE_ENERGY: ["reg"],
    LOOK_FOOD: ["reg", "direction"],
    LOOK_LIFE: ["reg", "direction"],
    COUNT_FOOD: ["reg"],
    COUNT_LIFE: ["reg"],
    JMP: ["value"],
    JMP_REL: ["value"],
    JZ: ["value", "value"],
    JZ_REL: ["value", "value"],
    JNZ: ["value", "value"],
    JNZ_REL: ["value", "value"],
    JGT: ["value", "value", "value"],
    JGT_REL: ["value", "value", "value"],
    JLT: ["value", "value", "value"],
    JLT_REL: ["value", "value", "value"],
    MOVE: ["direction"],
    EAT: ["direction"],
    ATTACK: ["direction"],
    REPRODUCE: []
};
export function formatProgramText(code) {
    return code.map((instruction, index) => `${String(index).padStart(2, "0")} ${formatInstruction(instruction)}`).join("\n");
}
export function parseProgramText(source) {
    const code = [];
    const errors = [];
    source.split(/\r?\n/).forEach((rawLine, rawIndex) => {
        const lineNumber = rawIndex + 1;
        const line = stripComment(rawLine).trim();
        if (!line) {
            return;
        }
        const tokens = line.split(/\s+/);
        if (/^\d+:?$/.test(tokens[0] ?? "")) {
            tokens.shift();
        }
        if (tokens.length === 0) {
            return;
        }
        const opcodeToken = tokens.shift().replace(/\*$/, "").toUpperCase();
        if (!isOpcode(opcodeToken)) {
            errors.push({ line: lineNumber, message: `Unknown instruction: ${opcodeToken}` });
            return;
        }
        const specs = instructionSpecs[opcodeToken];
        if (tokens.length !== specs.length) {
            errors.push({
                line: lineNumber,
                message: `${opcodeToken} expects ${specs.length} arguments, found ${tokens.length}`
            });
            return;
        }
        const args = [];
        for (let i = 0; i < specs.length; i += 1) {
            const parsedArg = parseArg(tokens[i]);
            if (!parsedArg) {
                errors.push({ line: lineNumber, message: `Invalid argument: ${tokens[i]}` });
                return;
            }
            if (!argMatchesSpec(parsedArg, specs[i])) {
                errors.push({ line: lineNumber, message: `${tokens[i]} is not valid as ${argLabel(specs[i])}` });
                return;
            }
            args.push(parsedArg);
        }
        code.push(inst(opcodeToken, ...args));
    });
    if (errors.length > 0) {
        return { ok: false, errors };
    }
    if (code.length === 0) {
        return { ok: false, errors: [{ line: 1, message: "The program contains no instructions" }] };
    }
    return { ok: true, code };
}
function stripComment(line) {
    const hashIndex = line.indexOf("#");
    const slashIndex = line.indexOf("//");
    const commentIndexes = [hashIndex, slashIndex].filter((index) => index >= 0);
    if (commentIndexes.length === 0) {
        return line;
    }
    return line.slice(0, Math.min(...commentIndexes));
}
function isOpcode(value) {
    return opcodes.includes(value);
}
export function parseArg(token) {
    const normalized = token.toUpperCase();
    if (registers.includes(normalized)) {
        return reg(normalized);
    }
    const directionIndex = directions.findIndex((direction) => direction.name === normalized);
    if (directionIndex >= 0) {
        return { kind: "dir", value: directionIndex };
    }
    if (/^[+-]?\d+$/.test(token)) {
        return num(Number(token));
    }
    return undefined;
}
export function argMatchesSpec(arg, spec) {
    if (spec === "reg") {
        return arg.kind === "reg";
    }
    if (spec === "value") {
        return arg.kind === "reg" || arg.kind === "num";
    }
    return true;
}
export function argLabel(spec) {
    if (spec === "reg") {
        return "register";
    }
    if (spec === "value") {
        return "value";
    }
    return "direction";
}
