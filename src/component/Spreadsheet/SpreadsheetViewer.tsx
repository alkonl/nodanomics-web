import React from "react";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useGetSpreadSheetQuery} from "../../api";

export const SpreadsheetViewer: React.FC<{
    spreadsheetId: string;
}> = ({spreadsheetId}) => {
    const {data} = useGetSpreadSheetQuery({
        spreadsheetId,
    })
    return (
        <Box sx={{
            padding: 1,
            maxHeight: '80vh',
            overflow: 'auto',
            backgroundColor: 'white',
        }}>
            {data && <Box>
                <Typography>
                    {data.name}
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableBody>
                            {data.rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    {row.values.map((cell) => (
                                        <TableCell key={cell.content} sx={{border: 1}} align="left">{cell.content}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>}
        </Box>
    )
}
