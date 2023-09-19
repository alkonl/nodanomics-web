import {EDiagramNode} from "../../interface";

export const nodeTypeName: {
    [key in EDiagramNode]: string
} = {
    [EDiagramNode.Data]: 'Data',
    [EDiagramNode.Formula]: 'Formula',
    [EDiagramNode.MicroLoop]: 'MicroLoop',
    [EDiagramNode.WhileLoop]: 'MacroLoop',
    [EDiagramNode.EventListener]: 'EventListener',
    [EDiagramNode.EventTrigger]: 'EventTrigger',
    [EDiagramNode.Start]: 'Start',
    [EDiagramNode.Transfer]: 'Transfer',
    [EDiagramNode.Origin]: 'Origin',
    [EDiagramNode.Sink]: 'Sink',
    [EDiagramNode.StaticVariable]: 'StaticVariable',
    [EDiagramNode.DatasetDatafield]: 'Dataset',
}
