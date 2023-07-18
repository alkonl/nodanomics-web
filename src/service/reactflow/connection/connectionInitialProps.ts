import {
    EConnection,
    EElementType,
    IDataConnectionData,
    IDiagramConnectionData,
    ILogicConnectionData
} from "../../../interface";
import {initialNodeDiagramElement} from "../../../constant";

const dataConnection: Omit<IDataConnectionData, 'id'> = {
    elementType: EElementType.Connection,
    name: 'data connection',
    type: EConnection.DataConnection,
    formula: '1',
    label: 'some label',
    style: initialNodeDiagramElement
}

const logicConnection: Omit<ILogicConnectionData, 'id'> = {
    elementType: EElementType.Connection,
    name: 'logic connection',
    type: EConnection.LogicConnection,
    label: 'some label',
    style: initialNodeDiagramElement
}


export const connectionInitialProps:{
    [key in EConnection]: Omit<IDiagramConnectionData, 'id'>
} = {
    [EConnection.DataConnection]: dataConnection,
    [EConnection.LogicConnection]: logicConnection
} satisfies {
    [EConnection.DataConnection]: Omit<IDataConnectionData, 'id'>,
    [EConnection.LogicConnection]: Omit<ILogicConnectionData, 'id'>
}
