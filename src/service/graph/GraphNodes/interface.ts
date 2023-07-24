export interface IGraphNodeResetState {
    resetState: () => void;
}

export const isGraphNodeResetState = (obj: any): obj is IGraphNodeResetState => {
    return obj.resetState !== undefined;
}
