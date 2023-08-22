export const findIndex2D = <T>(array2D: T[][], targetValue: T): [number, number] => {
    for (let i = 0; i < array2D.length; i++) {
        const row = array2D[i];
        const columnIndex = row.indexOf(targetValue);
        if (columnIndex !== -1) {
            return [i, columnIndex];
        }
    }
    return [-1, -1]; // Not found
};
