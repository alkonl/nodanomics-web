import {EDiagramNode} from "../../diagram";


export interface IMatchManagerDataset {
    type: EDiagramNode.DatasetDatafield
    lengthX?: number
    lengthY?: number
    IndexOf: (value: string | number) => [number, number] | undefined
    Where: (value: string | number) => [number, number][] | undefined
}

export type IMatchManagerObject = IMatchManagerDataset
