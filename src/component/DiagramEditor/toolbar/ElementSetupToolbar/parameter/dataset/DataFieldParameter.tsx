import React, {useMemo} from 'react';
import {MSelect} from "../../../../../base";
import {ElementParameter} from "../ElementParameter";
// eslint-disable-next-line import/named
import {IDatasetDatafield} from "../../../../../../interface";
import {useDiagramEditorState} from "../../../../../../redux";

export const DataFieldParameter: React.FC<{
    nodeData: IDatasetDatafield
}> = ({nodeData}) => {

    const {spreadsheets} = useDiagramEditorState()

    const fields = useMemo(() => {
        if (spreadsheets && nodeData.datasetId) {
            const fields: string[] = []
            const rows = spreadsheets[nodeData.datasetId].rows
            for (let y = 0; y < rows.length; y++) {
                for (let x = 0; x < rows[y].length; x++) {
                    const value = rows[y][x]
                    const field = `[${y}][${x}]:${value}`
                    fields.push(field)
                }
            }
            return fields
        }
    }, [spreadsheets, nodeData])

    return (
        <ElementParameter label="Data Field">
            <MSelect.Parameters
                values={fields}
            />
        </ElementParameter>
    );
};
