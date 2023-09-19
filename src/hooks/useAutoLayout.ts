import {IReactFlowEdge, IReactFlowNode} from "../interface";
import Elk from "elkjs/lib/elk.bundled.js";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import lodash from "lodash";
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
    'elk.spacing.nodeNode': '80',
};
const createGraphLayout = async (elements: {
    nodes: IReactFlowNode[];
    edges: IReactFlowEdge[];
}, options = {}) => {
    const {nodes, edges} = elements;
    const isHorizontal = true;
    const graph = {
        id: 'root',
        layoutOptions: options,
        children: nodes.map((node) => ({
            ...node,
            // Adjust the target and source handle positions based on the layout
            // direction.
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',

            // Hardcode a width and height for elk to use when layouting.
            width: 150,
            height: 50,
        })),
        edges: edges,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const layoutedGraph = await elk.layout(graph)

    return {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        nodes: layoutedGraph.children.map((node) => ({
            ...node,
            // React Flow expects a position property on the node instead of `x`
            // and `y` fields.
            position: {x: node.x, y: node.y},
        })),

        edges: layoutedGraph.edges,
    }

    // const nodes: ElkNode[] = [];
    // const edges: ElkExtendedEdge[] = [];
    //
    // elements.nodes.forEach((el) => {
    //     if (isNode(el)) {
    //         nodes.push({
    //             width: el?.__rf?.width,
    //             height: el?.__rf?.height,
    //             id: el.id,
    //         });
    //     }
    // });
    // elements.edges.forEach((el) => {
    //     edges.push({
    //         id: el.id,
    //         source: el.source,
    //         target: el.target,
    //     });
    // })
    // console.log('before: elk.layout')
    // const newGraph = await elk.layout(
    //     {
    //         id: "root",
    //         children: nodes,
    //         edges: edges
    //     }
    // );
    // console.log('after: elk.layout')
    //
    // const structuredNodes = elements.nodes.map((el) => {
    //     if (isNode(el)) {
    //         const node = newGraph?.children?.find((n) => n.id === el.id);
    //         if (node?.x && node?.y && node?.width && node?.height) {
    //             el.position = {
    //                 x: node.x - node.width / 2 + Math.random() / 1000,
    //                 y: node.y - node.height / 2
    //             };
    //         }
    //     }
    //     return el;
    // });
    // return {
    //     nodes: structuredNodes,
    //     edges: elements.edges
    // }
};

export const useAutoLayout = () => {
    const {diagramNodes, diagramEdges} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    return async () => {

        const structured = await createGraphLayout({
            nodes: lodash.cloneDeep(diagramNodes),
            edges: lodash.cloneDeep(diagramEdges),
        })
        // dispatch(diagramEditorActions.bulkUpdateNodes(structured.nodes))
    }
}
