import {
    EConnection,
    EElementType,
    IDataConnectionData,
    IDiagramConnectionData,
    ILogicConnectionData
} from "../../../interface";
import {initialNodeDiagramElement} from "../../../constant";

const dataConnection: Omit<IDataConnectionData, 'id' | 'targetId' | 'sourceId'> = {
    elementType: EElementType.Connection,
    name: 'data connection',
    type: EConnection.DataConnection,
    formula: '1',
    label: 'some label',
    style: initialNodeDiagramElement
}

const logicConnection: Omit<ILogicConnectionData, 'id' | 'targetId' | 'sourceId'> = {
    elementType: EElementType.Connection,
    name: 'logic connection',
    type: EConnection.LogicConnection,
    label: 'some label',
    style: initialNodeDiagramElement
}


export const connectionInitialProps: {
    [key in EConnection]: Omit<IDiagramConnectionData, 'id' | 'targetId' | 'sourceId'>
} = {
    [EConnection.DataConnection]: dataConnection,
    [EConnection.LogicConnection]: logicConnection
} satisfies {
    [EConnection.DataConnection]: Omit<IDataConnectionData, 'id' | 'targetId' | 'sourceId'>,
    [EConnection.LogicConnection]: Omit<ILogicConnectionData, 'id' | 'targetId' | 'sourceId'>
}
