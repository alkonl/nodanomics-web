import {IReactFlowEdge, IReactFlowNode} from "../interface";
import Elk from "elkjs/lib/elk.bundled.js";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import lodash from "lodash";
import {ElkExtendedEdge, ElkNode} from "elkjs/lib/elk-api";

const elk = new Elk({
    // defaultLayoutOptions: {
    //     "elk.algorithm": "layered",
    //     "elk.direction": "LEFT",
    //     "elk.spacing.nodeNode": "25",
    //     "elk.layered.spacing.nodeNodeBetweenLayers": "50",
    //     "elk.layered.spacing": "50",
    //     "elk.layered.mergeEdges": "true",
    //     "elk.spacing": "50",
    //     "elk.spacing.individual": "50",
    //     "elk.edgeRouting": "SPLINES"
    // }
});
const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    'elk.spacing.nodeNode': '100',
    "elk.direction": "RIGHT",
    // "elk.hierarchyHandling": "INCLUDE_CHILDREN",
};
const createGraphLayout = async (elements: {
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

    // const baseEdges: IReactFlowEdge[] = []
    // const childEdges: IReactFlowEdge[] = []
    // edges.forEach((edge) => {
    //     // if(edge.s && edge.targetParentNode) {
    //     //     childEdges.push(edge)
    //     // } else {
    //     //     baseEdges.push(edge)
    //     // }
    // })


    const formatEdge = (edge: IReactFlowEdge) => {
        return {
            id: edge.id,
            sources: [edge.source],
            targets: [edge.target],
        }
    }

    const getELKNode = (edges: IReactFlowEdge[], nodes: IReactFlowNode[], node: IReactFlowNode): ElkNode => {
        const children = nodes.filter((n) => n.parentNode === node.id)
        const elkNodeChildren = children.map((child) => getELKNode(edges, nodes, child))
        // const relatedEdges = edges.filter((edge) => edge.source === node.id || edge.target === node.id)
        // const elkNodeEdges = relatedEdges.map((edge) => formatEdge(edge))
        return {
            id: node.id,
            width: typeof node.width === 'number' ? node.width : 300,
            height: typeof node.height === 'number' ? node.height : 150,
            children: elkNodeChildren,
            // edges: elkNodeEdges,
        }
    }

    const formattedNodes: ElkNode[] = nodes.map((node) => getELKNode(edges, nodes, node))

    const edgesWithElkMetadata: ElkExtendedEdge[] = edges.map((edge) => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
    }))

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
            position: {
                x: node.x,
                y: node.y,
            },
            width: node.width,
            height: node.height,
        }
        return [layoutedNode, ...(children || [])]
    }
    const layoutedNodes = layoutedGraph.children?.map((child) => getLayoutedNodesRecurseve(child)).flat()
    const nodesWithUpdatedPosition = elements.nodes?.map((node) => {
        const layoutedNode = layoutedGraph.children?.find((n) => n.id === node.id)
        return {
            ...node,
            position: {
                x: layoutedNode?.x || node.position?.x,
                y: layoutedNode?.y || node.position?.y,
            }
        }
    })
    return {

        nodes: nodesWithUpdatedPosition,

        edges: layoutedGraph.edges,
    }


};

export const useAutoLayout = () => {
    const {diagramNodes, diagramEdges} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    return async () => {
        console.log('useAutoLayout:', diagramNodes)

        const structured = await createGraphLayout({
            nodes: lodash.cloneDeep(diagramNodes),
            edges: lodash.cloneDeep(diagramEdges),
        })
        console.log('structured:', structured)
        dispatch(diagramEditorActions.bulkUpdateNodes(structured.nodes))
    }
}
