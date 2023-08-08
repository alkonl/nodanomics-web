import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {UploadSpreadSheetPopUp} from "../../../../../popUp";
import {useToggle} from "../../../../../../hooks";
import {useDiagramEditorState} from "../../../../../../redux";
import {useGetProjectInfoQuery} from "../../../../../../api";

export const LibrariesSideMenu: React.FC = () => {
    const uploadSpreadSheetPopUpManager = useToggle();
    const {currentDiagramId} = useDiagramEditorState()
    const {data: resProjectInfo} = useGetProjectInfoQuery({
        diagramId: currentDiagramId,
    }, {
        skip: !currentDiagramId,
    })
    return (
        <>
            {resProjectInfo && <UploadSpreadSheetPopUp
                projectId={resProjectInfo.id}
                onClose={uploadSpreadSheetPopUpManager.close}
                isShow={uploadSpreadSheetPopUpManager.isOpened}
            />}

            <Box sx={{
                padding: 0.5,
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                }}>
                    <Typography>
                        Spreadsheets
                    </Typography>
                    <Button
                        variant="contained"
                        component="label"
                        onClick={uploadSpreadSheetPopUpManager.open}
                    >
                        Upload File
                    </Button>
                </Box>
            </Box>
        </>
    );
};
