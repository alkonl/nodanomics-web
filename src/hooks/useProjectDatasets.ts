import {useGetProjectInfoQuery, useGetSpreadSheetsBaseInfoQuery} from "../api";

export const useProjectDatasets = ({diagramId}:{
    diagramId?: string
                                   }) => {
    const {data: resProjectInfo} = useGetProjectInfoQuery({
        diagramId: diagramId,
    }, {
        skip: !diagramId,
    })

    const {data: spreadsheets} = useGetSpreadSheetsBaseInfoQuery({
        projectId: resProjectInfo?.id,
    }, {
        skip: !resProjectInfo?.id,
    })
    return spreadsheets
}
