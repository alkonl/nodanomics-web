import React from 'react';
import {ElementParameter} from "../ElementParameter";
import {Parameter} from "../../../../../base";
import {ILoopNodeData} from "../../../../../../interface";

export const GeneralLoopChildrenNodesParameter: React.FC<{
    nodeData: ILoopNodeData
}> = ({nodeData}) => {

    const childrenNames = nodeData?.children?.map((child) => child.name)

    return (
        <ElementParameter label="Children Nodes">
            <Parameter.List items={childrenNames}/>
        </ElementParameter>
    );
};

