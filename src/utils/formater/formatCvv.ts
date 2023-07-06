export const formatCVV = (input: string, maxLength = 4): string => {
    let formattedCVV = input.replace(/\D/g, '');

    formattedCVV = formattedCVV.slice(0, maxLength); // Limit the length to maxLength

    return formattedCVV;
};
