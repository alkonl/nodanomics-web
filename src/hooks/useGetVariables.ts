import {useDiagramEditorState} from "../redux";
import {EDiagramNode} from "../interface";

export const useGetVariables = (): {
    id: string
    display: string
}[] => {
    const {diagramNodes} = useDiagramEditorState()
    return diagramNodes.filter(node => node.data.tag).map((node) => {
        const tagVariable = {
            id: node.data.tag as string,
            display: ` ${node.data.tag}`,
        }
        if(node.data.type === EDiagramNode.DatasetDatafield && node.data.namedVariables) {
            const datasetVariables = Object.keys(node.data.namedVariables).map((key) => {
              return {
                    id: key,
                    display: ` ${node.data.tag}.${key}`,
            }}).flat()
            if(node.data.datafield){
                return [tagVariable, ...datasetVariables]
            }
            return datasetVariables
        }
        return tagVariable
    }).flat()
}
