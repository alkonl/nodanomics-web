import {EConnection, IDiagramConnectionBaseData} from "./structures";

export interface IEventConnectionData extends IDiagramConnectionBaseData {
    type: EConnection.EventConnection;
}
