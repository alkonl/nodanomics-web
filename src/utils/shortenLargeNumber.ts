export const shortenLargeNumber = (num: number, decimalPlaces = 2): string => {
    if (num.toString().includes('e')) return num.toFixed(decimalPlaces);
    if (Math.abs(num) < 1_000) return num.toFixed(decimalPlaces);

    const units = ['K', 'M', 'B', 'T', 'Qt', 'Qd', 'Sd', 'St', 'O', 'N', 'v', 'c'];
    const digitGroups = Math.floor((Math.abs(num).toString().length - 1) / 3);

    const roundedNum = (num / Math.pow(1_000, digitGroups)).toFixed(decimalPlaces);

    return `${roundedNum}${units[digitGroups - 1]}`;
};
