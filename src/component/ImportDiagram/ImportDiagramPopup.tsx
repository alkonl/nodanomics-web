import React, {useState} from 'react';
import {EColor, EFontColor} from "../../constant";
import {Box, Typography} from "@mui/material";
import {Dialog} from "@headlessui/react";
import {BasePopUp} from "../popUp";
import {MButton} from "../base";
import {IImportAndExport} from "../../interface";
import {ParameterCheckbox} from "../base/Input/ParameterCheckbox";

export const ImportDiagramPopup: React.FC<{
    isShow: boolean;
    onClose: () => void;
    approve: (params: {
        spreadsheetsToOverwrite: string[]
    }) => Promise<void>;
    importDiagramState: {
        parsedDiagram?: IImportAndExport,
        sameSpreadsheetNames: {
            spreadsheetId: string
            name: string
        }[],
    },
}> = ({isShow, onClose, importDiagramState, approve}) => {
    const [spreadsheetsToOverwrite, setSpreadsheetsToOverwrite] = useState<string[]>([])

    const onCheckHandler = (spreadsheetId: string, checked: boolean) => {
        console.log('spreadsheetId: ', spreadsheetId)
        const newSpreadsheetsToOverwrite = checked ? [...spreadsheetsToOverwrite, spreadsheetId] : spreadsheetsToOverwrite.filter((id) => id !== spreadsheetId)
        setSpreadsheetsToOverwrite(newSpreadsheetsToOverwrite)
    }

    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <Box sx={{
                        padding: 3,
                        backgroundColor: EColor.darkMarine3,
                    }}>

                        <Typography sx={{
                            color: EFontColor.grey,
                            maxWidth: 400,
                            mb: 1,
                        }}>
                            This project already has spreadsheets with the same id as the following spreadsheets in your
                            imported diagram

                        </Typography>
                        <Typography sx={{
                            color: EFontColor.grey,
                            mb: 1,
                        }}>
                            Spreadsheets to overwrite
                        </Typography>
                        <Box sx={{
                            mb: 2,
                        }}>
                            <Box>
                                {importDiagramState.sameSpreadsheetNames.map((spreadsheet) => {
                                    const isChecked = spreadsheetsToOverwrite.includes(spreadsheet.spreadsheetId)
                                    return (
                                        <Box sx={{
                                            display: 'flex',
                                            gap: 2,
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }} key={spreadsheet.spreadsheetId}>
                                            <Typography sx={{
                                                color: EFontColor.purple,
                                                fontWeight: 600,
                                            }}>
                                                {spreadsheet.name}
                                            </Typography>
                                            <ParameterCheckbox
                                                checked={isChecked}
                                                onChange={(_, checked) => {
                                                    onCheckHandler(spreadsheet.spreadsheetId, checked)
                                                }}
                                            />
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Box>
                        <MButton.Submit onClick={async () => {
                            await approve({
                                spreadsheetsToOverwrite: spreadsheetsToOverwrite
                            })
                        }}>
                            Submit
                        </MButton.Submit>
                    </Box>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};

