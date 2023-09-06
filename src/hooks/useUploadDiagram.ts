import {ChangeEvent} from "react";

export const useUploadDiagram = () => {
    return (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('file', file);
        }
    };
}
