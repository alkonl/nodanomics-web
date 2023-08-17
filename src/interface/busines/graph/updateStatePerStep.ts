export interface IUpdateGraphNodeStatePerStep {
    updateStatePerStep(): void
}

export const isIUpdateGraphNodeStatePerStep = (obj: any): obj is IUpdateGraphNodeStatePerStep => {
    return 'updateStatePerStep' in obj && typeof obj.updateStatePerStep === 'function'
}
