import { chance, cloneInstruction, createInstructionForOpcode, createRandomInstruction, opcodes, pick, randomDirection, randomInt, randomRegister, randomSmallNumber, randomTarget } from "../domain/instructions.js";
export class ReproductionEngine {
    config;
    allowedOpcodes;
    constructor(config, rules = {}) {
        this.config = config;
        this.allowedOpcodes = [...(rules.allowedOpcodes ?? opcodes)];
    }
    setAllowedOpcodes(allowedOpcodes) {
        this.allowedOpcodes = [...allowedOpcodes];
    }
    mutateCode(code) {
        return this.mutateCodeWithResult(code).code;
    }
    mutateCodeWithResult(code) {
        const mutated = [];
        let didMutate = false;
        for (let i = 0; i < code.length; i += 1) {
            const targetLength = Math.max(this.config.minProgramLength, code.length + 1);
            if (chance(this.config.insertionMutationRate)) {
                mutated.push(this.createRandomInstruction(targetLength));
                didMutate = true;
            }
            const remainingOriginalBlocks = code.length - i - 1;
            const canDelete = mutated.length + remainingOriginalBlocks >= this.config.minProgramLength;
            if (canDelete && chance(this.config.deletionMutationRate)) {
                didMutate = true;
                continue;
            }
            const instruction = cloneInstruction(code[i]);
            if (chance(this.config.mutationRate)) {
                mutated.push(this.mutateInstruction(instruction, targetLength));
                didMutate = true;
            }
            else {
                mutated.push(instruction);
            }
        }
        if (chance(this.config.insertionMutationRate)) {
            mutated.push(this.createRandomInstruction(Math.max(this.config.minProgramLength, mutated.length + 1)));
            didMutate = true;
        }
        return { code: mutated, didMutate };
    }
    createRandomInstruction(programLength) {
        return createRandomInstruction(programLength, this.normalizedAllowedOpcodes());
    }
    mutateInstruction(instruction, targetLength) {
        const mutationKind = this.weightedMutationKind();
        if (mutationKind === 0) {
            return this.createRandomInstruction(targetLength);
        }
        if (mutationKind === 1) {
            return createInstructionForOpcode(pick(this.normalizedAllowedOpcodes()), targetLength);
        }
        if (mutationKind === 2 && instruction.args.length > 0) {
            const mutated = cloneInstruction(instruction);
            const argIndex = randomInt(mutated.args.length);
            mutated.args[argIndex] = this.randomArgLike(mutated.args[argIndex], targetLength);
            return mutated;
        }
        if (instruction.args.length === 0) {
            return this.createRandomInstruction(targetLength);
        }
        return createInstructionForOpcode(instruction.op, targetLength);
    }
    weightedMutationKind() {
        const weights = [
            Math.max(0, this.config.mutationReplaceInstructionWeight),
            Math.max(0, this.config.mutationOpcodeWeight),
            Math.max(0, this.config.mutationArgumentWeight),
            Math.max(0, this.config.mutationRegenerateArgsWeight)
        ];
        const totalWeight = weights.reduce((total, weight) => total + weight, 0);
        if (totalWeight <= 0) {
            return randomInt(4);
        }
        let cursor = Math.random() * totalWeight;
        for (let i = 0; i < weights.length; i += 1) {
            cursor -= weights[i];
            if (cursor <= 0) {
                return i;
            }
        }
        return weights.length - 1;
    }
    randomArgLike(arg, targetLength) {
        if (arg.kind === "reg") {
            return randomRegister();
        }
        if (arg.kind === "dir") {
            return randomDirection();
        }
        return Math.random() < 0.5 ? randomSmallNumber() : randomTarget(targetLength);
    }
    normalizedAllowedOpcodes() {
        return this.allowedOpcodes.length > 0 ? this.allowedOpcodes : opcodes;
    }
}
