import {ElkExtendedEdge, ElkNode} from "elkjs/lib/elk-api";
import {connectionSideToPortSide, IReactFlowEdge, IReactFlowNode} from "../../../interface";
import {getPorts} from "./getPorts";
import {elk, elkOptions} from "./elk";

export const createGraphLayout = async (elements: {
    nodes: IReactFlowNode[];
    edges: IReactFlowEdge[];
}, options = {}) => {
    const {nodes, edges} = elements;

    const childNodes: IReactFlowNode[] = []
    const baseNodes: IReactFlowNode[] = []

    nodes.forEach((node) => {
        if (node.parentNode) {
            childNodes.push(node)
        } else {
            baseNodes.push(node)
        }
    })

    const getELKNode = (edges: IReactFlowEdge[], nodes: IReactFlowNode[], node: IReactFlowNode): ElkNode => {
        const children = nodes.filter((n) => n.parentNode === node.id)
        const elkNodeChildren = children.map((child) => getELKNode(edges, nodes, child))
        const ports = getPorts(node)
        return {
            id: node.id,
            width: typeof node.width === 'number' ? node.width : 300,
            height: typeof node.height === 'number' ? node.height : 150,
            children: elkNodeChildren,
            ports,
        }
    }

    const formattedNodes: ElkNode[] = baseNodes.map((node) => getELKNode(edges, nodes, node))

    const edgesWithElkMetadata: ElkExtendedEdge[] = edges.map((edge) => {
        if (edge.data) {
            const sourcePortSide = connectionSideToPortSide[edge.data?.sourceSide]
            const targetPortSide = connectionSideToPortSide[edge.data?.targetSide]
            return {
                id: edge.id,
                sources: [`${edge.source}/${sourcePortSide}`],
                targets: [`${edge.target}/${targetPortSide}`],
            }
        }
        return {
            id: edge.id,
            sources: [`${edge.source}`],
            targets: [`${edge.target}`],
        }
    })

    const graph: ElkNode = {
        id: 'root',
        layoutOptions: options,
        children: formattedNodes,
        edges: edgesWithElkMetadata,
    };

    const layoutedGraph = await elk.layout(graph, {
        layoutOptions: elkOptions,

    })

    const getLayoutedNodesRecurseve = (node: ElkNode): ElkNode[] => {
        const children = node.children?.map((child) => getLayoutedNodesRecurseve(child)).flat()
        const layoutedNode = {
            id: node.id,
            x: node.x,
            y: node.y,
            width: node.width,
            height: node.height,
        }
        return [layoutedNode, ...(children || [])]
    }
    const layoutedNodes = layoutedGraph.children?.map((child) => getLayoutedNodesRecurseve(child)).flat()
    const nodesWithUpdatedPosition = elements.nodes?.map((node) => {
        const layoutedNode = layoutedNodes?.find((n) => n.id === node.id)
        const position = {
            x: layoutedNode?.x !== undefined ? layoutedNode.x: node.position?.x,
            y: layoutedNode?.y !== undefined ? layoutedNode.y: node.position?.y,
        }
        return {
            ...node,
            position,
        }

    })
    return {

        nodes: nodesWithUpdatedPosition,

        edges: layoutedGraph.edges,
    }


};
