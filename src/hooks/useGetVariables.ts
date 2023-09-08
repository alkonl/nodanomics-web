import {useDiagramEditorState} from "../redux";
import {EDiagramNode} from "../interface";

export const useGetVariables = (): {
    id: string
    display: string
}[] => {
    const {diagramNodes} = useDiagramEditorState()
    return diagramNodes.filter(node => node.data.tag).map((node) => {
        if(node.data.type === EDiagramNode.DatasetDatafield && node.data.namedVariables) {
            return Object.keys(node.data.namedVariables).map((key) => {
              return {
                    id: key,
                    display: ` ${node.data.tag}.${key}`,
            }}).flat()
        }
        return {
            id: node.data.tag as string,
            display: ` ${node.data.tag}`,
        }
    }).flat()
}
