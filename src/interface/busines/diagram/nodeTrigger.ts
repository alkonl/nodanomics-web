export enum ENodeTrigger {
    passive = "passive",
    automatic = "automatic",
    enabling = "enabling",
    interactive = "interactive",
}


export type INodeDataWithInteractiveTrigger = {
    mode: ENodeTrigger.interactive,
    isClicked: boolean,
}

export type INodeWithBaseTrigger = {
    mode: Exclude<ENodeTrigger, ENodeTrigger.interactive>
}

export type INodeTriggers = INodeWithBaseTrigger | INodeDataWithInteractiveTrigger;

export interface INodeWithTrigger {
    trigger: INodeTriggers
}
