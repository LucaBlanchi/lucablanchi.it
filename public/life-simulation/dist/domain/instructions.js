export const registers = ["A", "B", "C", "D"];
export const registerIndexes = { A: 0, B: 1, C: 2, D: 3 };
export const directions = [
    { name: "N", dx: 0, dy: -1 },
    { name: "NE", dx: 1, dy: -1 },
    { name: "E", dx: 1, dy: 0 },
    { name: "SE", dx: 1, dy: 1 },
    { name: "S", dx: 0, dy: 1 },
    { name: "SW", dx: -1, dy: 1 },
    { name: "W", dx: -1, dy: 0 },
    { name: "NW", dx: -1, dy: -1 }
];
export const directionCount = directions.length;
export const directionDx = Int8Array.from(directions.map((direction) => direction.dx));
export const directionDy = Int8Array.from(directions.map((direction) => direction.dy));
export const OP_NOOP = 0;
export const OP_SLEEP = 1;
export const OP_SET = 2;
export const OP_COPY = 3;
export const OP_ADD = 4;
export const OP_SUB = 5;
export const OP_MUL = 6;
export const OP_MOD = 7;
export const OP_RAND = 8;
export const OP_CMP = 9;
export const OP_SENSE_FOOD = 10;
export const OP_SENSE_LIFE = 11;
export const OP_SENSE_EMPTY = 12;
export const OP_SENSE_ENERGY = 13;
export const OP_LOOK_FOOD = 14;
export const OP_LOOK_LIFE = 15;
export const OP_COUNT_FOOD = 16;
export const OP_COUNT_LIFE = 17;
export const OP_JMP = 18;
export const OP_JMP_REL = 19;
export const OP_JZ = 20;
export const OP_JZ_REL = 21;
export const OP_JNZ = 22;
export const OP_JNZ_REL = 23;
export const OP_JGT = 24;
export const OP_JGT_REL = 25;
export const OP_JLT = 26;
export const OP_JLT_REL = 27;
export const OP_MOVE = 28;
export const OP_EAT = 29;
export const OP_ATTACK = 30;
export const OP_REPRODUCE = 31;
export const ARG_NONE = 0;
export const ARG_REG = 1;
export const ARG_NUM = 2;
export const ARG_DIR = 3;
export const opcodeIds = {
    NOOP: OP_NOOP,
    SLEEP: OP_SLEEP,
    SET: OP_SET,
    COPY: OP_COPY,
    ADD: OP_ADD,
    SUB: OP_SUB,
    MUL: OP_MUL,
    MOD: OP_MOD,
    RAND: OP_RAND,
    CMP: OP_CMP,
    SENSE_FOOD: OP_SENSE_FOOD,
    SENSE_LIFE: OP_SENSE_LIFE,
    SENSE_EMPTY: OP_SENSE_EMPTY,
    SENSE_ENERGY: OP_SENSE_ENERGY,
    LOOK_FOOD: OP_LOOK_FOOD,
    LOOK_LIFE: OP_LOOK_LIFE,
    COUNT_FOOD: OP_COUNT_FOOD,
    COUNT_LIFE: OP_COUNT_LIFE,
    JMP: OP_JMP,
    JMP_REL: OP_JMP_REL,
    JZ: OP_JZ,
    JZ_REL: OP_JZ_REL,
    JNZ: OP_JNZ,
    JNZ_REL: OP_JNZ_REL,
    JGT: OP_JGT,
    JGT_REL: OP_JGT_REL,
    JLT: OP_JLT,
    JLT_REL: OP_JLT_REL,
    MOVE: OP_MOVE,
    EAT: OP_EAT,
    ATTACK: OP_ATTACK,
    REPRODUCE: OP_REPRODUCE
};
export const opcodes = [
    "NOOP",
    "SLEEP",
    "SET",
    "COPY",
    "ADD",
    "SUB",
    "MUL",
    "MOD",
    "RAND",
    "CMP",
    "SENSE_FOOD",
    "SENSE_LIFE",
    "SENSE_EMPTY",
    "SENSE_ENERGY",
    "LOOK_FOOD",
    "LOOK_LIFE",
    "COUNT_FOOD",
    "COUNT_LIFE",
    "JMP",
    "JMP_REL",
    "JZ",
    "JZ_REL",
    "JNZ",
    "JNZ_REL",
    "JGT",
    "JGT_REL",
    "JLT",
    "JLT_REL",
    "MOVE",
    "EAT",
    "ATTACK",
    "REPRODUCE"
];
export const actionOps = new Set(["MOVE", "EAT", "ATTACK", "REPRODUCE"]);
export function opcodeBudgetCost(op, config) {
    switch (op) {
        case "ATTACK":
            return config.attackInstructionBudgetCost;
        case "REPRODUCE":
            return config.reproduceInstructionBudgetCost;
        case "MOVE":
            return config.moveInstructionBudgetCost;
        case "EAT":
            return config.eatInstructionBudgetCost;
        default:
            return 1;
    }
}
export function reg(value) {
    return { kind: "reg", value };
}
export function num(value) {
    return { kind: "num", value };
}
export function dir(value) {
    return { kind: "dir", value };
}
export function inst(op, ...args) {
    return { op, args };
}
export function cloneInstruction(instruction) {
    return {
        op: instruction.op,
        args: instruction.args.map((arg) => ({ ...arg }))
    };
}
export function normalizeInt(value) {
    if (!Number.isFinite(value)) {
        return 0;
    }
    return Math.trunc(value);
}
export function modulo(value, modulus) {
    return ((value % modulus) + modulus) % modulus;
}
export function chance(probability) {
    return Math.random() < probability;
}
export function pick(items) {
    return items[Math.floor(Math.random() * items.length)];
}
export function randomInt(maxExclusive) {
    return Math.floor(Math.random() * maxExclusive);
}
export function randomBetween(minInclusive, maxInclusive) {
    return minInclusive + randomInt(maxInclusive - minInclusive + 1);
}
export function randomRegister() {
    return reg(pick(registers));
}
export function randomSmallNumber() {
    return num(randomBetween(-12, 24));
}
export function randomDirection() {
    return dir(randomInt(directionCount));
}
export function randomTarget(programLength) {
    return num(randomInt(Math.max(1, programLength)));
}
export function randomJumpOffset() {
    return num(randomBetween(-16, 16));
}
export function createInstructionForOpcode(op, programLength) {
    switch (op) {
        case "NOOP":
        case "SLEEP":
        case "REPRODUCE":
            return inst(op);
        case "SET":
        case "ADD":
        case "SUB":
        case "MUL":
        case "MOD":
        case "RAND":
            return inst(op, randomRegister(), Math.random() < 0.5 ? randomSmallNumber() : randomRegister());
        case "COPY":
            return inst(op, randomRegister(), randomRegister());
        case "CMP":
            return inst(op, randomRegister(), Math.random() < 0.5 ? randomRegister() : randomSmallNumber(), Math.random() < 0.5 ? randomRegister() : randomSmallNumber());
        case "SENSE_FOOD":
        case "SENSE_LIFE":
        case "SENSE_EMPTY":
        case "LOOK_FOOD":
        case "LOOK_LIFE":
            return inst(op, randomRegister(), randomDirection());
        case "COUNT_FOOD":
        case "COUNT_LIFE":
            return inst(op, randomRegister());
        case "SENSE_ENERGY":
            return inst(op, randomRegister());
        case "JMP":
            return inst(op, randomTarget(programLength));
        case "JMP_REL":
            return inst(op, randomJumpOffset());
        case "JZ":
        case "JNZ":
            return inst(op, randomRegister(), randomTarget(programLength));
        case "JZ_REL":
        case "JNZ_REL":
            return inst(op, randomRegister(), randomJumpOffset());
        case "JGT":
        case "JLT":
            return inst(op, randomRegister(), randomSmallNumber(), randomTarget(programLength));
        case "JGT_REL":
        case "JLT_REL":
            return inst(op, randomRegister(), randomSmallNumber(), randomJumpOffset());
        case "MOVE":
        case "EAT":
            return inst(op, Math.random() < 0.4 ? randomRegister() : randomDirection());
        case "ATTACK":
            return inst(op, Math.random() < 0.15 ? randomRegister() : randomDirection());
    }
}
export function createRandomInstruction(programLength, allowedOpcodes = opcodes) {
    return createInstructionForOpcode(pick(allowedOpcodes.length > 0 ? allowedOpcodes : opcodes), programLength);
}
function compileArg(arg) {
    if (!arg) {
        return { kind: ARG_NONE, value: 0 };
    }
    if (arg.kind === "reg") {
        return { kind: ARG_REG, value: registerIndexes[arg.value] ?? 0 };
    }
    if (arg.kind === "dir") {
        return { kind: ARG_DIR, value: modulo(normalizeInt(Number(arg.value)), directionCount) };
    }
    return { kind: ARG_NUM, value: normalizeInt(Number(arg.value)) };
}
export function compileCode(code, config) {
    const length = code.length;
    const compiled = {
        length,
        ops: new Uint8Array(length),
        budgetCosts: new Uint8Array(length),
        argKinds0: new Int8Array(length),
        argKinds1: new Int8Array(length),
        argKinds2: new Int8Array(length),
        argValues0: new Int32Array(length),
        argValues1: new Int32Array(length),
        argValues2: new Int32Array(length)
    };
    for (let i = 0; i < length; i += 1) {
        const instruction = code[i];
        const arg0 = compileArg(instruction.args[0]);
        const arg1 = compileArg(instruction.args[1]);
        const arg2 = compileArg(instruction.args[2]);
        compiled.ops[i] = opcodeIds[instruction.op];
        compiled.budgetCosts[i] = opcodeBudgetCost(instruction.op, config);
        compiled.argKinds0[i] = arg0.kind;
        compiled.argKinds1[i] = arg1.kind;
        compiled.argKinds2[i] = arg2.kind;
        compiled.argValues0[i] = arg0.value;
        compiled.argValues1[i] = arg1.value;
        compiled.argValues2[i] = arg2.value;
    }
    return compiled;
}
export function instructionCostLabel(op) {
    if (actionOps.has(op)) {
        return "*";
    }
    return "";
}
export function formatArg(arg) {
    if (arg.kind === "reg") {
        return String(arg.value);
    }
    if (arg.kind === "dir") {
        return directions[modulo(Number(arg.value), directionCount)]?.name ?? "N";
    }
    return String(arg.value);
}
export function formatInstruction(instruction) {
    const args = instruction.args.map(formatArg).join(" ");
    return `${instruction.op}${instructionCostLabel(instruction.op)}${args ? ` ${args}` : ""}`;
}
