import { useState } from 'react';

export const useDownloadJsonFile = () => {

    const downloadJsonFile = (jsonContent: any, fileName: string) => {
        // Create a Blob object from the JSON content
        const jsonBlob = new Blob([JSON.stringify(jsonContent)], { type: 'application/json' });

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(jsonBlob);

        // Create a download link element
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'data.json';

        // Trigger a click event to start the download
        document.body.appendChild(a);
        a.click();

        // Clean up by revoking the Blob URL and removing the link element
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return { downloadJsonFile };
};
