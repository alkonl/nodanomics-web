import React, {useEffect, useMemo} from "react";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useGetSpreadSheetQuery, useUseDeleteSpreadsheetMutation} from "../../api";
import {MButton} from "../base";

export const SpreadsheetViewer: React.FC<{
    spreadsheetId: string;
    onDelete?: () => void;
}> = ({spreadsheetId, onDelete}) => {
    const {data} = useGetSpreadSheetQuery({
        spreadsheetId,
    })

    const formattedTable = useMemo(() => {
        if (!data) return undefined

        // replace empty cells with
        const fomattedRows = []
        for (let i = 0; i < data.rows.length; i++) {
            const values = []
            let skipValues: {
                from: number
                to: number
            } | undefined = undefined
            for (let j = 0; j < data.rows[i].values.length; j++) {
                const cell = data.rows[i].values[j]
                if (skipValues && j >= skipValues.from && j <= skipValues.to) {
                    continue
                }
                const colspan = cell.merge ? (cell.merge.e.c - cell.merge.s.c + 1) : undefined
                if (colspan && colspan > 1) {
                    skipValues = {
                        from: j,
                        to: j + colspan - 1,
                    }
                }
                values.push({
                    content: cell.content,
                    colspan,
                })
            }
            fomattedRows.push({
                ...data.rows[i],
                values,
            })
        }
        return {
            name: data.name,
            rows: fomattedRows,
        }
    }, [data])


    const [reqDeleteSpreadsheet, {isSuccess: isSpreadsheetDeleted}] = useUseDeleteSpreadsheetMutation()

    useEffect(() => {
        if (isSpreadsheetDeleted && onDelete) {
            onDelete()
        }
    }, [isSpreadsheetDeleted]);

    const handleDeleteSpreadsheet = () => {
        reqDeleteSpreadsheet(spreadsheetId)
    }

    return (
        <Box sx={{
            padding: 1,
            maxHeight: '80vh',
            maxWidth: '100vw',
            overflow: 'auto',
            backgroundColor: 'white',
        }}>
            {formattedTable && <Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography>
                        {formattedTable.name}
                    </Typography>
                    <MButton.Submit
                        onClick={handleDeleteSpreadsheet}
                    >
                        Delete
                    </MButton.Submit>
                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableBody>
                            {formattedTable.rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    {row.values.map((cell) => (
                                        <TableCell
                                            colSpan={cell.colspan}
                                            key={cell.content}
                                            sx={{border: 1}}
                                            align="left"
                                        >{cell.content}</TableCell>
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
