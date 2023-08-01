import {EConnection, EConnectionMode, IDiagramConnectionBaseData} from "./structures";

export interface IEventConnectionData extends IDiagramConnectionBaseData {
    type: EConnection.EventConnection;
    mode?: EConnectionMode
}
