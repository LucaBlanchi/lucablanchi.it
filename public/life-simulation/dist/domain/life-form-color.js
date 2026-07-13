import { modulo } from "./instructions.js";
const founderHueBands = [4, 28, 155, 205, 258, 305, 334];
const ancestorHueBands = [4, 24, 42, 205, 226, 252, 278, 306, 334, 352];
export function founderHueForCode(code, seedIndex = 0) {
    const hash = hashCode(code);
    const baseHue = founderHueBands[(hash + seedIndex) % founderHueBands.length];
    return modulo(baseHue + seedIndex * 53 + (Math.floor(hash / founderHueBands.length) % 18) - 9, 360);
}
export function nextLineageHue(parentHue, didCodeMutate, config) {
    if (!didCodeMutate || Math.random() >= config.lineageColorDriftRate) {
        return parentHue;
    }
    const maxDrift = Math.max(0, config.lineageColorDriftDegrees);
    if (maxDrift <= 0) {
        return parentHue;
    }
    const minDrift = clamp(config.lineageColorMinDriftDegrees, 0, maxDrift);
    const magnitude = minDrift + Math.random() * (maxDrift - minDrift);
    const drift = magnitude * (Math.random() < 0.5 ? -1 : 1);
    return modulo(parentHue + drift, 360);
}
export function colorForLineageCode(code, lineageHue) {
    const profile = programColorProfile(code);
    const complexity = Math.min(1, Math.log2(code.length + 1) / 7);
    const hue = modulo(lineageHue + profile.hueShift, 360);
    const saturation = Math.round(clamp(50 + complexity * 28 + profile.saturationShift, 42, 92));
    const lightness = Math.round(clamp(56 + profile.lightnessShift - complexity * 5, 46, 68));
    return `hsl(${roundTo(hue, 1)} ${saturation}% ${lightness}%)`;
}
export function colorForLifeFormCode(code, lineageHue, oldestAncestorId, config) {
    return colorForLineageCode(code, config.colorByOldestAncestor ? hueForOldestAncestorId(oldestAncestorId) : lineageHue);
}
export function hueForOldestAncestorId(oldestAncestorId) {
    const id = Math.max(1, Math.floor(Math.abs(oldestAncestorId)));
    const hash = Math.imul(id, 2654435761) >>> 0;
    const baseHue = ancestorHueBands[hash % ancestorHueBands.length];
    const jitter = ((hash >>> 8) % 13) - 6;
    return modulo(baseHue + jitter, 360);
}
function hashCode(code) {
    let hash = 2166136261;
    for (const instruction of code) {
        hash ^= instruction.op.length;
        hash = Math.imul(hash, 16777619);
        for (const arg of instruction.args) {
            hash ^= typeof arg.value === "number" ? arg.value : arg.value.charCodeAt(0);
            hash = Math.imul(hash, 16777619);
        }
    }
    return hash >>> 0;
}
function programColorProfile(code) {
    if (code.length === 0) {
        return { hueShift: 0, saturationShift: 0, lightnessShift: 0 };
    }
    let actionCount = 0;
    let attackCount = 0;
    let flowCount = 0;
    let senseCount = 0;
    let dataCount = 0;
    for (const instruction of code) {
        if (instruction.op === "MOVE" || instruction.op === "EAT" || instruction.op === "ATTACK" || instruction.op === "REPRODUCE") {
            actionCount += 1;
            if (instruction.op === "ATTACK") {
                attackCount += 1;
            }
        }
        else if (instruction.op.startsWith("J")) {
            flowCount += 1;
        }
        else if (instruction.op.startsWith("SENSE") || instruction.op.startsWith("LOOK") || instruction.op.startsWith("COUNT")) {
            senseCount += 1;
        }
        else {
            dataCount += 1;
        }
    }
    const length = code.length;
    const actionRatio = actionCount / length;
    const attackRatio = attackCount / length;
    const flowRatio = flowCount / length;
    const senseRatio = senseCount / length;
    const dataRatio = dataCount / length;
    return {
        hueShift: Math.round((senseRatio - attackRatio) * 7 + (flowRatio - dataRatio) * 4),
        saturationShift: actionRatio * 10 + attackRatio * 8 - dataRatio * 4,
        lightnessShift: senseRatio * 6 - attackRatio * 5 + flowRatio * 2
    };
}
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function roundTo(value, digits) {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
}
