import {useGetManySpreadsheetQuery, useGetProjectInfoQuery, useGetSpreadSheetsBaseInfoQuery} from "../api";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useEffect} from "react";
import {IStructuredSpreadsheetData, IStructuredSpreadsheetsData} from "../interface";

export const useSetAllSpreadSheetsToState = () => {
    const dispatch = useAppDispatch()
    const {currentDiagramId} = useDiagramEditorState()
    const {data: resProjectInfo} = useGetProjectInfoQuery({
        diagramId: currentDiagramId,
    }, {
        skip: !currentDiagramId,
    })

    const {data: spreadsheetsBaseInfo} = useGetSpreadSheetsBaseInfoQuery({
        projectId: resProjectInfo?.id,
    }, {
        skip: !resProjectInfo?.id,
    })

    const spreadsheetIds = spreadsheetsBaseInfo?.data.map((spreadsheet) => spreadsheet.id)


    const {data: projectSpreadsheets} = useGetManySpreadsheetQuery({
        spreadsheetIds,
    }, {
        skip: !spreadsheetIds,
    })

    useEffect(() => {
        if (projectSpreadsheets) {
            const formatted: IStructuredSpreadsheetsData = projectSpreadsheets.reduce((accSpreadsheet, spreadsheet) => {
                // find y column index, where rows starts
                const yAxisIndex = spreadsheet.rows.findIndex((cells) => cells.values.some((cell) => cell.content === 'Y Axis'))

                // find x column index, where columns starts
                let xAxisIndex = 0
                spreadsheet.rows.find((cells, index) => {
                    if (cells.values.some((cell) => cell.content === 'X Axis')) {
                        xAxisIndex = index
                        return true
                    }
                })

                // const yAxisIndex = spreadsheet.rows.findIndex((cells) => cells.values.some((cell) => cell.content === 'Y Axis'))

                const rows: (string | number)[][] = [];

                for (let i = yAxisIndex + 1; i < spreadsheet.rows.length; i++) {
                    const row = spreadsheet.rows[i];
                    const newRow: (string | number)[] = [];

                    for (let j = xAxisIndex + 1; j < row.values.length; j++) {
                        const cell = row.values[j];
                        const numContent = Number(cell.content);

                        if (!isNaN(numContent)) {
                            newRow.push(numContent);
                        } else {
                            newRow.push(cell.content);
                        }
                    }

                    rows.push(newRow);
                }

                const newSpreadsheet: IStructuredSpreadsheetData = {
                    name: spreadsheet.name,
                    xAxisIndex,
                    yAxisIndex,
                    rows,
                    // TODO remove hardcode
                    lengthX: 10,
                }

                return {
                    [spreadsheet.id]: newSpreadsheet,
                    ...accSpreadsheet
                }
            }, {})
            dispatch(
                diagramEditorActions.setSpreadsheets({
                    spreadsheets: formatted,
                })
            )
        }
    }, [projectSpreadsheets, resProjectInfo, spreadsheetsBaseInfo]);
}
