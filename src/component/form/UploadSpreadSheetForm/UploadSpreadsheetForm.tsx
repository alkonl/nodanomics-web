import React, {ChangeEvent, useState} from 'react';
import {Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import {useGetAllUserGoogleSpreadSheetQuery, useUploadSpreadSheetMutation} from "../../../api";
import {MButton} from "../../base";
import {EUploadSpreadSheetRequestType} from "../../../interface";

export const UploadSpreadsheetForm: React.FC<{
    projectId: string;
}> = ({
          projectId,
      }) => {

    const [uploadedFile, setUploadedFile] = useState<File | undefined>();
    const [googleSheetId, setGoogleSheetId] = useState<string | undefined>();
    const [uploadSpreadSheet, {isSuccess, isError}] = useUploadSpreadSheetMutation();
    const {data: allUserGoogleSpreadsheets} = useGetAllUserGoogleSpreadSheetQuery(undefined);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleGoogleSpreadsheetChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGoogleSheetId(event.target.value);
    }

    const onSubmit = () => {
        console.log('onSubmit: ', uploadedFile, googleSheetId);
        if (uploadedFile) {
            uploadSpreadSheet({
                type: EUploadSpreadSheetRequestType.File,
                file: uploadedFile,
                projectId: projectId,
            });
        } else if (googleSheetId) {
            uploadSpreadSheet({
                type: EUploadSpreadSheetRequestType.GoogleSpreadsheetId,
                googleSpreadsheetId: googleSheetId,
                projectId: projectId,
            });
        }
    }

    return (
        <Box
            component="form"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
            <Box sx={{
                display: 'flex',
                gap: 2,
                maxHeight: '60vh',
            }}>
                <Box


                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        justifyContent: 'center',
                    }}
                >

                    <Typography>Upload local file</Typography>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        <input type="file" accept=".xlsx, .numbers" onChange={handleFileChange} hidden/>
                        {uploadedFile
                            ? <Typography>selected: {uploadedFile.name}</Typography>
                            : <Typography>choose</Typography>}
                    </Button>
                </Box>
                {allUserGoogleSpreadsheets && <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Typography>Choose Google Spreadsheet</Typography>
                    <FormControl sx={{
                        flex: 1,
                        overflow: 'auto',
                    }}>
                        <RadioGroup
                            onChange={handleGoogleSpreadsheetChange}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            {allUserGoogleSpreadsheets.map((spreadsheet) => (
                                <FormControlLabel
                                    value={spreadsheet.id}
                                    control={<Radio/>}
                                    label={spreadsheet.name}
                                    key={spreadsheet.id}
                                />
                            ))}

                        </RadioGroup>
                    </FormControl>
                </Box>}
            </Box>
            <Box>
                <>
                    {uploadedFile || googleSheetId && <MButton.Submit type="submit">Submit</MButton.Submit>}
                    {isSuccess && <Typography>Success</Typography>}
                    {isError && <Typography>Error</Typography>}
                </>
            </Box>
        </Box>
    );
};
