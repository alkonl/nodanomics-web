export interface IIsEventTriggered {
    isEventTriggered?: boolean
}

export const isIIsEventTriggered = (obj: any): obj is IIsEventTriggered => {
    return 'isEventTriggered' in obj && typeof obj.isEventTriggered === 'boolean'
}
