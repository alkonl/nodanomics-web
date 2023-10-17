import React, {useEffect, useMemo} from "react";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useGetSpreadSheetQuery, useUseDeleteSpreadsheetMutation} from "../../api";
import {MButton} from "../base";
import {EColor, EFontColor} from "../../constant";
import {useDiagramEditorState} from "../../redux";

export const SpreadsheetViewer: React.FC<{
    spreadsheetId: string;
    onDelete?: () => void;
}> = ({spreadsheetId, onDelete}) => {
    const {data} = useGetSpreadSheetQuery({
        spreadsheetId,
    })

    const {spreadsheets} = useDiagramEditorState()

    const formattedTable = useMemo(() => {
        if (!data) return undefined

        // replace empty cells with
        const formattedRows = []
        for (let i = 0; i < data.rows.length; i++) {
            const values: {
                content: string | number,
                colspan?: number,
            }[] = []
            let skipValues: {
                from: number
                to: number
            } | undefined = undefined
            for (let j = 0; j < data.rows[i].values.length; j++) {
                const defaultCell = data.rows[i].values[j]

                if (skipValues && j >= skipValues.from && j <= skipValues.to) {
                    continue
                }
                const colspan = defaultCell.merge ? (defaultCell.merge.e.c - defaultCell.merge.s.c + 1) : undefined
                if (colspan && colspan > 1) {
                    skipValues = {
                        from: j,
                        to: j + colspan - 1,
                    }
                }
                const datasetData = spreadsheets?.[spreadsheetId]
                let cellContent: string | number = defaultCell.content
                if (datasetData) {
                    try {
                        const editorCellContent = datasetData.rows[i - datasetData.yAxisIndex - 1][j - datasetData.xAxisIndex - 1]
                        if (editorCellContent) {
                            cellContent = editorCellContent
                        }
                    } catch (e) {
                        console.error(`error during getting cell content from dataset ${spreadsheetId}`, e)
                    }

                }


                values.push({
                    content: cellContent,
                    colspan,
                })
            }
            formattedRows.push({
                ...data.rows[i],
                values,
            })
        }
        return {
            name: data.name,
            rows: formattedRows,
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
            backgroundColor: EColor.darkMarineLight,
        }}>
            {formattedTable && <Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography sx={{
                        fontWeight: 'bold',
                        color: EFontColor.lightMarine4,
                    }}>
                        {formattedTable.name}
                    </Typography>
                    <MButton.Submit
                        onClick={handleDeleteSpreadsheet}
                    >
                        Delete
                    </MButton.Submit>
                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{
                        minWidth: 650,
                        backgroundColor: EColor.darkMarineLight,
                        color: EFontColor.white,
                    }} aria-label="simple table">
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
