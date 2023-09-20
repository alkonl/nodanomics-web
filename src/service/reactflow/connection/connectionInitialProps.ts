import {
    EConnection,
    EElementType,
    IDataConnectionData,
    IDiagramConnectionData, IChainConnectionData,
    ILogicConnectionData
} from "../../../interface";
import {initialNodeDiagramElement} from "../../../constant";

const dataConnection: Omit<IDataConnectionData, 'id' | 'targetId' | 'sourceId' | 'sourceSide' | 'targetSide'> = {
    elementType: EElementType.Connection,
    name: 'data connection',
    type: EConnection.DataConnection,
    formula: '1',
    label: 'data label',
    style: initialNodeDiagramElement
}

const logicConnection: Omit<ILogicConnectionData, 'id' | 'targetId' | 'sourceId' | 'sourceSide' | 'targetSide'> = {
    elementType: EElementType.Connection,
    name: 'logic connection',
    type: EConnection.LogicConnection,
    label: 'logic label',
    variableName: 'a',
    style: initialNodeDiagramElement
}

const chainConnection: Omit<IChainConnectionData, 'id' | 'targetId' | 'sourceId' | 'sourceSide' | 'targetSide'> = {
    elementType: EElementType.Connection,
    name: 'chain connection',
    type: EConnection.ChainConnection,
    label: 'chain label',
    style: initialNodeDiagramElement,
    condition: 'true',
    isExecuted: false,
}


export const connectionInitialProps: {
    [key in EConnection]: Omit<IDiagramConnectionData, 'id' | 'targetId' | 'sourceId' | 'sourceSide' | 'targetSide'>
} = {
    [EConnection.DataConnection]: dataConnection,
    [EConnection.LogicConnection]: logicConnection,
    [EConnection.ChainConnection]: chainConnection
} satisfies {
    [EConnection.DataConnection]: Omit<IDataConnectionData, 'id' | 'targetId' | 'sourceId'| 'sourceSide' | 'targetSide'>,
    [EConnection.LogicConnection]: Omit<ILogicConnectionData, 'id' | 'targetId' | 'sourceId'| 'sourceSide' | 'targetSide'>
    [EConnection.ChainConnection]: Omit<IChainConnectionData, 'id' | 'targetId' | 'sourceId'| 'sourceSide' | 'targetSide'>
}
