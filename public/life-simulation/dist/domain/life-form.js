export function energyProfileForCodeLength(codeLength, config) {
    const linearCost = codeLength * config.reproductionEnergyPerBlock;
    const quadraticCost = codeLength * codeLength * config.reproductionEnergyQuadraticFactor;
    const reproductionCost = Math.max(1, linearCost + quadraticCost);
    const offspringEnergy = Math.max(0.5, codeLength * config.offspringEnergyPerBlock);
    const reproductionRequirement = reproductionCost + offspringEnergy + config.reproductionReserveEnergy;
    return {
        reproductionCost,
        offspringEnergy,
        reproductionRequirement,
        maxEnergy: reproductionRequirement * config.maxEnergyReproductionMultiplier
    };
}
export function turnBudgetForCodeLength(codeLength, config) {
    if (config.turnBudgetMode === "fixed") {
        return Math.max(config.minTurnBudget, Math.round(config.turnBudget));
    }
    const scaledBudget = config.turnBudgetBase + codeLength * config.turnBudgetPerBlock + codeLength * codeLength * config.turnBudgetQuadraticFactor;
    return Math.max(config.minTurnBudget, Math.round(scaledBudget));
}
