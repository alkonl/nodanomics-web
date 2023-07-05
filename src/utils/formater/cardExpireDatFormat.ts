const handleExpiryDateChange = (event) => {
    const { value } = event.target;

    // Remove any non-digit characters
    const sanitizedValue = value.replace(/\D/g, '');

    // Format the date as MM/YY
    let formattedValue = sanitizedValue;
    if (sanitizedValue.length > 2) {
        const month = sanitizedValue.substring(0, 2);
        const year = sanitizedValue.substring(2, 4);
        formattedValue = `${month}/${year}`;
    }

    setExpiryDate(formattedValue);
};
