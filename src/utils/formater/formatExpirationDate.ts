export const formatExpirationDate = (value: string) => {
    let formattedDate = value.replace(/\D/g, '');
    const month = formattedDate.substr(0, 2);
    const year = formattedDate.substr(2, 2);

    if (formattedDate.length > 2) {
        formattedDate = `${month}/${year}`;
    } else if (month.length > 0) {
        formattedDate = `${month}`;
    }

    return formattedDate;
};
