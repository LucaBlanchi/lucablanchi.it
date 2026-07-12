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
            { type: "number", key: "initialEnergy", label: "Initial energy", min: 1, max: 200, step: 1, digits: 1, resetOnly: true },
            { type: "number", key: "foodSpawnAttemptsPerTick", label: "Food attempts/tick", min: 0, max: 100, step: 1 },
            { type: "number", key: "maxFood", label: "Food cap", min: 0, max: 50000, step: 100 },
            { type: "number", key: "foodEnergy", label: "Food energy gain", min: 0, max: 100, step: 1, digits: 1 },
            { type: "number", key: "mutationRate", label: "Point mutation %", min: 0, max: 10, step: 0.1, scale: 100, digits: 1 }
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
    const seedDialog = requireElement("#seedDialog");
    const closeSeedEditorButton = requireElement("#closeSeedEditor");
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
    const seedStats = requireElement("#seedStats");
    const seedStatus = requireElement("#seedStatus");
    const applySeedButton = requireElement("#applySeed");
    const formatSeedButton = requireElement("#formatSeed");
    const loadSelectedSeedButton = requireElement("#loadSelectedSeed");
    const programDetails = requireElement("#programDetails");
    const organismDetails = requireElement("#organismDetails");
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
    let speed = normalizeRenderSpeed(Number(speedInput.value));
    let lastFrameTime = performance.now();
    let lastFastForwardStatusTime = 0;
    let tickAccumulator = 0;
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
    function ensureSelection() {
        const selected = selectedId ? world.organisms.get(selectedId) : undefined;
        if (selected) {
            return selected;
        }
        const fallback = oldestOrganism();
        selectedId = fallback?.id;
        return fallback;
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
        selectedSeedIndex = Math.min(Math.max(0, selectedSeedIndex), seedDrafts.length - 1);
        const selectedText = seedDrafts[selectedSeedIndex] ?? "";
        if (seedEditor.value !== selectedText) {
            seedEditor.value = selectedText;
        }
        const parsed = parseProgramText(selectedText);
        const allParsed = parseAllSeedDrafts();
        renderSeedCreatureList();
        renderSeedStats(parsed);
        renderSeedBlocks(parsed);
        removeSeedCreatureButton.disabled = seedDrafts.length <= 1;
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
        selectedId = undefined;
        tickAccumulator = 0;
        updateStatus(isRenderingEnabled);
        renderSeedEditorState();
        if (isRenderingEnabled) {
            drawWorld();
        }
    }
    function populateSeedPresets() {
        seedPresetInput.innerHTML = savedSeedLifeForms
            .map((seed) => `<option value="${seed.name}">${seed.name}</option>`)
            .join("");
        seedPresetInput.value = startingSeedLifeForm.name;
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
        selectedSeedIndex = Math.min(Math.max(0, index), seedDrafts.length - 1);
        seedEditor.value = seedDrafts[selectedSeedIndex] ?? "";
        renderSeedEditorState();
    }
    function setSelectedSeedCode(code) {
        seedDrafts[selectedSeedIndex] = formatProgramText(code);
        seedEditor.value = seedDrafts[selectedSeedIndex] ?? "";
        renderSeedEditorState();
    }
    function mutateSelectedSeedCode(mutator) {
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
        const parsed = parseProgramText(seedDrafts[selectedSeedIndex] ?? "");
        return parsed.ok ? parsed.code : undefined;
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
          <span>${setting.label}</span>
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
        const resetOnly = setting.type === "number" && setting.resetOnly;
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
    function renderProgramDetails(organism) {
        if (!organism) {
            programDetails.className = "program-details";
            programDetails.textContent = "Click an occupied cell to inspect code.";
            return;
        }
        const registersMarkup = registers
            .map((name) => `<code>${name}=${organism.registers[registerIndexes[name]] ?? 0}</code>`)
            .join("");
        const programMarkup = organism.code
            .map((instruction, index) => {
            const className = index === modulo(organism.pc, organism.code.length) ? "program-line is-next" : "program-line";
            return `<div class="${className}"><span class="addr">${String(index).padStart(2, "0")}</span><span class="instruction">${formatInstruction(instruction)}</span></div>`;
        })
            .join("");
        programDetails.className = "program-details has-selection";
        programDetails.innerHTML = `
    <div class="registers" aria-label="Registers">${registersMarkup}</div>
    <div class="program" aria-label="Organism program">${programMarkup}</div>
  `;
    }
    function renderOrganismDetails(organism) {
        if (!organism) {
            organismDetails.className = "organism-details";
            organismDetails.textContent = "Click an occupied cell to inspect details.";
            return;
        }
        organismDetails.className = "organism-details has-selection";
        organismDetails.innerHTML = `
    <div class="organism-compact">
      <div><span>ID</span><strong>#${organism.id}</strong></div>
      <div><span>Pos</span><strong>${organism.x}, ${organism.y}</strong></div>
      <div><span>Energy</span><strong>${organism.energy.toFixed(1)} / ${organism.maxEnergy.toFixed(1)}</strong></div>
      <div><span>Repro energy</span><strong>${organism.reproductionCost.toFixed(1)}</strong></div>
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
    });
    stepOnceButton.addEventListener("click", () => {
        if (isRunning) {
            isRunning = false;
            toggleRunButton.textContent = "Start";
        }
        runSimulationTick();
        tickAccumulator = 0;
        updateStatus(true);
        if (isRenderingEnabled) {
            drawWorld();
        }
    });
    resetWorldButton.addEventListener("click", () => {
        resetWorldFromActiveSeed();
    });
    openSeedEditorButton.addEventListener("click", () => {
        if (typeof seedDialog.showModal === "function") {
            seedDialog.showModal();
        }
        else {
            seedDialog.setAttribute("open", "");
        }
    });
    closeSeedEditorButton.addEventListener("click", () => {
        seedDialog.close();
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
            return;
        }
        setSelectedSeedCode(seed.createCode());
    });
    seedEditor.addEventListener("input", () => {
        seedDrafts[selectedSeedIndex] = seedEditor.value;
        renderSeedEditorState();
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
        if (seedDrafts.length <= 1) {
            return;
        }
        seedDrafts.splice(selectedSeedIndex, 1);
        selectedSeedIndex = Math.min(selectedSeedIndex, seedDrafts.length - 1);
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
    loadSelectedSeedButton.addEventListener("click", () => {
        const selected = ensureSelection();
        if (!selected) {
            seedStatus.className = "seed-status is-error";
            seedStatus.textContent = "No organism selected";
            return;
        }
        setSelectedSeedCode(selected.code);
    });
    canvas.addEventListener("click", (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(((event.clientX - rect.left) / rect.width) * world.config.gridSize);
        const y = Math.floor(((event.clientY - rect.top) / rect.height) * world.config.gridSize);
        const organism = world.organismAt(x, y);
        selectedId = organism?.id;
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
