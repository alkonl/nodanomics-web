// eslint-disable-next-line import/named
import {XYPosition} from "reactflow";
import {IReactFlowNode} from "../../../interface";
import {generateNodeId} from "./generateNodeId";
import {resetNodeState} from "../resetNodeStates";


export const recreateNode = ({node, position}: { node: IReactFlowNode, position?: XYPosition }) => {
    const newNode = resetNodeState({...node})
    newNode.id = generateNodeId();
    newNode.data.id = newNode.id;
    newNode.data.name = `node ${newNode.id}`;
    newNode.selected = false;
    if (position) {
        newNode.position.x = position.x;
        newNode.position.y = position.y;
        newNode.positionAbsolute = {
            x: newNode.position.x,
            y: newNode.position.y,
        }
    }


    return newNode;
}


