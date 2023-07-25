import {EConnection, IDiagramConnectionBaseData} from "./structures";

export interface ILogicConnectionData extends IDiagramConnectionBaseData {
    type: EConnection.LogicConnection;
    variableName?: string;
}
