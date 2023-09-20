import {IGroupedNodes, IReactFlowNode} from "../interface";
import {useMemo} from "react";
import {getNodeUsedTags, getNodeValue} from "../service";


export const useGroupNodesByTag = (nodes: IReactFlowNode[]): { [key: string]: IGroupedNodes } => {
    return useMemo(() => {
        const groupedNodesByTag: {
            [key: string]: IGroupedNodes
        } = {}
        const nodesWithTags = nodes.filter((node) => node.data.tag !== undefined)
        const nodeValues = new Map<string, number | boolean | undefined>()

        nodesWithTags.forEach((node) => {
            const nodeValue = getNodeValue(node)
            if (node.data.tag) {
                nodeValues.set(node.data.tag, nodeValue)
            }
        })
        nodesWithTags.forEach((node) => {
            if (node.data.tag === undefined) {
                return
            }
            const nodeUsedTags = getNodeUsedTags(node)
            const values: {
                nodeId: string;
                value: string;
            }[] | undefined = nodeUsedTags?.map((tag) => {
                const value = nodeValues.get(tag)
                return {
                    nodeId: node.data.id,
                    value: `${tag}: ${value}`,
                }
            })
            const mainValue = nodeValues.get(node.data.tag)

            if (nodeUsedTags) {
                groupedNodesByTag[node.data.tag] = {
                    tag: `${node.data.tag}: ${mainValue}`,
                    values: values,
                }
            }
        })
        return groupedNodesByTag;

    }, [nodes])
}
