import React, {useState} from 'react';
import {MButton} from "../base";
import {getCSV, getExcelSpreadsheet} from "../../service";
import {downloadFile} from "../../utils/downloadFile";
import {ISpreadsheetView} from "../../interface/busines/spreadsheet/spreadsheetView";
import {Box, FormControlLabel, Radio as MuiRadio, RadioGroup, Typography, styled} from "@mui/material";
import {EFontColor} from "../../constant";

const Label = styled(Typography)(() => ({
    fontWeight: 600,
    fontSize: 12,
    color: EFontColor.white,
}));

const Radio =styled(MuiRadio)(() => ({
    padding: '2px'
}));

export const DownloadSpreadsheet: React.FC<{
    spreadsheet: ISpreadsheetView
}> = ({spreadsheet}) => {
    const [fileType, setFileType] = useState<'csv' | 'xlsx'>('csv');

    const handleFileTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileType((event.target as HTMLInputElement).value as 'csv' | 'xlsx');
    };

    const downloadSpreadsheet = () => {
        if (spreadsheet) {
            const excelBlob = getExcelSpreadsheet(spreadsheet)
            const csvBlob = getCSV(spreadsheet)
            downloadFile({
                filename: `${spreadsheet.name}.xlsx`,
                blob: excelBlob,
            })
            downloadFile({
                filename: `${spreadsheet.name}.csv`,
                blob: csvBlob,
            })

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
