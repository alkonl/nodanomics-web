import React from 'react';
import {Parameter} from "../../../../../base";
import {useUpdateNode} from "../../../../../../hooks";
import {IDataNodeData, IDiagramNodeBaseData, IIsShowInExecutionGraphNode} from "../../../../../../interface";

export const NodeIsShowInExecutionGraph: React.FC<{
    nodeData: IDiagramNodeBaseData & IIsShowInExecutionGraphNode
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDiagramNodeBaseData & IIsShowInExecutionGraphNode>({
        nodeId: nodeData.id,
    })

    const changeIsReadOnly = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
            isShowInExecutionGraphNode: checked
        })
    }

    return (
        <Parameter.ElementContainer label="track">
            <Parameter.Checkbox
                onChange={changeIsReadOnly}
                checked={nodeData.isShowInExecutionGraphNode || false}
            />
        </Parameter.ElementContainer>
    );
};

