export const convertToCamelCase = (text: string): string => {
    // 1. Remove all non-alphanumeric characters except spaces
    const cleaned = text.replace(/[^a-zA-Z0-9 ]+/g, '');

    // 2. Convert the first letter of each word to uppercase
    let camelCase = cleaned.replace(/\b[a-z]/g, (match) => match.toUpperCase());


    // 3. Convert the entire string to lowercase for the very first word
    const firstLetterIndex = camelCase.search(/[a-zA-Z]/);
    camelCase = camelCase.charAt(firstLetterIndex).toLowerCase() + camelCase.slice(firstLetterIndex + 1);

    // 4. Remove spaces
    camelCase = camelCase.replace(/ /g, '');

    return camelCase;
};
