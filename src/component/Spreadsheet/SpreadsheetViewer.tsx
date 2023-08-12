import React, {useMemo} from "react";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useGetSpreadSheetQuery} from "../../api";

export const SpreadsheetViewer: React.FC<{
    spreadsheetId: string;
}> = ({spreadsheetId}) => {
    const {data} = useGetSpreadSheetQuery({
        spreadsheetId,
    })

    const formattedTable = useMemo(()=>{
        if(!data) return undefined
        const maxLength =  data.rows.reduce((acc, row) => {
            const rowLength = row.values.length
            return rowLength > acc ? rowLength : acc
        }, 0)
        // every row should have the same length
        // and we must take into account merged cells, which can take up more space than a single cell
        const rows = data.rows.map((row) => {
            const rowLength = row.values.length
            if (rowLength === maxLength) {
                return row
            } else {
                const diff = maxLength - rowLength
                const emptyCells = Array.from({length: diff}, () => ({content: ''}))
                return {
                    ...row,
                    values: [...row.values, ...emptyCells],
                }
            }
        })
        return {
            name: data.name,
            rows,
        }
    },[data])
    return (
        <Box sx={{
            padding: 1,
            maxHeight: '80vh',
            maxWidth: '100vw',
            overflow: 'auto',
            backgroundColor: 'white',
        }}>
            {formattedTable && <Box>
                <Typography>
                    {formattedTable.name}
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableBody>
                            {formattedTable.rows.map((row) => (
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
