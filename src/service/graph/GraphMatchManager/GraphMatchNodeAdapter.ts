import {GraphDatasetDatafieldNode} from "../GraphNodes";
import {EDiagramNode, IMatchManagerObject} from "../../../interface";

export class GraphMatchNodeAdapter {
   static adapt(node: GraphDatasetDatafieldNode) : IMatchManagerObject {
        return {
            type: EDiagramNode.DatasetDatafield,
            lengthX: node.lengthX,
            lengthY: node.lengthY,
            IndexOf: node.indexOf.bind(node),
            Where: node.where.bind(node),
            ...node.getDynamicVariables()
        }
    }
}
