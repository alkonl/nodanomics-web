import {useGetManySpreadsheetQuery, useGetProjectInfoQuery, useGetSpreadSheetsBaseInfoQuery} from "../api";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {useEffect} from "react";
import {IStructuredSpreadsheetsData} from "../interface";
import {spreadsheetToState} from "../service";

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
                const newSpreadsheet = spreadsheetToState(spreadsheet)
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
