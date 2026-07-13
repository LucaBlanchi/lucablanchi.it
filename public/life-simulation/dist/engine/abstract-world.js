import { colorForLineageCode } from "../domain/life-form-color.js";
import { cloneInstruction, registers } from "../domain/instructions.js";
import { energyProfileForCodeLength, turnBudgetForCodeLength } from "../domain/life-form.js";
import { ReproductionEngine } from "./reproduction.js";
export class AbstractSimulationEngine {
    config;
    reproductionEngine;
    tickCount = 0;
    constructor(config, reproductionEngine) {
        this.config = { ...config };
        this.reproductionEngine = reproductionEngine ?? new ReproductionEngine(this.config);
    }
    get selectedCount() {
        return this.organisms.size;
    }
    index(x, y) {
        return y * this.config.gridSize + x;
    }
    inBounds(x, y) {
        return x >= 0 && x < this.config.gridSize && y >= 0 && y < this.config.gridSize;
    }
    buildLifeFormBase(id, x, y, code, energy, generation, lineageHue) {
        const clonedCode = code.map(cloneInstruction);
        const energyProfile = this.energyProfileForCodeLength(clonedCode.length);
        return {
            id,
            x,
            y,
            energy: Math.min(energy, energyProfile.maxEnergy),
            age: 0,
            pc: 0,
            code: clonedCode,
            registers: new Int32Array(registers.length),
            turnBudget: turnBudgetForCodeLength(clonedCode.length, this.config),
            generation,
            offspringCount: 0,
            lineageHue,
            color: colorForLineageCode(clonedCode, lineageHue),
            alive: true,
            executedLastTurn: 0,
            ...energyProfile
        };
    }
    energyProfileForCodeLength(codeLength) {
        return energyProfileForCodeLength(codeLength, this.config);
    }
    clampEnergy(organism) {
        organism.energy = Math.min(organism.energy, organism.maxEnergy);
    }
    addEnergy(organism, amount) {
        organism.energy += amount;
        this.clampEnergy(organism);
    }
}
