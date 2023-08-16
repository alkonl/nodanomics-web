import {EConnection, IDiagramConnectionBaseData} from "./structures";

export interface IChainConnectionData extends IDiagramConnectionBaseData {
    type: EConnection.ChainConnection;
}
