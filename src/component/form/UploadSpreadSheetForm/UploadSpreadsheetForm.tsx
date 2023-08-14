import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import {
    useGetAllUserGoogleSpreadSheetQuery,
    useSingInUpGoogleMutation,
    useUploadSpreadSheetMutation
} from "../../../api";
import {MButton} from "../../base";
import {EUploadSpreadSheetRequestType} from "../../../interface";
import {useCurrentUser} from "../../../hooks";
import {GoogleConnectButton} from "../../button";

export const UploadSpreadsheetForm: React.FC<{
    projectId: string;
    onSuccessLogin?: () => void;
}> = ({
          onSuccessLogin,
          projectId,
      }) => {

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [googleSheetId, setGoogleSheetId] = useState<string | undefined>();
    const {currentUser} = useCurrentUser()
    console.log('currentUser: ', currentUser)
    const isUserConnectedToGoogle = currentUser?.googleUserId
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

    const [signInUp, {data}] = useSingInUpGoogleMutation();
    const handleGoogleLogin = () => {
        // Redirect user to Google OAuth consent screen
        window.location.href = "localhost:8080/api/google/login"
    };

    useEffect(() => {
        if (data?.authUrl) {
            window.location.assign(data.authUrl);
        }
    }, [data])

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
                {!isUserConnectedToGoogle && <GoogleConnectButton
                    onSuccess={onSuccessLogin}
                />}
            </Box>
            <Box>
                <>
                    {(uploadedFile || googleSheetId) && <MButton.Submit type="submit">Submit</MButton.Submit>}
                    {isSuccess && <Typography>Success</Typography>}
                    {isError && <Typography>Error</Typography>}
                </>
            </Box>
        </Box>
    );
};
