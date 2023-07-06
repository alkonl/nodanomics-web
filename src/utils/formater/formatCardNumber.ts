export const formatCardNumber = (input: string): string => {
    let formattedNumber = input.replace(/\D/g, '');
    const chunkSize = 4;
    const regex = new RegExp(`.{1,${chunkSize}}`, 'g');

    formattedNumber = formattedNumber.slice(0, 16); // Limit the length to 16 digits

    formattedNumber = formattedNumber.replace(regex, (chunk) => {
        return `${chunk} `;
    });

    return formattedNumber.trim();
};
