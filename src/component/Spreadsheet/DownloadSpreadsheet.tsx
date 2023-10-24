import React, {useState} from 'react';
import {MButton} from "../base";
import {getCSV, getExcelSpreadsheet} from "../../service";
import {downloadFile} from "../../utils/downloadFile";
import {ISpreadsheetView} from "../../interface/busines/spreadsheet/spreadsheetView";
import {Box, FormControlLabel, Radio as MuiRadio, RadioGroup, styled, Typography} from "@mui/material";
import {EFontColor, FileType} from "../../constant";

const Label = styled(Typography)(() => ({
    fontWeight: 600,
    fontSize: 12,
    color: EFontColor.white,
}));

const Radio = styled(MuiRadio)(() => ({
    padding: '2px'
}));

export const DownloadSpreadsheet: React.FC<{
    spreadsheet: ISpreadsheetView
}> = ({spreadsheet}) => {
    const [fileType, setFileType] = useState<FileType.csv | FileType.xlsx>(FileType.xlsx);

    const handleFileTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileType((event.target as HTMLInputElement).value as FileType.xlsx | FileType.csv);
    };

    const downloadSpreadsheet = () => {
        if (spreadsheet) {
            switch (fileType) {
                case FileType.xlsx: {
                    const excelBlob = getExcelSpreadsheet(spreadsheet)
                    downloadFile({
                        filename: `${spreadsheet.name}.xlsx`,
                        blob: excelBlob,
                    })
                }
                    break;
                case FileType.csv: {
                    const csvBlob = getCSV(spreadsheet)

                    downloadFile({
                        filename: `${spreadsheet.name}.csv`,
                        blob: csvBlob,
                    })
                }
                    break;
            }


        }
    }
    return (
        <Box sx={{
            display: 'flex',
        }}>

            <MButton.Submit
                onClick={downloadSpreadsheet}
            >
                Download
            </MButton.Submit>
            <RadioGroup
                aria-label="file type"
                name="fileType"
                value={fileType}
                onChange={handleFileTypeChange}
                sx={{
                    paddingLeft: '10px',
                }}
            >
                <FormControlLabel value="csv" control={<Radio/>} label={<Label>csv</Label>}/>
                <FormControlLabel value="xlsx" control={<Radio/>} label={<Label>xlsx</Label>}/>
            </RadioGroup>
        </Box>

    );
};
