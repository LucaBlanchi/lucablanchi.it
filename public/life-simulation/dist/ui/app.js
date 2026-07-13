import { defaultConfig } from "../domain/config.js";
import { argMatchesSpec, formatProgramText, instructionSpecs, parseArg, parseProgramText } from "../domain/instruction-text.js";
import { cloneInstruction, directions, dir, formatArg, formatInstruction, modulo, num, opcodes, registerIndexes, registers, reg } from "../domain/instructions.js";
import { energyProfileForCodeLength, turnBudgetForCodeLength } from "../domain/life-form.js";
import { savedSeedLifeForms, startingSeedLifeForm } from "../domain/seeds.js";
import { OptimizedWorld } from "../engine/optimized-world.js";
function requireElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Missing required DOM node: ${selector}`);
    }
    return element;
}
function requireCanvasContext(canvasElement) {
    const canvasContext = canvasElement.getContext("2d");
    if (!canvasContext) {
        throw new Error("Canvas 2D is not available");
    }
    return canvasContext;
}
function setText(node, value) {
    node.textContent = String(value);
}
const settingGroups = [
    {
        title: "Base",
        settings: [
            { type: "number", key: "gridSize", label: "Grid", min: 32, max: 512, step: 1, resetOnly: true },
            { type: "number", key: "foodSpawnAttemptsPerTick", label: "Food attempts/tick", min: 0, max: 100, step: 1 },
            { type: "number", key: "maxFood", label: "Food cap (0 unlimited)", min: 0, max: 50000, step: 100 },
            { type: "number", key: "foodEnergy", label: "Food energy gain", min: 0, max: 100, step: 1, digits: 1 },
            { type: "number", key: "maxAge", label: "Max age (0 off)", min: 0, max: 100000, step: 100 },
            { type: "number", key: "mutationRate", label: "Point mutation %", min: 0, max: 10, step: 0.1, scale: 100, digits: 1 }
        ]
    },
    {
        title: "Environment",
        advanced: true,
        settings: [
            {
                type: "select",
                key: "foodSpawnPattern",
                label: "Food spawn pattern",
                options: [
                    { value: "uniform", label: "Uniform" },
                    { value: "gradient", label: "West gradient" },
                    { value: "eastGradient", label: "East gradient" },
                    { value: "corner", label: "One corner" },
                    { value: "oppositeCorners", label: "Opposite corners" },
                    { value: "center", label: "Center cluster" }
                ]
            },
            {
                type: "select",
                key: "mapTopology",
                label: "Map topology",
                options: [
                    { value: "square", label: "Square edges" },
                    { value: "cylinder", label: "Cylinder, wraps E/W" },
                    { value: "torus", label: "Torus, wraps all" }
                ]
            },
            {
                type: "select",
                key: "barrierPattern",
                label: "Barrier pattern",
                options: [
                    { value: "none", label: "None" },
                    { value: "verticalWall", label: "Middle wall" },
                    { value: "horizontalWall", label: "Horizontal wall" },
                    { value: "cross", label: "Cross" },
                    { value: "wallGap", label: "Wall with gap" },
                    { value: "box", label: "Box enclosure" }
                ]
            }
        ]
    },
    {
        title: "Food gain and MOVE energy",
        advanced: true,
        settings: [
            { type: "number", key: "moveFoodEnergyMultiplier", label: "MOVE-over food gain fraction", min: 0, max: 1, step: 0.01, digits: 2 },
            { type: "number", key: "moveCost", label: "MOVE energy cost", min: 0, max: 20, step: 0.05, digits: 2 },
            { type: "number", key: "eatCost", label: "EAT energy cost", min: 0, max: 20, step: 0.05, digits: 2 }
        ]
    },
    {
        title: "Passive energy drain",
        advanced: true,
        settings: [
            { type: "number", key: "baseTurnCost", label: "Energy drain/turn", min: 0, max: 2, step: 0.001, digits: 3 },
            { type: "number", key: "instructionCost", label: "Energy drain/block", min: 0, max: 1, step: 0.001, digits: 3 }
        ]
    },
    {
        title: "ATTACK energy",
        advanced: true,
        settings: [
            { type: "number", key: "attackCost", label: "ATTACK energy cost", min: 0, max: 20, step: 0.1, digits: 2 },
            { type: "number", key: "attackMissCost", label: "ATTACK miss energy cost", min: 0, max: 5, step: 0.001, digits: 3 },
            { type: "number", key: "attackDamageEnergyRatio", label: "Damage/attacker energy", min: 0, max: 5, step: 0.05, digits: 2 },
            { type: "number", key: "attackStealRatio", label: "Stolen energy ratio", min: 0, max: 2, step: 0.05, digits: 2 },
            { type: "boolean", key: "attackOccupiesKilledCell", label: "ATTACK occupies killed cell" }
        ]
    },
    {
        title: "REPRODUCE energy",
        advanced: true,
        settings: [
            { type: "number", key: "reproductionEnergyPerBlock", label: "Reproduce energy/block", min: 0, max: 20, step: 0.05, digits: 2 },
            { type: "number", key: "reproductionEnergyQuadraticFactor", label: "Quadratic energy cost", min: 0, max: 2, step: 0.001, digits: 3 },
            { type: "number", key: "offspringEnergyPerBlock", label: "Child starting energy/block", min: 0, max: 20, step: 0.05, digits: 2 },
            { type: "number", key: "reproductionReserveEnergy", label: "Parent reserve energy", min: 0, max: 100, step: 0.5, digits: 1 },
            { type: "number", key: "reproductionSpawnRadius", label: "Birth radius", min: 1, max: 128, step: 1 },
            { type: "number", key: "maxEnergyReproductionMultiplier", label: "Energy cap = repro cost x", min: 0.5, max: 10, step: 0.1, digits: 2 },
            { type: "number", key: "minProgramLength", label: "Minimum blocks", min: 1, max: 64, step: 1 }
        ]
    },
    {
        title: "Actions per turn",
        advanced: true,
        settings: [
            {
                type: "select",
                key: "turnBudgetMode",
                label: "Actions/turn formula",
                options: [
                    { value: "fixed", label: "Fixed" },
                    { value: "scaled", label: "Scaled" }
                ]
            },
            { type: "number", key: "turnBudget", label: "Fixed actions/turn", min: 1, max: 200, step: 1 },
            { type: "number", key: "turnBudgetBase", label: "Base actions/turn", min: 0, max: 200, step: 1 },
            { type: "number", key: "turnBudgetPerBlock", label: "Actions/block", min: 0, max: 10, step: 0.05, digits: 2 },
            { type: "number", key: "turnBudgetQuadraticFactor", label: "Quadratic actions term", min: 0, max: 1, step: 0.001, digits: 3 },
            { type: "number", key: "minTurnBudget", label: "Minimum actions/turn", min: 1, max: 200, step: 1 },
            { type: "number", key: "moveInstructionBudgetCost", label: "MOVE actions used", min: 1, max: 20, step: 1 },
            { type: "number", key: "eatInstructionBudgetCost", label: "EAT actions used", min: 1, max: 20, step: 1 },
            { type: "number", key: "attackInstructionBudgetCost", label: "ATTACK actions used", min: 1, max: 20, step: 1 },
            { type: "number", key: "reproduceInstructionBudgetCost", label: "REPRODUCE actions used", min: 1, max: 20, step: 1 }
        ]
    },
    {
        title: "Senses",
        advanced: true,
        settings: [
            { type: "number", key: "senseRange", label: "LOOK radius", min: 1, max: 64, step: 1 },
            { type: "number", key: "senseAreaRadius", label: "COUNT radius", min: 1, max: 16, step: 1 }
        ]
    },
    {
        title: "Mutation details",
        advanced: true,
        settings: [
            { type: "number", key: "insertionMutationRate", label: "Insertion %", min: 0, max: 10, step: 0.1, scale: 100, digits: 1 },
            { type: "number", key: "deletionMutationRate", label: "Deletion %", min: 0, max: 10, step: 0.1, scale: 100, digits: 1 },
            { type: "number", key: "mutationReplaceInstructionWeight", label: "Random block weight", min: 0, max: 10, step: 0.1, digits: 1 },
            { type: "number", key: "mutationOpcodeWeight", label: "Opcode change weight", min: 0, max: 10, step: 0.1, digits: 1 },
            { type: "number", key: "mutationArgumentWeight", label: "Argument change weight", min: 0, max: 10, step: 0.1, digits: 1 },
            { type: "number", key: "mutationRegenerateArgsWeight", label: "Regenerate args weight", min: 0, max: 10, step: 0.1, digits: 1 }
        ]
    },
    {
        title: "Lineage color",
        advanced: true,
        settings: [
            { type: "number", key: "lineageColorDriftRate", label: "Drift chance/code mutation %", min: 0, max: 100, step: 1, scale: 100, digits: 1 },
            { type: "number", key: "lineageColorMinDriftDegrees", label: "Minimum hue drift", min: 0, max: 30, step: 1 },
            { type: "number", key: "lineageColorDriftDegrees", label: "Maximum hue drift", min: 0, max: 60, step: 1 }
        ]
    }
];
const opcodeGroups = [
    { title: "Data", ops: ["NOOP", "SLEEP", "SET", "COPY", "ADD", "SUB", "MUL", "MOD", "RAND", "CMP"] },
    { title: "Senses", ops: ["SENSE_FOOD", "SENSE_LIFE", "SENSE_EMPTY", "SENSE_ENERGY", "LOOK_FOOD", "LOOK_LIFE", "COUNT_FOOD", "COUNT_LIFE"] },
    { title: "Flow", ops: ["JMP", "JMP_REL", "JZ", "JZ_REL", "JNZ", "JNZ_REL", "JGT", "JGT_REL", "JLT", "JLT_REL"] },
    { title: "Actions", ops: ["MOVE", "EAT", "ATTACK", "REPRODUCE"] }
];
function defaultArgForSpec(spec, argIndex, op) {
    if (spec === "reg") {
        return reg(registers[argIndex % registers.length]);
    }
    if (spec === "direction") {
        return dir(0);
    }
    if (op === "RAND" && argIndex === 1) {
        return num(directions.length);
    }
    return num(0);
}
function defaultInstructionForOpcode(op) {
    return {
        op,
        args: instructionSpecs[op].map((spec, argIndex) => defaultArgForSpec(spec, argIndex, op))
    };
}
function instructionWithOpcode(op, previous) {
    return {
        op,
        args: instructionSpecs[op].map((spec, argIndex) => {
            const previousArg = previous?.args[argIndex];
            return previousArg && argMatchesSpec(previousArg, spec) ? { ...previousArg } : defaultArgForSpec(spec, argIndex, op);
        })
    };
}
function parseArgControlValue(spec, value) {
    const parsed = parseArg(value.trim());
    if (!parsed || !argMatchesSpec(parsed, spec)) {
        return undefined;
    }
    return parsed;
}
function isOpcode(value) {
    return opcodes.includes(value);
}
export function startLifeApp() {
    const canvas = requireElement("#worldCanvas");
    const toggleRunButton = requireElement("#toggleRun");
    const stepOnceButton = requireElement("#stepOnce");
    const resetWorldButton = requireElement("#resetWorld");
    const openSeedEditorButton = requireElement("#openSeedEditor");
    const openSpawnDialogButton = requireElement("#openSpawnDialog");
    const finishPlacementButton = requireElement("#finishPlacement");
    const placementStatus = requireElement("#placementStatus");
    const seedDialog = requireElement("#seedDialog");
    const closeSeedEditorButton = requireElement("#closeSeedEditor");
    const spawnDialog = requireElement("#spawnDialog");
    const closeSpawnDialogButton = requireElement("#closeSpawnDialog");
    const spawnPresetInput = requireElement("#spawnPresetInput");
    const spawnEditor = requireElement("#spawnEditor");
    const spawnStatus = requireElement("#spawnStatus");
    const pasteSpawnCodeButton = requireElement("#pasteSpawnCode");
    const spawnCodeButton = requireElement("#spawnCode");
    const placeSpawnCodeButton = requireElement("#placeSpawnCode");
    const renderInput = requireElement("#renderInput");
    const tickValue = requireElement("#tickValue");
    const organismValue = requireElement("#organismValue");
    const foodValue = requireElement("#foodValue");
    const selectionValue = requireElement("#selectionValue");
    const speedInput = requireElement("#speedInput");
    const speedNumberInput = requireElement("#speedNumberInput");
    const settingsPanel = requireElement("#settingsPanel");
    const seedPresetInput = requireElement("#seedPresetInput");
    const seedCreatureList = requireElement("#seedCreatureList");
    const addSeedCreatureButton = requireElement("#addSeedCreature");
    const duplicateSeedCreatureButton = requireElement("#duplicateSeedCreature");
    const removeSeedCreatureButton = requireElement("#removeSeedCreature");
    const blockOpcodeInput = requireElement("#blockOpcodeInput");
    const appendBlockButton = requireElement("#appendBlock");
    const seedBlockEditor = requireElement("#seedBlockEditor");
    const blockPalette = requireElement("#blockPalette");
    const seedEditor = requireElement("#seedEditor");
    const copySeedCodeButton = requireElement("#copySeedCode");
    const pasteSeedCodeButton = requireElement("#pasteSeedCode");
    const seedStats = requireElement("#seedStats");
    const seedStatus = requireElement("#seedStatus");
    const applySeedButton = requireElement("#applySeed");
    const formatSeedButton = requireElement("#formatSeed");
    const programDetails = requireElement("#programDetails");
    const copySelectedProgramButton = requireElement("#copySelectedProgram");
    const organismDetails = requireElement("#organismDetails");
    const autoSelectOldestButton = requireElement("#autoSelectOldest");
    const autoSelectMostChildrenButton = requireElement("#autoSelectMostChildren");
    const context = requireCanvasContext(canvas);
    const maxTicksPerFrame = 1000;
    const fastForwardFrameBudgetMs = 120;
    const fastForwardBatchSize = 1000;
    const fastForwardMaxTicksPerFrame = 5000000;
    const fastForwardStatusIntervalMs = 1000;
    let currentConfig = { ...defaultConfig };
    let activeSeedCodes = [startingSeedLifeForm.createCode()];
    let seedDrafts = activeSeedCodes.map((code) => formatProgramText(code));
    let selectedSeedIndex = 0;
    let world = createWorld(currentConfig);
    let isRunning = false;
    let isRenderingEnabled = true;
    let selectedId;
    let autoSelectionMode = "oldest";
    let placementCode;
    let speed = normalizeRenderSpeed(Number(speedInput.value));
    let lastFrameTime = performance.now();
    let lastFastForwardStatusTime = 0;
    let tickAccumulator = 0;
    let renderedProgramKey = "";
    let renderedProgramNextIndex;
    let copySelectedProgramLabelTimer;
    let copySeedCodeLabelTimer;
    let placementStatusTimer;
    function cloneCode(code) {
        return code.map(cloneInstruction);
    }
    function createWorld(config) {
        return new OptimizedWorld(config, { seedCodes: () => activeSeedCodes.map((code) => cloneCode(code)) });
    }
    function resizeCanvasToDisplaySize() {
        const rect = canvas.getBoundingClientRect();
        const pixelRatio = window.devicePixelRatio || 1;
        const width = Math.max(1, Math.floor(rect.width * pixelRatio));
        const height = Math.max(1, Math.floor(rect.height * pixelRatio));
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
    }
    function cssVar(name) {
        const appRoot = canvas.closest(".life-simulation-page") ?? document.documentElement;
        const scopedValue = getComputedStyle(appRoot).getPropertyValue(name).trim();
        if (scopedValue) {
            return scopedValue;
        }
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }
    function normalizeRenderSpeed(value) {
        if (!Number.isFinite(value)) {
            return 20;
        }
        return Math.min(250, Math.max(1, Math.round(value)));
    }
    function setRenderSpeed(value) {
        speed = normalizeRenderSpeed(value);
        speedInput.value = String(speed);
        speedNumberInput.value = String(speed);
        speedInput.style.setProperty("--speed-progress", `${((speed - 1) / (250 - 1)) * 100}%`);
    }
    function oldestOrganism() {
        let selected;
        for (let i = 0; i < world.organismList.length; i += 1) {
            const organism = world.organismList[i];
            if (!selected ||
                organism.age > selected.age ||
                (organism.age === selected.age && organism.generation < selected.generation) ||
                (organism.age === selected.age && organism.generation === selected.generation && organism.id < selected.id)) {
                selected = organism;
            }
        }
        return selected;
    }
    function mostChildrenOrganism() {
        let selected;
        for (let i = 0; i < world.organismList.length; i += 1) {
            const organism = world.organismList[i];
            if (!selected ||
                organism.offspringCount > selected.offspringCount ||
                (organism.offspringCount === selected.offspringCount && organism.age > selected.age) ||
                (organism.offspringCount === selected.offspringCount && organism.age === selected.age && organism.generation < selected.generation) ||
                (organism.offspringCount === selected.offspringCount &&
                    organism.age === selected.age &&
                    organism.generation === selected.generation &&
                    organism.id < selected.id)) {
                selected = organism;
            }
        }
        return selected;
    }
    function organismForAutoSelection(mode) {
        return mode === "oldest" ? oldestOrganism() : mostChildrenOrganism();
    }
    function ensureSelection() {
        if (autoSelectionMode) {
            const autoSelected = organismForAutoSelection(autoSelectionMode);
            selectedId = autoSelected?.id;
            return autoSelected;
        }
        const selected = selectedId ? world.organisms.get(selectedId) : undefined;
        if (selected) {
            return selected;
        }
        selectedId = undefined;
        return undefined;
    }
    function activateAutoSelection(mode) {
        autoSelectionMode = mode;
        selectedId = organismForAutoSelection(mode)?.id;
        tickAccumulator = 0;
        updateStatus(true);
        if (isRenderingEnabled) {
            drawWorld();
        }
    }
    function updateAutoSelectionControls() {
        const isOldest = autoSelectionMode === "oldest";
        const isMostChildren = autoSelectionMode === "mostChildren";
        autoSelectOldestButton.classList.toggle("is-active", isOldest);
        autoSelectMostChildrenButton.classList.toggle("is-active", isMostChildren);
        autoSelectOldestButton.setAttribute("aria-pressed", String(isOldest));
        autoSelectMostChildrenButton.setAttribute("aria-pressed", String(isMostChildren));
        autoSelectOldestButton.title = autoSelectionMode ? "Auto-select the oldest organism" : "Auto-select is off after manual selection";
        autoSelectMostChildrenButton.title = autoSelectionMode ? "Auto-select the organism with most children" : "Auto-select is off after manual selection";
    }
    function drawWorld() {
        resizeCanvasToDisplaySize();
        const size = world.config.gridSize;
        const width = canvas.width;
        const height = canvas.height;
        const cellWidth = width / size;
        const cellHeight = height / size;
        context.fillStyle = cssVar("--empty");
        context.fillRect(0, 0, width, height);
        context.fillStyle = cssVar("--barrier");
        for (const index of world.barriers) {
            const x = index % size;
            const y = Math.floor(index / size);
            context.fillRect(Math.floor(x * cellWidth), Math.floor(y * cellHeight), Math.ceil(cellWidth), Math.ceil(cellHeight));
        }
        context.fillStyle = cssVar("--food");
        for (const index of world.food) {
            const x = index % size;
            const y = Math.floor(index / size);
            context.fillRect(Math.floor(x * cellWidth), Math.floor(y * cellHeight), Math.ceil(cellWidth), Math.ceil(cellHeight));
        }
        for (let i = 0; i < world.organismList.length; i += 1) {
            const organism = world.organismList[i];
            context.fillStyle = organism.color;
            context.fillRect(Math.floor(organism.x * cellWidth), Math.floor(organism.y * cellHeight), Math.ceil(cellWidth), Math.ceil(cellHeight));
        }
        const selected = ensureSelection();
        if (selected) {
            context.strokeStyle = cssVar("--accent-strong");
            context.lineWidth = Math.max(2, Math.round(Math.min(cellWidth, cellHeight) * 1.4));
            context.strokeRect(Math.floor(selected.x * cellWidth) + 0.5, Math.floor(selected.y * cellHeight) + 0.5, Math.max(1, Math.ceil(cellWidth) - 1), Math.max(1, Math.ceil(cellHeight) - 1));
        }
    }
    function updateStatus(includeDetails = true) {
        const selected = ensureSelection();
        updateAutoSelectionControls();
        setText(tickValue, world.tickCount);
        setText(organismValue, world.organisms.size);
        setText(foodValue, world.food.length);
        setText(selectionValue, selected ? `#${selected.id}` : "-");
        if (includeDetails) {
            renderProgramDetails(selected);
            renderOrganismDetails(selected);
        }
    }
    function renderSeedEditorState() {
        if (seedDrafts.length === 0) {
            selectedSeedIndex = 0;
            if (seedEditor.value !== "") {
                seedEditor.value = "";
            }
            seedEditor.disabled = true;
            copySeedCodeButton.disabled = true;
            duplicateSeedCreatureButton.disabled = true;
            removeSeedCreatureButton.disabled = true;
            formatSeedButton.disabled = true;
            applySeedButton.disabled = false;
            renderSeedCreatureList();
            seedStats.innerHTML = `
        <div><span>Creatures</span><strong>0</strong></div>
        <div><span>Selection</span><strong>-</strong></div>
      `;
            seedBlockEditor.innerHTML = `<div class="seed-block-empty">Seed is empty. Add a creature, choose a preset, or place organisms on the map.</div>`;
            seedStatus.className = "seed-status is-ok";
            seedStatus.textContent = "Seed empty";
            return parseProgramText("");
        }
        selectedSeedIndex = Math.min(Math.max(0, selectedSeedIndex), seedDrafts.length - 1);
        const selectedText = seedDrafts[selectedSeedIndex] ?? "";
        if (seedEditor.value !== selectedText) {
            seedEditor.value = selectedText;
        }
        seedEditor.disabled = false;
        copySeedCodeButton.disabled = false;
        const parsed = parseProgramText(selectedText);
        const allParsed = parseAllSeedDrafts();
        renderSeedCreatureList();
        renderSeedStats(parsed);
        renderSeedBlocks(parsed);
        removeSeedCreatureButton.disabled = false;
        duplicateSeedCreatureButton.disabled = !parsed.ok;
        formatSeedButton.disabled = !parsed.ok;
        applySeedButton.disabled = !allParsed.ok;
        if (parsed.ok && allParsed.ok) {
            seedStatus.className = "seed-status is-ok";
            seedStatus.textContent = "Seed valid";
            return parsed;
        }
        seedStatus.className = "seed-status is-error";
        if (!parsed.ok) {
            seedStatus.textContent = parsed.errors
                .slice(0, 3)
                .map((error) => `line ${error.line}: ${error.message}`)
                .join(" - ");
            return parsed;
        }
        if (!allParsed.ok) {
            seedStatus.textContent = `Creature ${allParsed.seedIndex + 1} is invalid`;
        }
        return parsed;
    }
    function parseAllSeedDrafts() {
        const codes = [];
        for (let i = 0; i < seedDrafts.length; i += 1) {
            const result = parseProgramText(seedDrafts[i] ?? "");
            if (!result.ok) {
                return { ok: false, seedIndex: i, result };
            }
            codes.push(result.code);
        }
        return { ok: true, codes };
    }
    function renderSeedStats(parsed) {
        if (!parsed.ok) {
            seedStats.innerHTML = `
        <div><span>Creature</span><strong>${seedDrafts.length}</strong></div>
        <div><span>Selection</span><strong>${selectedSeedIndex + 1}</strong></div>
      `;
            return;
        }
        const profile = energyProfileForCodeLength(parsed.code.length, currentConfig);
        const budget = turnBudgetForCodeLength(parsed.code.length, currentConfig);
        seedStats.innerHTML = `
      <div><span>Creature</span><strong>${seedDrafts.length}</strong></div>
      <div><span>Blocks</span><strong>${parsed.code.length}</strong></div>
      <div><span>Actions/turn</span><strong>${budget}</strong></div>
      <div><span>Repro energy</span><strong>${profile.reproductionCost.toFixed(2)}</strong></div>
      <div><span>Energy cap</span><strong>${profile.maxEnergy.toFixed(2)}</strong></div>
    `;
    }
    function renderSeedCreatureList() {
        if (seedDrafts.length === 0) {
            seedCreatureList.innerHTML = `<div class="seed-creature-empty">No seed creatures</div>`;
            return;
        }
        seedCreatureList.innerHTML = seedDrafts
            .map((draft, index) => {
            const parsed = parseProgramText(draft);
            const selectedClass = index === selectedSeedIndex ? " is-selected" : "";
            const detail = parsed.ok ? `${parsed.code.length} blocks` : "error";
            return `
          <button type="button" class="seed-creature-item${selectedClass}" data-seed-index="${index}">
            <strong>Creature ${index + 1}</strong>
            <span>${detail}</span>
          </button>
        `;
        })
            .join("");
    }
    function renderSeedBlocks(parsed) {
        if (!parsed.ok) {
            seedBlockEditor.innerHTML = `<div class="seed-block-empty">Fix the text code to return to block editing.</div>`;
            return;
        }
        seedBlockEditor.innerHTML = parsed.code.map(renderSeedBlock).join("");
    }
    function renderSeedBlock(instruction, index) {
        const specs = instructionSpecs[instruction.op];
        const args = specs
            .map((spec, argIndex) => renderSeedArgInput(instruction, index, argIndex, spec))
            .join("");
        return `
      <div class="seed-block" data-block-index="${index}">
        <span class="seed-block-address">${String(index).padStart(2, "0")}</span>
        <select class="seed-opcode-input" data-block-index="${index}" aria-label="Block ${index + 1} opcode">
          ${opcodes.map((op) => `<option value="${op}" ${op === instruction.op ? "selected" : ""}>${op}</option>`).join("")}
        </select>
        <span class="seed-block-args">${args}</span>
        <span class="seed-block-actions">
          <button type="button" data-block-action="up" data-block-index="${index}">Up</button>
          <button type="button" data-block-action="down" data-block-index="${index}">Down</button>
          <button type="button" data-block-action="duplicate" data-block-index="${index}">Dup</button>
          <button type="button" data-block-action="delete" data-block-index="${index}">X</button>
        </span>
      </div>
    `;
    }
    function renderSeedArgInput(instruction, blockIndex, argIndex, spec) {
        const arg = instruction.args[argIndex] ?? defaultArgForSpec(spec, argIndex, instruction.op);
        const attributes = `data-block-index="${blockIndex}" data-arg-index="${argIndex}" data-arg-spec="${spec}" aria-label="Argument ${argIndex + 1}"`;
        if (spec === "reg") {
            return `
        <select class="seed-arg-input" ${attributes}>
          ${registers.map((name) => `<option value="${name}" ${arg.kind === "reg" && arg.value === name ? "selected" : ""}>${name}</option>`).join("")}
        </select>
      `;
        }
        if (spec === "direction") {
            const currentValue = formatArg(arg);
            const options = [...directions.map((direction) => direction.name), ...registers];
            const normalizedOptions = options.includes(currentValue) ? options : [...options, currentValue];
            return `
        <select class="seed-arg-input" ${attributes}>
          ${normalizedOptions.map((value) => `<option value="${value}" ${currentValue === value ? "selected" : ""}>${value}</option>`).join("")}
        </select>
      `;
        }
        return `<input class="seed-arg-input" ${attributes} type="text" value="${formatArg(arg)}" />`;
    }
    function applySeedFromEditor() {
        const parsed = parseAllSeedDrafts();
        if (!parsed.ok) {
            selectedSeedIndex = parsed.seedIndex;
            renderSeedEditorState();
            return;
        }
        activeSeedCodes = parsed.codes.map((code) => cloneCode(code));
        seedDrafts = activeSeedCodes.map((code) => formatProgramText(code));
        resetWorldFromActiveSeed();
        seedDialog.close();
    }
    function resetWorldFromActiveSeed() {
        if (isRunning) {
            isRunning = false;
            toggleRunButton.textContent = "Start";
        }
        world = createWorld(currentConfig);
        autoSelectionMode ??= "oldest";
        selectedId = undefined;
        tickAccumulator = 0;
        updateStatus(isRenderingEnabled);
        renderSeedEditorState();
        if (isRenderingEnabled) {
            drawWorld();
        }
    }
    function populateSeedPresets() {
        const presetOptions = [
            `<option value="">Choose preset...</option>`,
            ...savedSeedLifeForms.map((seed) => `<option value="${seed.name}">${seed.name}</option>`)
        ]
            .join("");
        seedPresetInput.innerHTML = presetOptions;
        spawnPresetInput.innerHTML = presetOptions;
        seedPresetInput.value = "";
        spawnPresetInput.value = "";
        blockOpcodeInput.innerHTML = opcodes.map((op) => `<option value="${op}">${op}</option>`).join("");
        blockOpcodeInput.value = "NOOP";
        blockPalette.innerHTML = opcodeGroups
            .map((group) => `
          <div class="block-palette-group">
            <h3>${group.title}</h3>
            <div class="block-palette-buttons">
              ${group.ops.map((op) => `<button type="button" data-palette-op="${op}">${op}</button>`).join("")}
            </div>
          </div>
        `)
            .join("");
    }
    function selectSeedDraft(index) {
        if (seedDrafts.length === 0) {
            selectedSeedIndex = 0;
            seedPresetInput.value = "";
            renderSeedEditorState();
            return;
        }
        selectedSeedIndex = Math.min(Math.max(0, index), seedDrafts.length - 1);
        seedPresetInput.value = "";
        seedEditor.value = seedDrafts[selectedSeedIndex] ?? "";
        renderSeedEditorState();
    }
    function setSelectedSeedCode(code) {
        if (seedDrafts.length === 0) {
            seedDrafts.push(formatProgramText(code));
            selectedSeedIndex = 0;
            seedEditor.value = seedDrafts[selectedSeedIndex] ?? "";
            renderSeedEditorState();
            return;
        }
        seedDrafts[selectedSeedIndex] = formatProgramText(code);
        seedEditor.value = seedDrafts[selectedSeedIndex] ?? "";
        renderSeedEditorState();
    }
    function mutateSelectedSeedCode(mutator) {
        if (seedDrafts.length === 0) {
            const code = [];
            mutator(code);
            if (code.length === 0) {
                code.push(defaultInstructionForOpcode("NOOP"));
            }
            addSeedCreatureFromCode(code);
            return;
        }
        const parsed = parseProgramText(seedDrafts[selectedSeedIndex] ?? "");
        if (!parsed.ok) {
            renderSeedEditorState();
            return;
        }
        const code = parsed.code.map(cloneInstruction);
        mutator(code);
        if (code.length === 0) {
            code.push(defaultInstructionForOpcode("NOOP"));
        }
        setSelectedSeedCode(code);
    }
    function appendBlockToSelected(op) {
        mutateSelectedSeedCode((code) => {
            code.push(defaultInstructionForOpcode(op));
        });
    }
    function addSeedCreatureFromCode(code) {
        seedDrafts.push(formatProgramText(code));
        selectedSeedIndex = seedDrafts.length - 1;
        renderSeedEditorState();
    }
    function selectedSeedParsedCode() {
        if (seedDrafts.length === 0) {
            return undefined;
        }
        const parsed = parseProgramText(seedDrafts[selectedSeedIndex] ?? "");
        return parsed.ok ? parsed.code : undefined;
    }
    function selectedOrganismCodeText() {
        const selected = ensureSelection();
        return selected ? formatProgramText(selected.code) : undefined;
    }
    function showDialog(dialog) {
        if (typeof dialog.showModal === "function") {
            dialog.showModal();
        }
        else {
            dialog.setAttribute("open", "");
        }
    }
    function openSpawnEditor() {
        const selectedCode = selectedOrganismCodeText();
        spawnPresetInput.value = "";
        spawnEditor.value = selectedCode ?? (placementCode ? formatProgramText(placementCode) : "");
        spawnStatus.className = "seed-status";
        spawnStatus.textContent = selectedCode
            ? "Selected organism code loaded"
            : placementCode
                ? "Placement code loaded"
                : "Paste code to spawn a new life form";
        showDialog(spawnDialog);
    }
    function parseSpawnEditorCode() {
        const parsed = parseProgramText(spawnEditor.value);
        if (!parsed.ok) {
            showCodeStatus(spawnStatus, parsed.errors
                .slice(0, 3)
                .map((error) => `line ${error.line}: ${error.message}`)
                .join(" - "), false);
            return undefined;
        }
        if (parsed.code.length === 0) {
            showCodeStatus(spawnStatus, "Code is empty", false);
            return undefined;
        }
        return parsed.code;
    }
    function spawnCodeFromEditor() {
        const code = parseSpawnEditorCode();
        if (!code) {
            return;
        }
        const spawned = world.spawnOrganismFromCode(code);
        if (!spawned) {
            showCodeStatus(spawnStatus, "No free cell available", false);
            return;
        }
        selectedId = spawned.id;
        autoSelectionMode = undefined;
        tickAccumulator = 0;
        showCodeStatus(spawnStatus, `Spawned #${spawned.id}`, true);
        updateStatus(true);
        if (isRenderingEnabled) {
            drawWorld();
        }
    }
    function startPlacementFromEditor() {
        const code = parseSpawnEditorCode();
        if (!code) {
            return;
        }
        setPlacementCode(code);
        showCodeStatus(spawnStatus, "Placement mode active", true);
        spawnDialog.close();
    }
    function setPlacementCode(code) {
        placementCode = code ? cloneCode(code) : undefined;
        finishPlacementButton.textContent = "Done placing";
        finishPlacementButton.hidden = !placementCode;
        canvas.classList.toggle("is-placing", placementCode !== undefined);
        openSpawnDialogButton.classList.toggle("is-active", placementCode !== undefined);
        openSpawnDialogButton.title = placementCode ? "Placement mode is active" : "";
        finishPlacementButton.title = placementCode ? "Stop placing life forms on the map" : "";
        showPlacementStatus(placementCode ? "Click cells to place" : "", Boolean(placementCode));
    }
    function showPlacementStatus(message, persistent = false) {
        placementStatus.textContent = message;
        placementStatus.hidden = message.length === 0;
        if (placementStatusTimer !== undefined) {
            window.clearTimeout(placementStatusTimer);
            placementStatusTimer = undefined;
        }
        if (message.length > 0 && !persistent) {
            placementStatusTimer = window.setTimeout(() => {
                placementStatus.textContent = placementCode ? "Click cells to place" : "";
                placementStatus.hidden = !placementCode;
                placementStatusTimer = undefined;
            }, 1200);
        }
    }
    function placeCodeAtCell(x, y) {
        if (!placementCode) {
            return;
        }
        const spawned = world.spawnOrganismFromCodeAt(placementCode, x, y);
        if (!spawned) {
            showPlacementStatus("Blocked cell");
            return;
        }
        selectedId = spawned.id;
        autoSelectionMode = undefined;
        tickAccumulator = 0;
        updateStatus(true);
        if (isRenderingEnabled) {
            drawWorld();
        }
        showPlacementStatus(`Placed #${spawned.id}`);
    }
    function renderSettingsPanel() {
        settingsPanel.innerHTML = settingGroups.map(renderSettingGroup).join("");
        for (const setting of settingGroups.flatMap((group) => group.settings)) {
            const input = settingsPanel.querySelector(`[data-setting-key="${setting.key}"]`);
            if (!input) {
                continue;
            }
            input.addEventListener("input", () => {
                updateConfigSetting(setting, input);
            });
            input.addEventListener("change", () => {
                updateConfigSetting(setting, input);
            });
        }
    }
    function renderSettingGroup(group) {
        const content = group.settings.map(renderSetting).join("");
        if (group.advanced) {
            return `<details class="settings-group settings-group-advanced"><summary>${group.title}</summary>${content}</details>`;
        }
        return `<div class="settings-group settings-group-base"><h3>${group.title}</h3>${content}</div>`;
    }
    function renderSetting(setting) {
        if (setting.type === "boolean") {
            return `
        <label class="setting-check">
          <input data-setting-key="${setting.key}" type="checkbox" ${currentConfig[setting.key] ? "checked" : ""} />
          <span>${setting.label}</span>
        </label>
      `;
        }
        if (setting.type === "select") {
            return `
        <label class="setting-field">
          <span>${setting.label}${setting.resetOnly ? " (reset)" : ""}</span>
          <select data-setting-key="${setting.key}" class="select-input">
            ${setting.options
                .map((option) => `<option value="${option.value}" ${currentConfig[setting.key] === option.value ? "selected" : ""}>${option.label}</option>`)
                .join("")}
          </select>
        </label>
      `;
        }
        const value = configValueToInput(setting);
        return `
      <label class="setting-field">
        <span>${setting.label}${setting.resetOnly ? " (reset)" : ""}<strong data-setting-value="${setting.key}">${formatSettingValue(setting)}</strong></span>
        <input
          data-setting-key="${setting.key}"
          type="number"
          min="${setting.min}"
          max="${setting.max}"
          step="${setting.step}"
          value="${value}"
        />
      </label>
    `;
    }
    function updateConfigSetting(setting, input) {
        if (setting.type === "boolean") {
            currentConfig = { ...currentConfig, [setting.key]: input.checked };
        }
        else if (setting.type === "select") {
            currentConfig = { ...currentConfig, [setting.key]: input.value };
        }
        else {
            const rawValue = Number(input.value);
            if (!Number.isFinite(rawValue)) {
                return;
            }
            const scaledValue = rawValue / (setting.scale ?? 1);
            currentConfig = { ...currentConfig, [setting.key]: scaledValue };
        }
        const resetOnly = setting.resetOnly === true;
        if (!resetOnly) {
            world.applyRuntimeConfig(runtimeConfigForCurrentWorld());
        }
        syncSettingValue(setting);
        renderSeedEditorState();
        updateStatus(isRenderingEnabled);
        if (isRenderingEnabled) {
            drawWorld();
        }
    }
    function runtimeConfigForCurrentWorld() {
        return { ...currentConfig, gridSize: world.config.gridSize };
    }
    function syncSettingValue(setting) {
        if (setting.type !== "number") {
            return;
        }
        const valueNode = settingsPanel.querySelector(`[data-setting-value="${setting.key}"]`);
        if (valueNode) {
            valueNode.textContent = formatSettingValue(setting);
        }
    }
    function configValueToInput(setting) {
        const value = Number(currentConfig[setting.key]) * (setting.scale ?? 1);
        return formatNumber(value, setting.digits ?? decimalsForStep(setting.step));
    }
    function formatSettingValue(setting) {
        const value = Number(currentConfig[setting.key]) * (setting.scale ?? 1);
        const suffix = setting.scale === 100 ? "%" : "";
        return `${formatNumber(value, setting.digits ?? decimalsForStep(setting.step))}${suffix}`;
    }
    function formatNumber(value, digits) {
        if (digits <= 0) {
            return String(Math.round(value));
        }
        return value.toFixed(digits);
    }
    function decimalsForStep(step) {
        const stepText = String(step);
        const decimalIndex = stepText.indexOf(".");
        return decimalIndex >= 0 ? stepText.length - decimalIndex - 1 : 0;
    }
    async function writeClipboard(text) {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return;
        }
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.append(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
    }
    async function readClipboard() {
        if (!navigator.clipboard?.readText) {
            throw new Error("Clipboard read is not available");
        }
        return navigator.clipboard.readText();
    }
    function flashButtonLabel(button, label, timer, onTimer) {
        const original = button.dataset.defaultLabel ?? button.textContent ?? "";
        button.dataset.defaultLabel = original;
        button.textContent = label;
        if (timer !== undefined) {
            window.clearTimeout(timer);
        }
        onTimer(window.setTimeout(() => {
            button.textContent = button.dataset.defaultLabel ?? original;
            onTimer(undefined);
        }, 1200));
    }
    function showCodeStatus(node, message, ok) {
        node.className = `seed-status ${ok ? "is-ok" : "is-error"}`;
        node.textContent = message;
    }
    function highlightedProgramIndex(organism) {
        if (organism.code.length === 0) {
            return undefined;
        }
        return isRunning ? undefined : modulo(organism.pc, organism.code.length);
    }
    function renderProgramDetails(organism) {
        if (!organism) {
            renderedProgramKey = "";
            renderedProgramNextIndex = undefined;
            programDetails.className = "program-details";
            programDetails.textContent = "Click an occupied cell to inspect code.";
            return;
        }
        const programKey = `${organism.id}:${organism.code.length}:${organism.code.map(formatInstruction).join("|")}`;
        if (programKey === renderedProgramKey) {
            updateRenderedProgramState(organism);
            return;
        }
        const registersMarkup = registers
            .map((name) => `<code data-register-name="${name}">${name}=${organism.registers[registerIndexes[name]] ?? 0}</code>`)
            .join("");
        const highlightedIndex = highlightedProgramIndex(organism);
        const programMarkup = organism.code
            .map((instruction, index) => {
            const className = index === highlightedIndex ? "program-line is-next" : "program-line";
            return `<div class="${className}" data-program-index="${index}"><span class="addr">${String(index).padStart(2, "0")}</span><span class="instruction">${formatInstruction(instruction)}</span></div>`;
        })
            .join("");
        programDetails.className = "program-details has-selection";
        programDetails.innerHTML = `
    <div class="registers" aria-label="Registers">${registersMarkup}</div>
    <div class="program" aria-label="Organism program">${programMarkup}</div>
  `;
        renderedProgramKey = programKey;
        renderedProgramNextIndex = highlightedIndex;
    }
    function updateRenderedProgramState(organism) {
        for (const name of registers) {
            const node = programDetails.querySelector(`[data-register-name="${name}"]`);
            if (node) {
                node.textContent = `${name}=${organism.registers[registerIndexes[name]] ?? 0}`;
            }
        }
        const nextIndex = highlightedProgramIndex(organism);
        if (nextIndex === renderedProgramNextIndex) {
            return;
        }
        const previousNode = renderedProgramNextIndex === undefined ? undefined : programDetails.querySelector(`[data-program-index="${renderedProgramNextIndex}"]`);
        previousNode?.classList.remove("is-next");
        if (nextIndex !== undefined) {
            programDetails.querySelector(`[data-program-index="${nextIndex}"]`)?.classList.add("is-next");
        }
        renderedProgramNextIndex = nextIndex;
    }
    function renderOrganismDetails(organism) {
        if (!organism) {
            organismDetails.className = "organism-details";
            organismDetails.textContent = "Click an occupied cell to inspect details.";
            return;
        }
        const maxAgeLabel = currentConfig.maxAge > 0 ? String(Math.round(currentConfig.maxAge)) : "off";
        organismDetails.className = "organism-details has-selection";
        organismDetails.innerHTML = `
    <div class="organism-compact">
      <div><span>ID</span><strong>#${organism.id}</strong></div>
      <div><span>Pos</span><strong>${organism.x}, ${organism.y}</strong></div>
      <div>
        <span>Energy</span>
        <strong class="organism-energy-value">
          <span>${organism.energy.toFixed(1)}</span>
          <span>/ ${organism.maxEnergy.toFixed(1)}</span>
        </strong>
      </div>
      <div><span>Repro energy</span><strong>${organism.reproductionCost.toFixed(1)}</strong></div>
      <div><span>Age</span><strong>${organism.age} / ${maxAgeLabel}</strong></div>
      <div><span>Children</span><strong>${organism.offspringCount}</strong></div>
      <div><span>Blocks</span><strong>${organism.code.length}</strong></div>
      <div><span>Actions/turn</span><strong>${organism.turnBudget}</strong></div>
    </div>
  `;
    }
    function runSimulationTick() {
        world.tick();
    }
    function runFastForwardFrame(now) {
        const deadline = performance.now() + fastForwardFrameBudgetMs;
        let steps = 0;
        while (steps < fastForwardMaxTicksPerFrame && performance.now() < deadline) {
            for (let i = 0; i < fastForwardBatchSize && steps < fastForwardMaxTicksPerFrame; i += 1) {
                runSimulationTick();
                steps += 1;
            }
        }
        if (now - lastFastForwardStatusTime >= fastForwardStatusIntervalMs) {
            updateStatus(false);
            lastFastForwardStatusTime = now;
        }
    }
    function animationLoop(now) {
        const elapsedSeconds = Math.min(0.25, (now - lastFrameTime) / 1000);
        lastFrameTime = now;
        if (isRunning && !isRenderingEnabled) {
            runFastForwardFrame(now);
        }
        else if (isRunning) {
            tickAccumulator += elapsedSeconds * speed;
            let steps = 0;
            while (tickAccumulator >= 1 && steps < maxTicksPerFrame) {
                runSimulationTick();
                tickAccumulator -= 1;
                steps += 1;
            }
            if (steps === maxTicksPerFrame) {
                tickAccumulator = 0;
            }
            if (steps > 0) {
                updateStatus(true);
            }
        }
        if (isRenderingEnabled) {
            drawWorld();
        }
        scheduleNextFrame();
    }
    function scheduleNextFrame() {
        if (isRunning && !isRenderingEnabled) {
            window.setTimeout(() => animationLoop(performance.now()), 0);
            return;
        }
        requestAnimationFrame(animationLoop);
    }
    toggleRunButton.addEventListener("click", () => {
        isRunning = !isRunning;
        toggleRunButton.textContent = isRunning ? "Pause" : "Start";
        updateStatus(true);
        if (isRenderingEnabled) {
            drawWorld();
        }
    });
    stepOnceButton.addEventListener("click", () => {
        if (isRunning) {
            isRunning = false;
            toggleRunButton.textContent = "Start";
        }
        const selected = ensureSelection();
        if (selected) {
            const stepped = world.stepSelectedInstruction(selected.id);
            selectedId = stepped?.id;
        }
        tickAccumulator = 0;
        updateStatus(true);
        if (isRenderingEnabled) {
            drawWorld();
        }
    });
    resetWorldButton.addEventListener("click", () => {
        resetWorldFromActiveSeed();
    });
    finishPlacementButton.addEventListener("click", () => {
        setPlacementCode(undefined);
    });
    autoSelectOldestButton.addEventListener("click", () => {
        activateAutoSelection("oldest");
    });
    autoSelectMostChildrenButton.addEventListener("click", () => {
        activateAutoSelection("mostChildren");
    });
    openSeedEditorButton.addEventListener("click", () => {
        showDialog(seedDialog);
    });
    openSpawnDialogButton.addEventListener("click", () => {
        openSpawnEditor();
    });
    closeSeedEditorButton.addEventListener("click", () => {
        seedDialog.close();
    });
    closeSpawnDialogButton.addEventListener("click", () => {
        spawnDialog.close();
    });
    renderInput.addEventListener("change", () => {
        isRenderingEnabled = renderInput.checked;
        tickAccumulator = 0;
        if (isRenderingEnabled) {
            updateStatus(true);
            drawWorld();
        }
        else {
            updateStatus(false);
            lastFastForwardStatusTime = performance.now();
        }
    });
    speedInput.addEventListener("input", () => {
        setRenderSpeed(Number(speedInput.value));
    });
    speedNumberInput.addEventListener("input", () => {
        setRenderSpeed(Number(speedNumberInput.value));
    });
    seedPresetInput.addEventListener("change", () => {
        const seed = savedSeedLifeForms.find((candidate) => candidate.name === seedPresetInput.value);
        if (!seed) {
            seedPresetInput.value = "";
            return;
        }
        setSelectedSeedCode(seed.createCode());
        seedStatus.className = "seed-status is-ok";
        seedStatus.textContent = `${seed.name} applied to creature ${selectedSeedIndex + 1}`;
        seedPresetInput.value = "";
    });
    spawnPresetInput.addEventListener("change", () => {
        const seed = savedSeedLifeForms.find((candidate) => candidate.name === spawnPresetInput.value);
        if (!seed) {
            spawnPresetInput.value = "";
            return;
        }
        spawnEditor.value = formatProgramText(seed.createCode());
        showCodeStatus(spawnStatus, `${seed.name} loaded`, true);
        spawnPresetInput.value = "";
    });
    seedEditor.addEventListener("input", () => {
        seedDrafts[selectedSeedIndex] = seedEditor.value;
        renderSeedEditorState();
    });
    copySelectedProgramButton.addEventListener("click", async () => {
        const text = selectedOrganismCodeText();
        if (!text) {
            flashButtonLabel(copySelectedProgramButton, "No code", copySelectedProgramLabelTimer, (timer) => {
                copySelectedProgramLabelTimer = timer;
            });
            return;
        }
        try {
            await writeClipboard(text);
        }
        catch {
            flashButtonLabel(copySelectedProgramButton, "Failed", copySelectedProgramLabelTimer, (timer) => {
                copySelectedProgramLabelTimer = timer;
            });
            return;
        }
        flashButtonLabel(copySelectedProgramButton, "Copied", copySelectedProgramLabelTimer, (timer) => {
            copySelectedProgramLabelTimer = timer;
        });
    });
    copySeedCodeButton.addEventListener("click", async () => {
        try {
            await writeClipboard(seedDrafts[selectedSeedIndex] ?? "");
        }
        catch {
            flashButtonLabel(copySeedCodeButton, "Failed", copySeedCodeLabelTimer, (timer) => {
                copySeedCodeLabelTimer = timer;
            });
            return;
        }
        flashButtonLabel(copySeedCodeButton, "Copied", copySeedCodeLabelTimer, (timer) => {
            copySeedCodeLabelTimer = timer;
        });
    });
    pasteSeedCodeButton.addEventListener("click", async () => {
        try {
            seedEditor.value = await readClipboard();
            seedDrafts[selectedSeedIndex] = seedEditor.value;
            renderSeedEditorState();
            seedStatus.className = "seed-status is-ok";
            seedStatus.textContent = "Clipboard pasted";
        }
        catch {
            seedStatus.className = "seed-status is-error";
            seedStatus.textContent = "Clipboard read is not available";
        }
    });
    pasteSpawnCodeButton.addEventListener("click", async () => {
        try {
            spawnEditor.value = await readClipboard();
            showCodeStatus(spawnStatus, "Clipboard pasted", true);
        }
        catch {
            showCodeStatus(spawnStatus, "Clipboard read is not available", false);
        }
    });
    spawnCodeButton.addEventListener("click", () => {
        spawnCodeFromEditor();
    });
    placeSpawnCodeButton.addEventListener("click", () => {
        startPlacementFromEditor();
    });
    seedCreatureList.addEventListener("click", (event) => {
        const button = event.target.closest("[data-seed-index]");
        if (!button) {
            return;
        }
        selectSeedDraft(Number(button.dataset.seedIndex));
    });
    addSeedCreatureButton.addEventListener("click", () => {
        addSeedCreatureFromCode(startingSeedLifeForm.createCode());
    });
    duplicateSeedCreatureButton.addEventListener("click", () => {
        const code = selectedSeedParsedCode();
        if (!code) {
            return;
        }
        addSeedCreatureFromCode(code);
    });
    removeSeedCreatureButton.addEventListener("click", () => {
        if (seedDrafts.length === 0) {
            return;
        }
        seedDrafts.splice(selectedSeedIndex, 1);
        selectedSeedIndex = seedDrafts.length === 0 ? 0 : Math.min(selectedSeedIndex, seedDrafts.length - 1);
        renderSeedEditorState();
    });
    appendBlockButton.addEventListener("click", () => {
        if (isOpcode(blockOpcodeInput.value)) {
            appendBlockToSelected(blockOpcodeInput.value);
        }
    });
    blockPalette.addEventListener("click", (event) => {
        const button = event.target.closest("[data-palette-op]");
        const op = button?.dataset.paletteOp;
        if (op && isOpcode(op)) {
            appendBlockToSelected(op);
        }
    });
    seedBlockEditor.addEventListener("change", (event) => {
        const target = event.target;
        const blockIndex = Number(target.dataset.blockIndex);
        if (!Number.isInteger(blockIndex)) {
            return;
        }
        if (target.classList.contains("seed-opcode-input") && isOpcode(target.value)) {
            mutateSelectedSeedCode((code) => {
                code[blockIndex] = instructionWithOpcode(target.value, code[blockIndex]);
            });
            return;
        }
        if (target.classList.contains("seed-arg-input")) {
            const argIndex = Number(target.dataset.argIndex);
            const spec = target.dataset.argSpec;
            if (!Number.isInteger(argIndex) || !spec) {
                return;
            }
            const nextArg = parseArgControlValue(spec, target.value);
            if (!nextArg) {
                renderSeedEditorState();
                return;
            }
            mutateSelectedSeedCode((code) => {
                const instruction = code[blockIndex];
                if (instruction) {
                    instruction.args[argIndex] = nextArg;
                }
            });
        }
    });
    seedBlockEditor.addEventListener("click", (event) => {
        const button = event.target.closest("[data-block-action]");
        if (!button) {
            return;
        }
        const blockIndex = Number(button.dataset.blockIndex);
        const action = button.dataset.blockAction;
        if (!Number.isInteger(blockIndex) || !action) {
            return;
        }
        mutateSelectedSeedCode((code) => {
            if (action === "up" && blockIndex > 0) {
                const item = code[blockIndex];
                code[blockIndex] = code[blockIndex - 1];
                code[blockIndex - 1] = item;
            }
            else if (action === "down" && blockIndex < code.length - 1) {
                const item = code[blockIndex];
                code[blockIndex] = code[blockIndex + 1];
                code[blockIndex + 1] = item;
            }
            else if (action === "duplicate") {
                code.splice(blockIndex + 1, 0, cloneInstruction(code[blockIndex]));
            }
            else if (action === "delete" && code.length > 1) {
                code.splice(blockIndex, 1);
            }
        });
    });
    applySeedButton.addEventListener("click", () => {
        applySeedFromEditor();
    });
    formatSeedButton.addEventListener("click", () => {
        const parsed = renderSeedEditorState();
        if (!parsed.ok) {
            return;
        }
        setSelectedSeedCode(parsed.code);
    });
    canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(((event.clientX - rect.left) / rect.width) * world.config.gridSize);
        const y = Math.floor(((event.clientY - rect.top) / rect.height) * world.config.gridSize);
        if (placementCode) {
            placeCodeAtCell(x, y);
            return;
        }
        const organism = world.organismAt(x, y);
        selectedId = organism?.id;
        autoSelectionMode = undefined;
        updateStatus(isRenderingEnabled);
        if (isRenderingEnabled) {
            drawWorld();
        }
    });
    setRenderSpeed(speed);
    renderSettingsPanel();
    populateSeedPresets();
    seedEditor.value = seedDrafts[selectedSeedIndex] ?? "";
    renderSeedEditorState();
    updateStatus();
    scheduleNextFrame();
}
