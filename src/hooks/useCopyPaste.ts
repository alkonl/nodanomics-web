import {diagramEditorActions, useAppDispatch, useDiagramEditorState} from "../redux";
import {IReactFlowNode} from "../interface";
import {geAllChildrenNodes, generateNodeId, getTopParents, recursiveUpdateChildrenV2} from "../service";
import {useMemo} from "react";
import {useReactFlowInstance} from "./useReactFlowInstance";
// eslint-disable-next-line import/named
import {ReactFlowInstance, XYPosition} from "reactflow";
import {useMousePosition} from "./useMousePosition";

interface MousePosition {
    x: number;
    y: number;
}

const recreateNode = ({node, position}: { node: IReactFlowNode, position?: XYPosition }) => {
    const newNode = {...node}
    newNode.id = generateNodeId();
    newNode.data.id = newNode.id;
    newNode.selected = false;
    if (position) {
        newNode.position.x = position.x;
        newNode.position.y = position.y;
    }

    return newNode;
}

const recreateNodes = ({nodes, reactFlowInstance, reactFlowWrapper, mousePosition}: {
    reactFlowInstance: ReactFlowInstance
    reactFlowWrapper: HTMLDivElement
    mousePosition: MousePosition
    nodes: IReactFlowNode[]
}): IReactFlowNode[] => {
    const topParent = getTopParents(nodes)
    const nodesWithoutParent = nodes
        .filter(node => !nodes.some(n => n.id === node.parentNode) && !topParent.some(n => n.id === node.id))
    const reactFlowBounds = reactFlowWrapper.getBoundingClientRect();
    const position = reactFlowInstance.project({
        x: mousePosition.x - reactFlowBounds.left,
        y: mousePosition.y - reactFlowBounds.top,
    });


    const updatedTopParents = topParent.map(node => {
        return {
            newNode: recreateNode({node, position}),
            previous: node
        }
    })


    const children = updatedTopParents.map(({newNode, previous: previousTopParent}) => {
        return recursiveUpdateChildrenV2({
            nodes,
            oldParentNode: previousTopParent,
            newParentNode: newNode,
            func: ({node, parentNode}) => {
                const updatedNode = recreateNode({node})
                const parent = previousTopParent.id === parentNode.id ? newNode : parentNode
                console.log(`parent ${parent.data.name}: `, parent, updatedNode)
                return {
                    ...updatedNode,
                    parentNode: parent.id,
                    data: {
                        ...updatedNode.data,
                        name: `${updatedNode.data.name} copy`,
                        parentId: parent.id,
                    }
                }
            }
        })
    }).map(nodes => nodes.map(({newParentNode}) => newParentNode)).flat()

    // const children = updatedTopParents.map(({newNode, previous: previousTopParent}) => {
    //     return recursiveUpdateChildrenV2(nodes, previousTopParent, ({node, parentNode}) => {
    //         const updatedNode = recreateNode({node})
    //         const parent = previousTopParent.id === parentNode.id ? newNode : parentNode
    //         console.log(`parent ${parent.data.name}: `, parent, updatedNode)
    //         return {
    //             ...updatedNode,
    //             parentNode: parent.id,
    //             data: {
    //                 ...updatedNode.data,
    //                 name: `${updatedNode.data.name} copy`,
    //                 parentId: parent.id,
    //             }
    //         }
    //     })
    // }).flat()
    const updatedNodesWithoutParent = nodesWithoutParent.map(node => {
        return {
            ...recreateNode({node, position}),
            parentNode: undefined,
            extent: undefined,
        }
    })
    console.log('updatedNodesWithoutParent: ', updatedNodesWithoutParent)
    const formattedTopParents = updatedTopParents.map(({newNode}) => newNode)
    console.log('formattedTopParents: ', formattedTopParents)
    return [...updatedNodesWithoutParent, ...formattedTopParents, ...children]
}

export const useCopyPaste = () => {
    const {reactFlowWrapper, reactFlowInstance} = useReactFlowInstance().data
    const {currentEditElement, diagramNodes} = useDiagramEditorState()
    const dispatch = useAppDispatch()
    const {addManyNodes} = diagramEditorActions
    const mousePosition = useMousePosition()
    const nodeToCopy: IReactFlowNode[] = useMemo(() => {
        if (currentEditElement) {
            const parentNodes = diagramNodes.filter(node => node.id === currentEditElement.id)
            const children = geAllChildrenNodes({nodes: diagramNodes, parentId: currentEditElement.id})
            return [...parentNodes, ...children]
        }
        return []
    }, [currentEditElement])

    const copy = () => {
        navigator.clipboard.writeText(JSON.stringify(nodeToCopy));
    };

    const paste = async () => {
        const text = await navigator.clipboard.readText();
        const nodes = JSON.parse(text) as IReactFlowNode[]
        console.log('copied nodes', nodes)
        if (reactFlowInstance && reactFlowWrapper && reactFlowWrapper.current !== null) {
            const formatted = recreateNodes({
                nodes,
                reactFlowInstance,
                reactFlowWrapper: reactFlowWrapper.current,
                mousePosition,
            })
            console.log('formatted', formatted)
            dispatch(addManyNodes(formatted))
        }

    };

    return {copy, paste};
}
