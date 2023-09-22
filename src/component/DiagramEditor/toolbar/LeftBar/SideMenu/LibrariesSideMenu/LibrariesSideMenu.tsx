import React from 'react';
import {Box, Typography} from "@mui/material";
import {UploadSpreadSheetPopUp} from "../../../../../popUp";
import {useToggle} from "../../../../../../hooks";
import {useDiagramEditorState} from "../../../../../../redux";
import {useGetProjectInfoQuery, useGetSpreadSheetsBaseInfoQuery} from "../../../../../../api";
import {SpreadsheetPreviewButton} from "./SpreadsheetPreviewButton";
import {EColor, EFontColor} from "../../../../../../constant";
import {MButton} from "../../../../../base";

export const LibrariesSideMenu: React.FC = () => {
    const uploadSpreadSheetPopUpManager = useToggle();
    const {currentDiagramId} = useDiagramEditorState()
    const {data: resProjectInfo} = useGetProjectInfoQuery({
        diagramId: currentDiagramId,
    }, {
        skip: !currentDiagramId,
    })

    const {data: spreadsheets} = useGetSpreadSheetsBaseInfoQuery({
        projectId: resProjectInfo?.id,
    }, {
        skip: !resProjectInfo?.id,
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
                backgroundColor: EColor.darkMarineLight,
            }}>
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                }}>
                    <Typography sx={{
                        fontWeight: 'bold',
                        color: EFontColor.lightMarine4,
                    }}>
                        Spreadsheets
                    </Typography>
                    <MButton.Submit
                        onClick={uploadSpreadSheetPopUpManager.open}
                    >
                        Upload File
                    </MButton.Submit>
                </Box>
                <Box>
                    {spreadsheets?.data.map((spreadsheet) => (
                        <SpreadsheetPreviewButton
                            spreadsheet={spreadsheet}
                            key={spreadsheet.id}
                        />
                    ))}
                </Box>
            </Box>
        </>
    );
};
