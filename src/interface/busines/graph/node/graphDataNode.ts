import {IResource} from "../../diagram";
import {isObject} from "../../../../utils";
import {EModeAddResourcesToDataNode} from "../modeAddResourcesToDataNode";

export interface IGraphDataNode {
    takeCountResources(count: number): IResource | undefined
    addResource(resources: IResource, mode?: EModeAddResourcesToDataNode, params?: {
        onSuccess?: (resourcesCount: number) => void,
    }): void
    resourcesToProvideCount: number
}

export const isIGraphDataNode = (node: unknown): node is IGraphDataNode => {
    return isObject(node) && 'takeCountResources' in node && typeof node['takeCountResources'] === 'function'
        && 'resourcesToProvideCount' in node && typeof node['resourcesToProvideCount'] === 'number'
}
