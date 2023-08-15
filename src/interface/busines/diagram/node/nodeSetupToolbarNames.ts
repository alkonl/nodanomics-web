import {EDiagramNode} from "./structures";
import {EConnection} from "../connection";

export const nodeSetupToolbarNames: {
    [key in (EDiagramNode | EConnection)]: string
} = {
    [EDiagramNode.Data]: 'Data',
    [EDiagramNode.DatasetDatafield]: 'Dataset Datafield',
    [EDiagramNode.EventListener]: 'Event Listener',
    [EDiagramNode.EventTrigger]: 'Event Trigger',
    [EDiagramNode.Formula]: 'Formula',
    [EDiagramNode.MicroLoop]: 'Micro Loop',
    [EDiagramNode.Origin]: 'Origin',
    [EDiagramNode.StaticVariable]: 'Static Variable',
    [EDiagramNode.WhileLoop]: 'While Loop',
    [EConnection.DataConnection]: 'Data Connection',
    [EConnection.EventConnection]: 'Event Connection',
    [EConnection.LogicConnection]: 'Logic Connection',
}
