import {GraphBaseNode} from "./GraphBaseNode";
import {IPoolNodeData, IResource} from "../../../interface";

export class GraphPoolNode extends GraphBaseNode<IPoolNodeData> {


    constructor(data: IPoolNodeData) {
        super(data);
    }

    get resources() {
        return this.data.resources;
    }

    takeCountResources(count: number) {
        const deletedResources = this.resources.slice(0, count);
        this._data = {
            ...this.data,
            resources: this.resources.slice(count)
        }
        return deletedResources
    }

    addResource(resource: IResource[]) {
        this._data = {
            ...this.data,
            resources: [...this.data.resources, ...resource]
        }
    }
}
