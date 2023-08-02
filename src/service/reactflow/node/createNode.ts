import {EDiagramNode} from "../../../interface";
import {createBaseNode} from "./createBaseNode";


export const createNode = ({type, position}: {
    type: EDiagramNode,
    position: { x: number, y: number }
}) => {
    return createBaseNode({type, position})
}
