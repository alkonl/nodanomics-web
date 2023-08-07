export const isObject = (obj: unknown): obj is object => {
    return typeof obj === 'object' && obj !== null
}
