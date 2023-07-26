export interface IUpdateGraphNodeState {
    updateState(): void
}

export const isUpdateGraphNodeState = (obj: any): obj is IUpdateGraphNodeState => {
    return 'updateState' in obj && typeof obj.updateState === 'function'
}
