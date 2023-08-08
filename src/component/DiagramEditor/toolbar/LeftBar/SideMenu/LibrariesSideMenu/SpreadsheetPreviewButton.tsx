import React from 'react';
import {Button, Typography} from "@mui/material";
import {EColor} from "../../../../../../constant";
import {ISpreadsheetInfo} from "../../../../../../interface/busines/spreadsheet/spreadsheet";

export const SpreadsheetPreviewButton: React.FC<{
    spreadsheet: ISpreadsheetInfo;
}> = ({spreadsheet}) => {
    return (
        <Button
            key={spreadsheet.id}
            sx={{
                width: '100%',
                borderBottomColor: EColor.grey4,
                borderBottomWidth: 2,
                borderBottomStyle: 'solid',
                paddingBottom: 0.5,
            }}>
            <Typography>
                {spreadsheet.name}
            </Typography>
        </Button>
    );
};
