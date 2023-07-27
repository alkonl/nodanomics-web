import {IGroupedNodes, IReactFlowNode} from "../interface";
import {useMemo} from "react";

export const useGroupNodesByTag = (nodes:  IReactFlowNode[]) => {
    return  useMemo(() => {
        const groupedNodesByTag: {
            [key: string]: IGroupedNodes} = {}
        Object.values(nodes).forEach((node) => {
            if (node.data.tag === undefined) {
                return;
            }
            if (groupedNodesByTag[node.data.tag] === undefined) {
                groupedNodesByTag[node.data.tag] = {
                    tag: node.data.tag,
                    nodes: [],
                }
            }
            groupedNodesByTag[node.data.tag].nodes.push({
                nodeId: node.data.id,
                nodeName: node.data.name,
            })
        })
        return groupedNodesByTag;

    }, [nodes])
}
