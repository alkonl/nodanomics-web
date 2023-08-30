import React from "react";
import {IDiagramNodeBaseData, IIsNodeAutomatic} from "../../../../../../interface";
import {useUpdateNode} from "../../../../../../hooks";
import {Parameter} from "../../../../../base";

export const IsNodeAutomaticProperty: React.FC<{
    nodeData: IDiagramNodeBaseData & IIsNodeAutomatic
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDiagramNodeBaseData & IIsNodeAutomatic>({
        nodeId: nodeData.id,
    })

    const changeIsNodeAutomatic = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
            isAutomatic: checked
        })
    }

    return (
        <Parameter.ElementContainer label="automatic">
            <Parameter.Checkbox
                onChange={changeIsNodeAutomatic}
                checked={nodeData.isAutomatic || false}
            />
        </Parameter.ElementContainer>
    );
};
