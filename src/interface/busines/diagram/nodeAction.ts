export enum ENodeAction {
    pullAny = 'pullAny',
    pullAll = 'pullAll',
    pushAny = 'pushAny',
    pushAll = 'pushAll',
}

export interface INodeWithAction {
    actionMode: ENodeAction
}
