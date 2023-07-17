export enum ENodeTrigger {
    passive = "passive",
    automatic = "automatic",
}


export interface INodeWithTrigger {
    triggerMode: ENodeTrigger
}
