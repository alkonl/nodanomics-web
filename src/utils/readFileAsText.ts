export const readFileAsText = (file: File): Promise<string> => new Promise((resolve, reject) => {
    if (!file) {
        reject(new Error('No file provided'));
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        resolve(event.target?.result as string); // Contains the file content as text
    };

    reader.onerror = () => {
        reject(new Error('Error reading the file'));
    };

    reader.readAsText(file);
});
