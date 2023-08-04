import {isObject} from "../../../../../utils";

export interface INumberVariable {
    variableName: string
    value: number
}

export interface INodeNumberVariable {
    variables?: INumberVariable[]
}

export const isINodeNumberVariable = (obj: unknown): obj is INodeNumberVariable => {
    return isObject(obj) && 'variables' in obj && Array.isArray(obj.variables)
}
