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
    mode: ENodeTrigger
}

export type INodeWithTrigger = {
    trigger: INodeWithBaseTrigger | INodeDataWithInteractiveTrigger
}
