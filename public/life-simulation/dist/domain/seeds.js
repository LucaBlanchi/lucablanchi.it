import { defaultConfig } from "./config.js";
import { energyProfileForCodeLength } from "./life-form.js";
import { directionCount, inst, num, reg } from "./instructions.js";
export function reproductionThresholdForCodeLength(blockCount) {
    const profile = energyProfileForCodeLength(blockCount, defaultConfig);
    return Math.floor(profile.maxEnergy * 0.8);
}
function patchThreshold(code, instructionIndex) {
    code[instructionIndex].args[1] = num(reproductionThresholdForCodeLength(code.length));
    return code;
}
export function seedMicroDrifterCode() {
    return patchThreshold([
        inst("RAND", reg("A"), num(directionCount)),
        inst("MOVE", reg("A")),
        inst("SENSE_ENERGY", reg("B")),
        inst("JLT", reg("B"), num(0), num(5)),
        inst("REPRODUCE"),
        inst("JMP", num(0))
    ], 3);
}
export function seedNearbyForagerCode() {
    return patchThreshold([
        inst("RAND", reg("A"), num(directionCount)),
        inst("SENSE_FOOD", reg("B"), reg("A")),
        inst("JNZ", reg("B"), num(8)),
        inst("MOVE", reg("A")),
        inst("SENSE_ENERGY", reg("C")),
        inst("JLT", reg("C"), num(0), num(7)),
        inst("REPRODUCE"),
        inst("JMP", num(0)),
        inst("EAT", reg("A")),
        inst("JMP", num(0))
    ], 5);
}
export function seedRayForagerCode() {
    return patchThreshold([
        inst("SENSE_ENERGY", reg("C")),
        inst("JLT", reg("C"), num(0), num(3)),
        inst("REPRODUCE"),
        inst("RAND", reg("A"), num(directionCount)),
        inst("SENSE_FOOD", reg("B"), reg("A")),
        inst("JNZ", reg("B"), num(10)),
        inst("LOOK_FOOD", reg("B"), reg("A")),
        inst("JNZ", reg("B"), num(12)),
        inst("MOVE", reg("A")),
        inst("JMP", num(0)),
        inst("EAT", reg("A")),
        inst("JMP", num(0)),
        inst("MOVE", reg("A")),
        inst("JMP", num(0))
    ], 1);
}
export function seedPatientSentryCode() {
    return patchThreshold([
        inst("SENSE_ENERGY", reg("C")),
        inst("JLT", reg("C"), num(0), num(3)),
        inst("REPRODUCE"),
        inst("RAND", reg("A"), num(directionCount)),
        inst("SENSE_LIFE", reg("B"), reg("A")),
        inst("JNZ", reg("B"), num(10)),
        inst("SENSE_FOOD", reg("B"), reg("A")),
        inst("JNZ", reg("B"), num(12)),
        inst("SLEEP"),
        inst("JMP", num(0)),
        inst("ATTACK", reg("A")),
        inst("JMP", num(0)),
        inst("EAT", reg("A")),
        inst("JMP", num(0))
    ], 1);
}
export function seedLifeHunterCode() {
    return patchThreshold([
        inst("SENSE_ENERGY", reg("C")),
        inst("JLT", reg("C"), num(0), num(3)),
        inst("REPRODUCE"),
        inst("RAND", reg("A"), num(directionCount)),
        inst("SENSE_LIFE", reg("B"), reg("A")),
        inst("JNZ", reg("B"), num(14)),
        inst("LOOK_LIFE", reg("B"), reg("A")),
        inst("JNZ", reg("B"), num(16)),
        inst("SENSE_FOOD", reg("B"), reg("A")),
        inst("JNZ", reg("B"), num(18)),
        inst("LOOK_FOOD", reg("B"), reg("A")),
        inst("JNZ", reg("B"), num(20)),
        inst("MOVE", reg("A")),
        inst("JMP", num(0)),
        inst("ATTACK", reg("A")),
        inst("JMP", num(0)),
        inst("MOVE", reg("A")),
        inst("JMP", num(0)),
        inst("EAT", reg("A")),
        inst("JMP", num(0)),
        inst("MOVE", reg("A")),
        inst("JMP", num(0))
    ], 1);
}
export const savedSeedLifeForms = [
    {
        name: "micro-drifter",
        createCode: seedMicroDrifterCode
    },
    {
        name: "nearby-forager",
        createCode: seedNearbyForagerCode
    },
    {
        name: "ray-forager",
        createCode: seedRayForagerCode
    },
    {
        name: "patient-sentry",
        createCode: seedPatientSentryCode
    },
    {
        name: "life-hunter",
        createCode: seedLifeHunterCode
    }
];
export const startingSeedLifeForm = savedSeedLifeForms[0];
