import {IReactFlowNode} from "../interface";
import {useReactFlowInstance} from "./useReactFlowInstance";

export const useFocusNode = () => {
    const {reactFlowInstance} = useReactFlowInstance().data;
    return (node: IReactFlowNode) => {
        const nodeSize = {
            width: node.width || 250,
            height: node.height || 100,
        }
        const nodePosition = {
            x:  node.positionAbsolute?.x || node.position.x,
            y: node.positionAbsolute?.y || node.position.y,
        }
        const x = nodePosition.x + nodeSize.width / 2;
        const y = nodePosition.y + nodeSize.height / 2;
        const zoom = 1.85;
        reactFlowInstance?.setCenter(x, y, {zoom, duration: 600});
    };
}
