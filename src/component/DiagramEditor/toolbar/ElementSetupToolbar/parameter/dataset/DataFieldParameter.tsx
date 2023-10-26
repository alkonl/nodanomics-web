import React, {useMemo} from 'react';
import {IParametersSelectValue, MSelect} from "../../../../../base";
import {ElementParameter} from "../ElementParameter";
// eslint-disable-next-line import/named
import {IDatasetDatafield} from "../../../../../../interface";
import {useDiagramEditorState} from "../../../../../../redux";
import type {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {useUpdateNode} from "../../../../../../hooks";

export const DataFieldParameter: React.FC<{
    nodeData: IDatasetDatafield
}> = ({nodeData}) => {

    const {spreadsheets} = useDiagramEditorState()

    const fields: IParametersSelectValue[] = useMemo(() => {
        if (spreadsheets && nodeData.datasetId && spreadsheets[nodeData.datasetId]) {
            const fields: IParametersSelectValue[] = []
            const rows = spreadsheets[nodeData.datasetId]?.rows
            for (let y = 0; y < rows.length; y++) {
                for (let x = 0; x < rows[y].length; x++) {

                    const value = rows[y][x]
                    const label = `[${x}][${y}]:${value}`
                    const field: IParametersSelectValue = {
                        value: JSON.stringify({
                            x,
                            y,
                        }),
                        label,
                    }
                    fields.push(field)
                }
            }
            return fields
        }
        return []
    }, [spreadsheets, nodeData])
    const {updateNodeData} = useUpdateNode<IDatasetDatafield>({
        nodeId: nodeData.id,
    })
    const changeDatafield = (event: SelectChangeEvent) => {
        const parsedValue = JSON.parse(event.target.value)
        const isDatafieldX = typeof parsedValue.x === 'number' && !isNaN(parsedValue.x)
        const isDatafieldY = typeof parsedValue.y === 'number' && !isNaN(parsedValue.y)
        if (isDatafieldY && isDatafieldX) {
            const checkedValue = {
                x: parsedValue.x,
                y: parsedValue.y,
            }
            updateNodeData({
                datafield: checkedValue,
            })
        }
    }

    const datafieldSelectValue = nodeData.datafield
        ? JSON.stringify(nodeData.datafield)
        : ''

    return (
        <ElementParameter label="Data Field">
            <MSelect.Parameters
                values={fields}
                onChange={changeDatafield}
                currentValue={datafieldSelectValue}
            />
        </ElementParameter>
    );
};
