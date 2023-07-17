export enum ENodeTrigger {
    passive = "passive",
    automatic = "automatic",
    enabling = "enabling",
}


export interface INodeWithTrigger {
    triggerMode: ENodeTrigger
}
