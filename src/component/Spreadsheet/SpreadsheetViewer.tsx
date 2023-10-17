import React, {useEffect, useMemo} from "react";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography} from "@mui/material";
import {useGetSpreadSheetQuery, useUpdateSpreadsheetMutation, useUseDeleteSpreadsheetMutation} from "../../api";
import {MButton} from "../base";
import {EColor, EFontColor} from "../../constant";
import {useDiagramEditorState} from "../../redux";
import {IStructuredSpreadsheetData} from "../../interface";
import lodash from "lodash";
import {isISpreadsheetExistedValueView, ISpreadsheetView} from "../../interface/busines/spreadsheet/spreadsheetView";

const getValueFromDataset = ({dataset, x, y}: {
    dataset: IStructuredSpreadsheetData,
    x: number,
    y: number,
}) => {
    return dataset.rows[x - dataset.yAxisIndex - 1][y - dataset.xAxisIndex - 1]
}

export const SpreadsheetViewer: React.FC<{
    spreadsheetId: string;
    onDelete?: () => void;
}> = ({spreadsheetId, onDelete}) => {
    const {data} = useGetSpreadSheetQuery({
        spreadsheetId,
    })

    const {spreadsheets} = useDiagramEditorState()

    const mappedSpreadSheet = useMemo(() => {
        if (!data) return undefined
        const mappedSpreadSheet: ISpreadsheetView = lodash.cloneDeep(data)
        const datasetData = spreadsheets?.[spreadsheetId]

        for (let i = 0; i < data.rows.length; i++) {
            for (let j = 0; j < data.rows[i].values.length; j++) {
                let cellContent: string = data.rows[i].values[j].content
                let isValueFromDataset = false
                if (datasetData) {
                    try {
                        // const editorCellContent = datasetData.rows[i - datasetData.yAxisIndex - 1][j - datasetData.xAxisIndex - 1]
                        const editorCellContent = getValueFromDataset({
                            dataset: datasetData,
                            x: i,
                            y: j,
                        })
                        if (editorCellContent) {
                            if (editorCellContent.toString() !== cellContent.toString()) {
                                cellContent = editorCellContent.toString()
                                isValueFromDataset = true
                            }
                        }
                    } catch (e) {
                        console.error(`error during getting cell content from dataset ${spreadsheetId}`, e)
                    }

                }
                const cell = mappedSpreadSheet.rows[i].values[j]
                cell.content = cellContent
                if (isISpreadsheetExistedValueView(cell)) {
                    cell.isChanged = isValueFromDataset
                }
            }
        }
        const datasetDataRowLength = datasetData?.rows.length || 0
        const updatedLength = datasetDataRowLength - mappedSpreadSheet.rows.length
        if (updatedLength > 0 && datasetData) {

            for (let i = mappedSpreadSheet.rows.length; i < datasetData.rows.length; i++) {
                const formattedNewDatasetValues = datasetData.rows[i].map((content) => ({
                    content: content.toString(),
                }))
                // fill xAxis cells
                const fillXAxisCells = Array.from({length: datasetData.xAxisIndex + 1}, () => ({
                    content: '',
                }))
                const formattedValues = [...fillXAxisCells, ...formattedNewDatasetValues]
                mappedSpreadSheet.rows.push({
                    sheetId: spreadsheetId,
                    values: formattedValues,
                })
            }
        }
        return mappedSpreadSheet

    }, [spreadsheets, data])

    const formattedTable = useMemo(() => {
        if (!mappedSpreadSheet) return undefined
        console.log('mappedSpreadSheet', mappedSpreadSheet)
        // replace empty cells with
        const formattedRows = []
        for (let i = 0; i < mappedSpreadSheet.rows.length; i++) {
            const values: {
                content: string | number,
                colspan?: number,
            }[] = []
            let skipValues: {
                from: number
                to: number
            } | undefined = undefined
            for (let j = 0; j < mappedSpreadSheet.rows[i].values.length; j++) {
                const defaultCell = mappedSpreadSheet.rows[i].values[j]

                if (skipValues && j >= skipValues.from && j <= skipValues.to) {
                    continue
                }
                const colspan = (isISpreadsheetExistedValueView(defaultCell) && defaultCell.merge) ? (defaultCell.merge.e.c - defaultCell.merge.s.c + 1) : undefined
                if (colspan && colspan > 1) {
                    skipValues = {
                        from: j,
                        to: j + colspan - 1,
                    }
                }
                values.push({
                    content: defaultCell.content,
                    colspan,
                })
            }
            formattedRows.push({
                ...mappedSpreadSheet.rows[i],
                values,
            })
        }
        return {
            name: mappedSpreadSheet.name,
            rows: formattedRows,
        }
    }, [mappedSpreadSheet])


    const [reqDeleteSpreadsheet, {isSuccess: isSpreadsheetDeleted}] = useUseDeleteSpreadsheetMutation()
    const [reqUpdateSpreadsheet, {isSuccess: isSpreadsheetUpdated}] = useUpdateSpreadsheetMutation()

    useEffect(() => {
        if (isSpreadsheetDeleted && onDelete) {
            onDelete()
        }
    }, [isSpreadsheetDeleted]);

    const handleDeleteSpreadsheet = () => {
        reqDeleteSpreadsheet(spreadsheetId)
    }

    const updateSpreadsheet = () => {
        if (mappedSpreadSheet) {
            const toUpdateValues: {
                id: string
                content: string
            }[] = []
            mappedSpreadSheet.rows.forEach((row) => {
                return row.values.forEach((cell) => {
                    if (isISpreadsheetExistedValueView(cell) && cell.isChanged) {
                        toUpdateValues.push({
                            id: cell.id,
                            content: cell.content.toString(),
                        })
                    }
                })
            })
            reqUpdateSpreadsheet({
                spreadsheetId,
                values: toUpdateValues,
            })
        }
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
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1,
                    }}>
                        <MButton.Submit
                            onClick={updateSpreadsheet}
                        >
                            Save changes
                        </MButton.Submit>
                        <MButton.Submit
                            onClick={handleDeleteSpreadsheet}
                        >
                            Delete
                        </MButton.Submit>

                    </Box>
                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{
                        minWidth: 650,
                        backgroundColor: EColor.darkMarineLight,
                        color: EFontColor.white,
                    }} aria-label="simple table">
                        <TableBody>
                            {formattedTable.rows.map((row, i) => (
                                <TableRow
                                    key={i}
                                >
                                    {row.values.map((cell, j) => (
                                        <TableCell
                                            colSpan={cell.colspan}
                                            key={`${cell.content}_${j}`}
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
