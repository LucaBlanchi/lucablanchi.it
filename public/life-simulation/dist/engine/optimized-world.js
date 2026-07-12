import { ARG_REG, ARG_DIR, compileCode, directionCount, directionDx, directionDy, modulo, randomInt, OP_ADD, OP_ATTACK, OP_CMP, OP_COPY, OP_COUNT_FOOD, OP_COUNT_LIFE, OP_EAT, OP_JGT, OP_JGT_REL, OP_JLT, OP_JLT_REL, OP_JMP, OP_JMP_REL, OP_JNZ, OP_JNZ_REL, OP_JZ, OP_JZ_REL, OP_LOOK_FOOD, OP_LOOK_LIFE, OP_MOD, OP_MOVE, OP_MUL, OP_NOOP, OP_RAND, OP_REPRODUCE, OP_SENSE_EMPTY, OP_SENSE_ENERGY, OP_SENSE_FOOD, OP_SENSE_LIFE, OP_SET, OP_SLEEP, OP_SUB } from "../domain/instructions.js";
import { colorForLineageCode, founderHueForCode, nextLineageHue } from "../domain/life-form-color.js";
import { energyProfileForCodeLength, turnBudgetForCodeLength } from "../domain/life-form.js";
import { startingSeedLifeForm } from "../domain/seeds.js";
import { AbstractSimulationEngine } from "./abstract-world.js";
export class OptimizedWorld extends AbstractSimulationEngine {
    occupancy;
    foodGrid;
    foodIndexes;
    organisms = new Map();
    organismList = [];
    food = [];
    nextId = 1;
    organismById = [];
    organismListIndexes = new Map();
    turnOrder = [];
    directionOffsets;
    totalCells;
    seedCodes;
    constructor(config, options = {}) {
        super(config);
        this.seedCodes = options.seedCodes ?? (() => [(options.seedCode ?? startingSeedLifeForm.createCode)()]);
        this.totalCells = this.config.gridSize * this.config.gridSize;
        this.occupancy = new Int32Array(this.totalCells);
        this.foodGrid = new Uint8Array(this.totalCells);
        this.foodIndexes = new Int32Array(this.totalCells);
        this.directionOffsets = new Int32Array(directionCount);
        for (let i = 0; i < directionCount; i += 1) {
            this.directionOffsets[i] = directionDy[i] * this.config.gridSize + directionDx[i];
        }
        this.occupancy.fill(-1);
        this.foodIndexes.fill(-1);
        this.reset();
    }
    reset() {
        this.tickCount = 0;
        this.nextId = 1;
        this.organisms.clear();
        this.organismById.length = 0;
        this.organismList.length = 0;
        this.organismListIndexes.clear();
        this.turnOrder.length = 0;
        this.food.length = 0;
        this.occupancy.fill(-1);
        this.foodGrid.fill(0);
        this.foodIndexes.fill(-1);
        const center = Math.floor(this.config.gridSize / 2);
        const seedCodes = this.seedCodes();
        const positions = this.initialSeedPositions(seedCodes.length);
        for (let i = 0; i < seedCodes.length; i += 1) {
            const position = positions[i];
            if (!position) {
                break;
            }
            const seedCode = seedCodes[i];
            const seed = this.createOrganism(position.x, position.y, seedCode, this.config.initialEnergy, 0, founderHueForCode(seedCode, i));
            this.addOrganism(seed);
        }
        this.addFoodAt(center, center - 1);
        this.addFoodAt(center + 1, center);
        for (let i = 0; i < 1200; i += 1) {
            this.spawnFood();
        }
    }
    tick() {
        this.tickCount += 1;
        for (let i = 0; i < this.config.foodSpawnAttemptsPerTick; i += 1) {
            this.spawnFood();
        }
        const turnOrder = this.randomizedTurnOrder();
        for (let i = 0; i < turnOrder.length; i += 1) {
            const organism = turnOrder[i];
            if (!organism.alive) {
                continue;
            }
            this.runOrganismTurn(organism, organism.turnBudget);
        }
    }
    applyRuntimeConfig(config) {
        Object.assign(this.config, config);
        for (let i = 0; i < this.organismList.length; i += 1) {
            this.refreshOrganismDerivedState(this.organismList[i]);
        }
    }
    organismAt(x, y) {
        if (!this.inBounds(x, y)) {
            return undefined;
        }
        const id = this.occupancy[this.index(x, y)];
        return id > 0 ? this.organismById[id] : undefined;
    }
    foodAt(x, y) {
        return this.inBounds(x, y) && this.foodGrid[y * this.config.gridSize + x] > 0;
    }
    organismAtIndex(index) {
        const id = this.occupancy[index];
        return id > 0 ? this.organismById[id] : undefined;
    }
    addFoodAt(x, y) {
        if (!this.inBounds(x, y)) {
            return false;
        }
        return this.addFoodAtIndex(y * this.config.gridSize + x);
    }
    addFoodAtIndex(index) {
        if (this.food.length >= this.config.maxFood || this.occupancy[index] > 0 || this.foodGrid[index] > 0) {
            return false;
        }
        this.foodGrid[index] = 1;
        this.foodIndexes[index] = this.food.length;
        this.food.push(index);
        return true;
    }
    removeFoodAtIndex(index) {
        if (this.foodGrid[index] === 0) {
            return false;
        }
        const foodIndex = this.foodIndexes[index];
        const lastFoodIndex = this.food.pop();
        if (lastFoodIndex !== undefined && foodIndex < this.food.length) {
            this.food[foodIndex] = lastFoodIndex;
            this.foodIndexes[lastFoodIndex] = foodIndex;
        }
        this.foodGrid[index] = 0;
        this.foodIndexes[index] = -1;
        return true;
    }
    spawnFood() {
        if (this.food.length >= this.config.maxFood) {
            return;
        }
        this.addFoodAtIndex(randomInt(this.totalCells));
    }
    initialSeedPositions(count) {
        const positions = [];
        const center = Math.floor(this.config.gridSize / 2);
        if (count <= 0) {
            return positions;
        }
        if (count === 1) {
            positions.push({ x: center, y: center });
            return positions;
        }
        const rows = Math.max(1, Math.floor(Math.sqrt(count)));
        const columns = Math.ceil(count / rows);
        const edgePadding = Math.min(center, Math.max(1, Math.floor(this.config.gridSize * 0.12)));
        const minCoord = edgePadding;
        const maxCoord = Math.max(minCoord, this.config.gridSize - 1 - edgePadding);
        for (let i = 0; i < count && positions.length < count; i += 1) {
            const column = i % columns;
            const row = Math.floor(i / columns);
            this.addInitialSeedPosition(positions, this.initialSeedAxisPosition(column, columns, minCoord, maxCoord, center), this.initialSeedAxisPosition(row, rows, minCoord, maxCoord, center));
        }
        const maxRadius = this.config.gridSize;
        for (let radius = 0; radius <= maxRadius && positions.length < count; radius += 1) {
            for (let dy = -radius; dy <= radius && positions.length < count; dy += 1) {
                for (let dx = -radius; dx <= radius && positions.length < count; dx += 1) {
                    if (Math.max(Math.abs(dx), Math.abs(dy)) !== radius) {
                        continue;
                    }
                    const x = center + dx;
                    const y = center + dy;
                    this.addInitialSeedPosition(positions, x, y);
                }
            }
        }
        return positions;
    }
    initialSeedAxisPosition(slot, slotCount, minCoord, maxCoord, fallback) {
        if (slotCount <= 1) {
            return fallback;
        }
        return Math.round(minCoord + (slot * (maxCoord - minCoord)) / (slotCount - 1));
    }
    addInitialSeedPosition(positions, x, y) {
        if (!this.inBounds(x, y)) {
            return false;
        }
        const index = this.index(x, y);
        if (this.occupancy[index] > 0) {
            return false;
        }
        for (let i = 0; i < positions.length; i += 1) {
            const position = positions[i];
            if (position.x === x && position.y === y) {
                return false;
            }
        }
        positions.push({ x, y });
        return true;
    }
    createOrganism(x, y, code, energy, generation, lineageHue) {
        const base = this.buildLifeFormBase(this.nextId, x, y, code, energy, generation, lineageHue);
        return {
            ...base,
            cellIndex: this.index(x, y),
            compiledCode: compileCode(base.code, this.config)
        };
    }
    refreshOrganismDerivedState(organism) {
        const energyProfile = energyProfileForCodeLength(organism.code.length, this.config);
        organism.reproductionCost = energyProfile.reproductionCost;
        organism.offspringEnergy = energyProfile.offspringEnergy;
        organism.reproductionRequirement = energyProfile.reproductionRequirement;
        organism.maxEnergy = energyProfile.maxEnergy;
        organism.turnBudget = turnBudgetForCodeLength(organism.code.length, this.config);
        organism.color = colorForLineageCode(organism.code, organism.lineageHue);
        organism.compiledCode = compileCode(organism.code, this.config);
        organism.energy = Math.min(organism.energy, organism.maxEnergy);
    }
    addOrganism(organism) {
        const index = organism.cellIndex;
        this.nextId = Math.max(this.nextId, organism.id + 1);
        this.organisms.set(organism.id, organism);
        this.organismById[organism.id] = organism;
        this.organismListIndexes.set(organism.id, this.organismList.length);
        this.organismList.push(organism);
        this.removeFoodAtIndex(index);
        this.occupancy[index] = organism.id;
    }
    removeOrganism(organism) {
        organism.alive = false;
        this.organisms.delete(organism.id);
        this.organismById[organism.id] = undefined;
        const listIndex = this.organismListIndexes.get(organism.id);
        if (listIndex !== undefined) {
            const last = this.organismList.pop();
            if (last && last.id !== organism.id) {
                this.organismList[listIndex] = last;
                this.organismListIndexes.set(last.id, listIndex);
            }
            this.organismListIndexes.delete(organism.id);
        }
        const index = organism.cellIndex;
        if (this.occupancy[index] === organism.id) {
            this.occupancy[index] = -1;
        }
    }
    randomizedTurnOrder() {
        const turnOrder = this.turnOrder;
        const count = this.organismList.length;
        turnOrder.length = count;
        for (let i = 0; i < count; i += 1) {
            turnOrder[i] = this.organismList[i];
        }
        for (let i = count - 1; i > 0; i -= 1) {
            const j = randomInt(i + 1);
            const item = turnOrder[i];
            turnOrder[i] = turnOrder[j];
            turnOrder[j] = item;
        }
        return turnOrder;
    }
    runOrganismTurn(organism, budget) {
        organism.age += 1;
        if (this.config.maxAge > 0 && organism.age > this.config.maxAge) {
            this.removeOrganism(organism);
            return;
        }
        organism.energy -= this.config.baseTurnCost;
        organism.executedLastTurn = 0;
        const compiled = organism.compiledCode;
        const codeLength = compiled.length;
        if (codeLength === 0) {
            if (organism.energy <= 0) {
                this.removeOrganism(organism);
            }
            return;
        }
        let spentBudget = 0;
        while (spentBudget < budget) {
            if (!organism.alive || organism.energy <= 0) {
                break;
            }
            if (organism.pc >= codeLength) {
                organism.pc %= codeLength;
            }
            const pc = organism.pc;
            const instructionBudgetCost = compiled.budgetCosts[pc];
            if (spentBudget + instructionBudgetCost > budget) {
                break;
            }
            organism.energy -= this.config.instructionCost;
            const shouldEndTurn = this.executeCompiledInstruction(organism, compiled, pc);
            spentBudget += instructionBudgetCost;
            organism.executedLastTurn += 1;
            if (shouldEndTurn) {
                break;
            }
        }
        if (organism.energy <= 0) {
            this.removeOrganism(organism);
        }
    }
    nextCompiledPc(pc, codeLength) {
        const nextPc = pc + 1;
        return nextPc >= codeLength ? 0 : nextPc;
    }
    programIndex(value, codeLength) {
        const index = value % codeLength;
        return index < 0 ? index + codeLength : index;
    }
    readCompiledValue(registerValues, kind, value) {
        return kind === ARG_REG ? registerValues[value] : value;
    }
    readCompiledDirection(registerValues, kind, value) {
        const raw = kind === ARG_DIR ? value : kind === ARG_REG ? registerValues[value] : value;
        const directionIndex = raw % directionCount;
        return directionIndex < 0 ? directionIndex + directionCount : directionIndex;
    }
    writeCompiledRegister(registerValues, kind, value, nextValue) {
        if (kind !== ARG_REG) {
            return;
        }
        if (nextValue > 9999) {
            registerValues[value] = 9999;
        }
        else if (nextValue < -9999) {
            registerValues[value] = -9999;
        }
        else {
            registerValues[value] = nextValue | 0;
        }
    }
    executeCompiledInstruction(organism, code, pc) {
        const registerValues = organism.registers;
        const codeLength = code.length;
        const kind0 = code.argKinds0[pc];
        const kind1 = code.argKinds1[pc];
        const kind2 = code.argKinds2[pc];
        const value0 = code.argValues0[pc];
        const value1 = code.argValues1[pc];
        const value2 = code.argValues2[pc];
        switch (code.ops[pc]) {
            case OP_NOOP:
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_SLEEP:
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return true;
            case OP_SET:
            case OP_COPY:
                this.writeCompiledRegister(registerValues, kind0, value0, this.readCompiledValue(registerValues, kind1, value1));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_ADD:
                this.writeCompiledRegister(registerValues, kind0, value0, this.readCompiledValue(registerValues, kind0, value0) + this.readCompiledValue(registerValues, kind1, value1));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_SUB:
                this.writeCompiledRegister(registerValues, kind0, value0, this.readCompiledValue(registerValues, kind0, value0) - this.readCompiledValue(registerValues, kind1, value1));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_MUL:
                this.writeCompiledRegister(registerValues, kind0, value0, this.readCompiledValue(registerValues, kind0, value0) * this.readCompiledValue(registerValues, kind1, value1));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_MOD: {
                const divisor = Math.max(1, Math.abs(this.readCompiledValue(registerValues, kind1, value1)));
                this.writeCompiledRegister(registerValues, kind0, value0, modulo(this.readCompiledValue(registerValues, kind0, value0), divisor));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            }
            case OP_RAND: {
                const max = Math.max(1, Math.abs(this.readCompiledValue(registerValues, kind1, value1)));
                this.writeCompiledRegister(registerValues, kind0, value0, randomInt(max));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            }
            case OP_CMP: {
                const left = this.readCompiledValue(registerValues, kind1, value1);
                const right = this.readCompiledValue(registerValues, kind2, value2);
                this.writeCompiledRegister(registerValues, kind0, value0, Math.sign(left - right));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            }
            case OP_SENSE_FOOD: {
                const targetIndex = this.neighborIndex(organism, this.readCompiledDirection(registerValues, kind1, value1));
                this.writeCompiledRegister(registerValues, kind0, value0, targetIndex >= 0 && this.foodGrid[targetIndex] > 0 ? this.config.foodEnergy : 0);
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            }
            case OP_SENSE_LIFE: {
                const targetIndex = this.neighborIndex(organism, this.readCompiledDirection(registerValues, kind1, value1));
                this.writeCompiledRegister(registerValues, kind0, value0, targetIndex >= 0 && this.occupancy[targetIndex] > 0 ? 1 : 0);
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            }
            case OP_SENSE_EMPTY: {
                const targetIndex = this.neighborIndex(organism, this.readCompiledDirection(registerValues, kind1, value1));
                this.writeCompiledRegister(registerValues, kind0, value0, targetIndex >= 0 && this.occupancy[targetIndex] < 0 && this.foodGrid[targetIndex] === 0 ? 1 : 0);
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            }
            case OP_SENSE_ENERGY:
                this.writeCompiledRegister(registerValues, kind0, value0, Math.round(organism.energy));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_LOOK_FOOD:
                this.writeCompiledRegister(registerValues, kind0, value0, this.lookForFood(organism, this.readCompiledDirection(registerValues, kind1, value1)));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_LOOK_LIFE:
                this.writeCompiledRegister(registerValues, kind0, value0, this.lookForLife(organism, this.readCompiledDirection(registerValues, kind1, value1)));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_COUNT_FOOD:
                this.writeCompiledRegister(registerValues, kind0, value0, this.countFoodAround(organism));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_COUNT_LIFE:
                this.writeCompiledRegister(registerValues, kind0, value0, this.countLifeAround(organism));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_JMP:
                organism.pc = this.programIndex(this.readCompiledValue(registerValues, kind0, value0), codeLength);
                return;
            case OP_JMP_REL:
                organism.pc = this.programIndex(pc + this.readCompiledValue(registerValues, kind0, value0), codeLength);
                return;
            case OP_JZ:
                organism.pc =
                    this.readCompiledValue(registerValues, kind0, value0) === 0
                        ? this.programIndex(this.readCompiledValue(registerValues, kind1, value1), codeLength)
                        : this.nextCompiledPc(pc, codeLength);
                return;
            case OP_JZ_REL:
                organism.pc =
                    this.readCompiledValue(registerValues, kind0, value0) === 0
                        ? this.programIndex(pc + this.readCompiledValue(registerValues, kind1, value1), codeLength)
                        : this.nextCompiledPc(pc, codeLength);
                return;
            case OP_JNZ:
                organism.pc =
                    this.readCompiledValue(registerValues, kind0, value0) !== 0
                        ? this.programIndex(this.readCompiledValue(registerValues, kind1, value1), codeLength)
                        : this.nextCompiledPc(pc, codeLength);
                return;
            case OP_JNZ_REL:
                organism.pc =
                    this.readCompiledValue(registerValues, kind0, value0) !== 0
                        ? this.programIndex(pc + this.readCompiledValue(registerValues, kind1, value1), codeLength)
                        : this.nextCompiledPc(pc, codeLength);
                return;
            case OP_JGT:
                organism.pc =
                    this.readCompiledValue(registerValues, kind0, value0) > this.readCompiledValue(registerValues, kind1, value1)
                        ? this.programIndex(this.readCompiledValue(registerValues, kind2, value2), codeLength)
                        : this.nextCompiledPc(pc, codeLength);
                return;
            case OP_JGT_REL:
                organism.pc =
                    this.readCompiledValue(registerValues, kind0, value0) > this.readCompiledValue(registerValues, kind1, value1)
                        ? this.programIndex(pc + this.readCompiledValue(registerValues, kind2, value2), codeLength)
                        : this.nextCompiledPc(pc, codeLength);
                return;
            case OP_JLT:
                organism.pc =
                    this.readCompiledValue(registerValues, kind0, value0) < this.readCompiledValue(registerValues, kind1, value1)
                        ? this.programIndex(this.readCompiledValue(registerValues, kind2, value2), codeLength)
                        : this.nextCompiledPc(pc, codeLength);
                return;
            case OP_JLT_REL:
                organism.pc =
                    this.readCompiledValue(registerValues, kind0, value0) < this.readCompiledValue(registerValues, kind1, value1)
                        ? this.programIndex(pc + this.readCompiledValue(registerValues, kind2, value2), codeLength)
                        : this.nextCompiledPc(pc, codeLength);
                return;
            case OP_MOVE:
                this.move(organism, this.readCompiledDirection(registerValues, kind0, value0));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_EAT:
                this.eat(organism, this.readCompiledDirection(registerValues, kind0, value0));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_ATTACK:
                this.attack(organism, this.readCompiledDirection(registerValues, kind0, value0));
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
            case OP_REPRODUCE:
                this.reproduce(organism);
                organism.pc = this.nextCompiledPc(pc, codeLength);
                return;
        }
    }
    neighborIndex(organism, directionIndex) {
        const x = organism.x + directionDx[directionIndex];
        const y = organism.y + directionDy[directionIndex];
        return x >= 0 && x < this.config.gridSize && y >= 0 && y < this.config.gridSize
            ? organism.cellIndex + this.directionOffsets[directionIndex]
            : -1;
    }
    rayIndex(organism, directionIndex, distance) {
        const x = organism.x + directionDx[directionIndex] * distance;
        const y = organism.y + directionDy[directionIndex] * distance;
        return x >= 0 && x < this.config.gridSize && y >= 0 && y < this.config.gridSize
            ? organism.cellIndex + this.directionOffsets[directionIndex] * distance
            : -1;
    }
    lookForFood(organism, directionIndex) {
        for (let distance = 1; distance <= this.config.senseRange; distance += 1) {
            const targetIndex = this.rayIndex(organism, directionIndex, distance);
            if (targetIndex < 0) {
                return 0;
            }
            if (this.occupancy[targetIndex] > 0) {
                return 0;
            }
            if (this.foodGrid[targetIndex] > 0) {
                return distance;
            }
        }
        return 0;
    }
    lookForLife(organism, directionIndex) {
        for (let distance = 1; distance <= this.config.senseRange; distance += 1) {
            const targetIndex = this.rayIndex(organism, directionIndex, distance);
            if (targetIndex < 0) {
                return 0;
            }
            if (this.occupancy[targetIndex] > 0) {
                return distance;
            }
        }
        return 0;
    }
    countFoodAround(organism) {
        let count = 0;
        const radius = Math.max(1, this.config.senseAreaRadius);
        const minX = Math.max(0, organism.x - radius);
        const maxX = Math.min(this.config.gridSize - 1, organism.x + radius);
        const minY = Math.max(0, organism.y - radius);
        const maxY = Math.min(this.config.gridSize - 1, organism.y + radius);
        for (let y = minY; y <= maxY; y += 1) {
            const row = y * this.config.gridSize;
            for (let x = minX; x <= maxX; x += 1) {
                if ((x !== organism.x || y !== organism.y) && this.foodGrid[row + x] > 0) {
                    count += 1;
                }
            }
        }
        return count;
    }
    countLifeAround(organism) {
        let count = 0;
        const radius = Math.max(1, this.config.senseAreaRadius);
        const minX = Math.max(0, organism.x - radius);
        const maxX = Math.min(this.config.gridSize - 1, organism.x + radius);
        const minY = Math.max(0, organism.y - radius);
        const maxY = Math.min(this.config.gridSize - 1, organism.y + radius);
        for (let y = minY; y <= maxY; y += 1) {
            const row = y * this.config.gridSize;
            for (let x = minX; x <= maxX; x += 1) {
                const index = row + x;
                if ((x !== organism.x || y !== organism.y) && this.occupancy[index] > 0) {
                    count += 1;
                }
            }
        }
        return count;
    }
    move(organism, directionIndex) {
        organism.energy -= this.config.moveCost;
        const targetIndex = this.neighborIndex(organism, directionIndex);
        if (targetIndex < 0 || this.occupancy[targetIndex] > 0) {
            return;
        }
        this.moveOrganismToIndex(organism, targetIndex);
    }
    moveOrganismToIndex(organism, newIndex) {
        const oldIndex = organism.cellIndex;
        this.occupancy[oldIndex] = -1;
        this.occupancy[newIndex] = organism.id;
        organism.cellIndex = newIndex;
        organism.x = newIndex % this.config.gridSize;
        organism.y = Math.floor(newIndex / this.config.gridSize);
        if (this.removeFoodAtIndex(newIndex)) {
            this.addEnergy(organism, this.config.foodEnergy * this.config.moveFoodEnergyMultiplier);
        }
    }
    eat(organism, directionIndex) {
        organism.energy -= this.config.eatCost;
        const targetIndex = this.neighborIndex(organism, directionIndex);
        if (targetIndex < 0 || this.occupancy[targetIndex] > 0) {
            return;
        }
        if (this.removeFoodAtIndex(targetIndex)) {
            this.addEnergy(organism, this.config.foodEnergy);
        }
    }
    attack(organism, directionIndex) {
        const targetIndex = this.neighborIndex(organism, directionIndex);
        if (targetIndex < 0) {
            organism.energy -= this.config.attackMissCost;
            return;
        }
        const victim = this.organismAtIndex(targetIndex);
        if (!victim || victim.id === organism.id) {
            organism.energy -= this.config.attackMissCost;
            return;
        }
        const attackDamage = Math.max(0, organism.energy * this.config.attackDamageEnergyRatio);
        organism.energy -= this.config.attackCost;
        if (organism.energy <= 0) {
            return;
        }
        const drainedEnergy = Math.min(victim.energy, attackDamage);
        victim.energy -= drainedEnergy;
        this.addEnergy(organism, drainedEnergy * this.config.attackStealRatio);
        if (victim.energy <= 0) {
            this.removeOrganism(victim);
            if (this.config.attackOccupiesKilledCell && organism.energy > 0) {
                this.moveOrganismToIndex(organism, targetIndex);
            }
        }
    }
    reproduce(organism) {
        const totalCost = organism.reproductionCost + organism.offspringEnergy;
        if (organism.energy < organism.reproductionRequirement) {
            return;
        }
        const locationIndex = this.randomBirthIndex(organism);
        if (locationIndex < 0) {
            return;
        }
        organism.energy -= totalCost;
        const childMutation = this.reproductionEngine.mutateCodeWithResult(organism.code);
        const childLineageHue = nextLineageHue(organism.lineageHue, childMutation.didMutate, this.config);
        const child = this.createOrganism(locationIndex % this.config.gridSize, Math.floor(locationIndex / this.config.gridSize), childMutation.code, organism.offspringEnergy, organism.generation + 1, childLineageHue);
        this.addOrganism(child);
    }
    randomBirthIndex(parent) {
        const radius = Math.max(1, Math.round(this.config.reproductionSpawnRadius));
        const minX = Math.max(0, parent.x - radius);
        const maxX = Math.min(this.config.gridSize - 1, parent.x + radius);
        const minY = Math.max(0, parent.y - radius);
        const maxY = Math.min(this.config.gridSize - 1, parent.y + radius);
        const width = maxX - minX + 1;
        const height = maxY - minY + 1;
        const localCellCount = width * height - 1;
        if (localCellCount <= 0) {
            return -1;
        }
        for (let attempts = 0; attempts < 80; attempts += 1) {
            const x = minX + randomInt(width);
            const y = minY + randomInt(height);
            if (x === parent.x && y === parent.y) {
                continue;
            }
            const index = y * this.config.gridSize + x;
            if (this.isBirthCellFree(index)) {
                return index;
            }
        }
        for (let y = minY; y <= maxY; y += 1) {
            const row = y * this.config.gridSize;
            for (let x = minX; x <= maxX; x += 1) {
                if (x === parent.x && y === parent.y) {
                    continue;
                }
                const index = row + x;
                if (this.isBirthCellFree(index)) {
                    return index;
                }
            }
        }
        return -1;
    }
    isBirthCellFree(index) {
        return this.occupancy[index] < 0 && this.foodGrid[index] === 0;
    }
}
