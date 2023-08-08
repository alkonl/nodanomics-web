import React, {ChangeEvent, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {useUploadSpreadSheetMutation} from "../../../api";

export const UploadSpreadsheetForm: React.FC<{
    projectId: string;
}> = ({
            projectId,
                                          }) => {

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadSpreadSheet, {isSuccess, isError}] = useUploadSpreadSheetMutation();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const onSubmit = () => {
        if (uploadedFile) {
            uploadSpreadSheet({
                file: uploadedFile,
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
                gap: 1,
                justifyContent: 'center',
            }}
        >
            <Typography>Upload XLSX File</Typography>
            <Button
                variant="contained"
                component="label"
            >
                <input type="file" accept=".xlsx, .numbers" onChange={handleFileChange} hidden/>
                {uploadedFile
                    ? <Typography>selected: {uploadedFile.name}</Typography>
                    : <Typography>choose</Typography>}
            </Button>
            {uploadedFile && <Button type="submit">Submit</Button>}
            {isSuccess && <Typography>Success</Typography>}
            {isError && <Typography>Error</Typography>}
        </Box>
    );
};
