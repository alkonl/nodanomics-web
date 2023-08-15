import React, {useMemo} from 'react';
import {useUpdateElement} from "../../../../../hooks";
import {EDiagramNode, ENodeAction, INodeData} from "../../../../../interface";
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {ElementParameter} from "./ElementParameter";
import {MSelect} from "../../../../base";


export const NodeActionParameter: React.FC<{
    node: INodeData
}> = ({node}) => {
    const selectedElementData = node

    if (selectedElementData && !('actionMode' in selectedElementData)) {
        throw new Error(`no actionMode in selectedElementData ${JSON.stringify(selectedElementData)}`)
    }
    const {updateNodeData} = useUpdateElement({
        elementType: selectedElementData.elementType,
        elementId: selectedElementData?.id,
    })
    const changeNodeActionMode = (event: SelectChangeEvent) => {
        updateNodeData({
            actionMode: event.target.value as ENodeAction,
        })
    }
    const nodeActionModes = useMemo(() => {
        if (selectedElementData?.type === EDiagramNode.Origin) {
            return [ENodeAction.pushAll, ENodeAction.pushAny]
        }
        return Object.keys(ENodeAction)
    }, [selectedElementData])

    return (
        <ElementParameter label="Action">
            <MSelect.Parameters
                values={nodeActionModes}
                currentValue={selectedElementData.actionMode}
                onChange={changeNodeActionMode}
            />
        </ElementParameter>
    );
};
