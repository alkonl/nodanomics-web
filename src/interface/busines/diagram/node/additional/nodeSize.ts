import {isObject} from "../../../../../utils";

export interface INodeSize {
    width: number;
    height: number;
}

export const isINodeSize = (obj: unknown): obj is INodeSize => {
    return isObject(obj) && 'width' in obj && 'height' in obj
    && typeof  obj.height === 'number' && typeof obj.width === 'number'
}

