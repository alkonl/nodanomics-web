import {isISpreadsheetExistedValueView, ISpreadsheetView, IStructuredSpreadsheetData} from "../../interface";
import lodash from "lodash";

export const joinLocalAndServerSpreadsheet =
    (
        serverSpreadsheet: ISpreadsheetView,
        datasetData: IStructuredSpreadsheetData,
        spreadsheetId: string
    ) => {
        const baseSpreadsheet: ISpreadsheetView = lodash.cloneDeep(serverSpreadsheet)

        for (let i = 0; i < baseSpreadsheet.rows.length; i++) {
            for (let j = 0; j < baseSpreadsheet.rows[i].values.length; j++) {
                let cellContent: string = baseSpreadsheet.rows[i].values[j].content
                let isValueFromDataset = false
                if (datasetData && datasetData.rows) {
                    try {
                        const rowIndex = i - datasetData.yAxisIndex
                        const cellIndex = j - datasetData.xAxisIndex

                        if (rowIndex >= 0 && cellIndex >= 0 && datasetData.rows[rowIndex] && datasetData.rows[rowIndex][cellIndex]) {
                            const editorCellContent = datasetData.rows[rowIndex][cellIndex]
                            if (editorCellContent) {
                                if (editorCellContent.toString() !== cellContent.toString()) {
                                    cellContent = editorCellContent.toString()
                                    isValueFromDataset = true
                                }
                            }
                        }

                    } catch (e) {
                        console.error(`error during getting cell content from dataset ${spreadsheetId}`, e)
                    }

                }
                const cell = baseSpreadsheet.rows[i].values[j]
                cell.content = cellContent
                if (isISpreadsheetExistedValueView(cell)) {
                    cell.isChanged = isValueFromDataset
                }
            }
        }
        if (datasetData && datasetData?.rows) {
            const datasetDataRowLength = datasetData?.rows.length || 0
            const mappedSpreadSheetDataRowLength = baseSpreadsheet.rows.length - datasetData.yAxisIndex
            const updatedLength = datasetDataRowLength - mappedSpreadSheetDataRowLength
            if (updatedLength > 0 && datasetData) {
                // here was mappedSpreadSheetDataRowLength - 1
                for (let rowIndex = mappedSpreadSheetDataRowLength; rowIndex < datasetData.rows.length; rowIndex++) {


                    // fill xAxis cells
                    const rowIndexToWrite = rowIndex + datasetData.yAxisIndex
                    const fillXAxisCells = Array.from({length: datasetData.xAxisIndex}, (_, columnIndex) => ({
                        content: '',
                        columnIndex: columnIndex,
                        rowIndex: rowIndexToWrite,
                        isNew: true,
                    }))
                    const formattedNewDatasetValues = datasetData.rows[rowIndex]?.map((content, columnIndex) => ({
                        content: content ? content?.toString() : '',
                        columnIndex: columnIndex + fillXAxisCells.length,
                        rowIndex: rowIndexToWrite,
                        isNew: true,
                    })) || []

                    const formattedValues = [...fillXAxisCells, ...formattedNewDatasetValues]
                    baseSpreadsheet.rows.push({
                        sheetId: spreadsheetId,
                        values: formattedValues,
                    })
                }
            }
        }
        return baseSpreadsheet

    }
