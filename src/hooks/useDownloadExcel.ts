import {useCallback} from "react";


export function useDownloadExcel() {
    return useCallback(({excelBlob, fileName}: { excelBlob: Blob, fileName: string }) => {
        const url = URL.createObjectURL(excelBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${fileName}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, []);
}
