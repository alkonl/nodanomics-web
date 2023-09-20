import {EConnectionSide, EDiagramNode, IReactFlowEdge, IReactFlowNode} from "../interface";
import Elk from "elkjs/lib/elk.bundled.js";
import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import lodash from "lodash";
import {ElkExtendedEdge, ElkNode, ElkPort} from "elkjs/lib/elk-api";

// WEST  ← | EAST → | NORTH ↑ | SOUTH ↓

enum EPortSide {
    WEST = 'WEST',
    EAST = 'EAST',
    NORTH = 'NORTH',
    SOUTH = 'SOUTH',
}

const connectionSideToPortSide: { [key in EConnectionSide]: EPortSide } = {
    [EConnectionSide.Left]: EPortSide.WEST,
    [EConnectionSide.Top]: EPortSide.NORTH,
    [EConnectionSide.Right]: EPortSide.EAST,
    [EConnectionSide.Bottom]: EPortSide.SOUTH,
}

const baseNodePorts: { [key in EDiagramNode]?: ElkPort[] } = {
    [EDiagramNode.Origin]: [
        {
            id: `WEST`, width: 5, height: 5,
            layoutOptions: {
                'port.side': 'WEST',
                "port.index": "1",
                // "allowNonFlowPortsToSwitchSides": "true"
            }
        },
        {
            id: `EAST`, width: 5, height: 5, layoutOptions: {
                'port.side': 'EAST',
                "port.index": "2",
                // "allowNonFlowPortsToSwitchSides": "true"
            }
        },
        {
            id: `NORTH`, width: 5, height: 5, layoutOptions: {
                'port.side': 'NORTH',
                "port.index": "3",
                // "allowNonFlowPortsToSwitchSides": "true"
            }
        }
    ],
    [EDiagramNode.Data]: [
        {
            id: `WEST`, width: 5, height: 5,
            layoutOptions: {
                'port.side': 'WEST',
                "port.index": "1",
            }
        },
        {
            id: `EAST`, width: 5, height: 5, layoutOptions: {
                'port.side': 'EAST',
                "port.index": "2",
            }
        },
    ],
    [EDiagramNode.Transfer]: [
        {
            id: `WEST`, width: 5, height: 5,
            layoutOptions: {
                'port.side': 'WEST',
                "port.index": "1",
                // "allowNonFlowPortsToSwitchSides": "true"
            }
        },
        {
            id: `EAST`, width: 5, height: 5, layoutOptions: {
                'port.side': 'EAST',
                "port.index": "2",
                // "allowNonFlowPortsToSwitchSides": "true"
            }
        },
    ],
    [EDiagramNode.Sink]: [
        {
            id: `WEST`, width: 5, height: 5,
            layoutOptions: {
                'port.side': 'WEST',
                "port.index": "1",
                // "allowNonFlowPortsToSwitchSides": "true"
            }
        },
        {
            id: `EAST`, width: 5, height: 5, layoutOptions: {
                'port.side': 'EAST',
                "port.index": "2",
                // "allowNonFlowPortsToSwitchSides": "true"
            }
        },    {
            id: EPortSide.SOUTH, width: 5, height: 5, layoutOptions: {
                'port.side': `${EPortSide.SOUTH}`,
                "port.index": "3",
                // "allowNonFlowPortsToSwitchSides": "true"
            }
        }
    ],
}

const getPorts = (node: IReactFlowNode): ElkPort[] => {
    const basePorts = baseNodePorts[node.data.type] || baseNodePorts[EDiagramNode.Origin]
    if (basePorts) {
        return basePorts.map((port) => ({
            ...port,
            id: `${node.id}/${port.id}`
        }))
    }
    return []
}

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
    "elk.layered.feedbackEdges": "true",
    'elk.spacing.nodeNode': '100',
    "elk.direction": "RIGHT",
    "elk.alignment": "RIGHT",
    "elk.edgeRouting": "ORTHOGONAL",
    // "elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
    // "elk.spacing.edgeNode": '-500',
    "partitioning.activate": 'true',
    "elk.hierarchyHandling": "INCLUDE_CHILDREN",
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
        const ports = getPorts(node)
        return {
            id: node.id,
            width: typeof node.width === 'number' ? node.width : 300,
            height: typeof node.height === 'number' ? node.height : 150,
            children: elkNodeChildren,
            ports,
            // layoutOptions: {
            //     'elk.direction': '100',
            // },
            // edges: elkNodeEdges,
        }
    }

    const formattedNodes: ElkNode[] = baseNodes.map((node) => getELKNode(edges, nodes, node))

    const edgesWithElkMetadata: ElkExtendedEdge[] = edges.map((edge) => {
        if (edge.data) {
            const sourcePortSide = connectionSideToPortSide[edge.data?.sourceSide]
            const targetPortSide = connectionSideToPortSide[edge.data?.targetSide]
            // edge.zIndex.
            return {
                id: edge.id,
                sources: [`${edge.source}`],
                targets: [`${edge.target}/${targetPortSide}`],
            }
        }
        console.error('edge.data is undefined:', edge)
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
    console.log('layoutedGraph:', layoutedGraph)
    const nodesWithUpdatedPosition = elements.nodes?.map((node) => {
        const layoutedNode = layoutedNodes?.find((n) => n.id === node.id)
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
        const filteredEdges = diagramEdges.filter((edge) => {
            return diagramNodes.find((node) => node.id === edge.source) && diagramNodes.find((node) => node.id === edge.target)
        })
        const structured = await createGraphLayout({
            nodes: lodash.cloneDeep(diagramNodes),
            edges: lodash.cloneDeep(filteredEdges),
        })
        console.log('structured:', structured)
        dispatch(diagramEditorActions.bulkUpdateNodes(structured.nodes))
    }
}

const edges = [
    {
        "id": "e1",
        "sources": [
            "n1"
        ],
        "targets": [
            "n2"
        ]
    },
    {
        "id": "e2",
        "sources": [
            "n2"
        ],
        "targets": [
            "P4"
        ]
    },
    {
        "id": "e15",
        "sources": [
            "P1"
        ],
        "targets": [
            "n4"
        ]
    },
    {
        "id": "e16",
        "sources": [
            "P2"
        ],
        "targets": [
            "n5"
        ]
    },
    {
        "id": "e17",
        "sources": [
            "P3"
        ],
        "targets": [
            "n6"
        ]
    },
]

