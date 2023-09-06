import {EConnection, IDiagramConnectionBaseData} from "./structures";
import {IIsElementExecuted} from "../generic";

export interface IChainConnectionData extends IDiagramConnectionBaseData, IIsElementExecuted {
    type: EConnection.ChainConnection;
    condition?: string;
}
