export interface IGetNodeExternalValue {
    nodeExternalValue?: number
}

export const isIGetNodeExternalValue = (obj: unknown): obj is IGetNodeExternalValue => {
    if(typeof obj !== 'object' || obj === null) return false
    return 'nodeExternalValue' in obj && (typeof obj.nodeExternalValue === 'number' || typeof obj.nodeExternalValue === 'boolean')
}
