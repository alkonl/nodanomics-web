const checkKeyMatch = (requiredKeys: number[] | number, pressedKeys: number[] | number): boolean => {
    if (Array.isArray(requiredKeys) && Array.isArray(pressedKeys)) {
        return requiredKeys.every((requiredKey) => pressedKeys.includes(requiredKey))
    } else if (typeof requiredKeys === 'number' && typeof pressedKeys === 'number') {
        return requiredKeys === pressedKeys
    }
    console.error(`checkKeys: requiredKeys and pressedKeys must be the same type ${requiredKeys} ${pressedKeys}`)
    return false
}

export const isKeyCombinationMatch = <T>(
    func: () => T, requiredKeys: number | number[] | number[][], pressedKeys: number[] | number
): T | undefined => {
    if (Array.isArray(requiredKeys) && Array.isArray(pressedKeys) && typeof requiredKeys[0] === 'number') {
        const isMeet = checkKeyMatch(requiredKeys as number[], pressedKeys)
        if (isMeet) {
            return func()
        }
    } else if (Array.isArray(requiredKeys) && Array.isArray(pressedKeys) && Array.isArray(requiredKeys[0])) {
        const isMeet = requiredKeys.some((requiredKey) => checkKeyMatch(requiredKey, pressedKeys))
        if (isMeet) {
            return func()
        }
    } else if (checkKeyMatch(requiredKeys as number, pressedKeys)) {
        return func()
    }
}
