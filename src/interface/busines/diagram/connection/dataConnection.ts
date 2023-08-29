import {EConnection, IDiagramConnectionBaseData} from "./structures";


export interface IDataConnectionData extends IDiagramConnectionBaseData {
    type: EConnection.DataConnection;
    interval?: number;
    formula?: string
    howManyWasTransferred?: number
    isTransferredResources?: boolean
}
