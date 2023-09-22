import React, {ChangeEvent, useMemo, useState} from 'react';
import {Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import {useGetAllUserGoogleSpreadSheetQuery, useUploadSpreadSheetMutation} from "../../../api";
import {MButton} from "../../base";
import {EUploadSpreadSheetRequestType} from "../../../interface";
import {useCurrentUser} from "../../../hooks";
import {GoogleConnectButton} from "../../button";
import {EFontColor} from "../../../constant";

export const UploadSpreadsheetForm: React.FC<{
    projectId: string;
    onSuccessLogin?: () => void;
}> = ({
          onSuccessLogin,
          projectId,
      }) => {

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [googleSheetId, setGoogleSheetId] = useState<string | undefined>();
    const {currentUser, refetch} = useCurrentUser()

    const isUserConnectedToGoogle = currentUser?.googleUserId
    const [uploadSpreadSheet, {isSuccess, isError}] = useUploadSpreadSheetMutation();
    const {data: allUserGoogleSpreadsheets, isLoading: isAllUserGoogleSpreadsheetsLoading} = useGetAllUserGoogleSpreadSheetQuery(undefined);

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

    const onSuccessLoginHandler = async () => {
        if (onSuccessLogin) {
            await refetch();
            onSuccessLogin();
        }
    }

    const isShowGoogleConnectButton = useMemo(()=>{
        if(isAllUserGoogleSpreadsheetsLoading){
            return false
        }
        if (allUserGoogleSpreadsheets){
            return false
        }
        if (!isUserConnectedToGoogle) {
            return true
        }
    },[allUserGoogleSpreadsheets, isAllUserGoogleSpreadsheetsLoading])


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

                    <Typography sx={{
                        color: EFontColor.lightMarine4
                    }}>Upload local file</Typography>
                    <MButton.Submit
                        component="label"
                    >
                        <input type="file" accept=".xlsx, .numbers" onChange={handleFileChange} hidden/>
                        {uploadedFile
                            ? <Typography>selected: {uploadedFile.name}</Typography>
                            : <Typography>choose</Typography>}
                    </MButton.Submit>
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
                {isShowGoogleConnectButton && <GoogleConnectButton
                    onSuccess={onSuccessLoginHandler}
                />}
            </Box>
            <Box>
                <>
                    {(googleSheetId || uploadedFile) && <MButton.Submit type="submit">Submit</MButton.Submit>}
                    {isSuccess && <Typography sx={{
                        color: EFontColor.white
                    }}>Success</Typography>}
                    {isError && <Typography sx={{
                        color: EFontColor.red
                    }}>Error</Typography>}
                </>
            </Box>
        </Box>
    );
};
