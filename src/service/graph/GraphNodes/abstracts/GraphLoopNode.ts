import {GraphInvokableNode} from "./GraphInvokable";
import {EConnectionMode, IIsEventTriggered, ILoopNodeData} from "../../../../interface";
import {GraphLogicManager} from "../helper";
import {GraphMatchManagerNode} from "../../GraphMatchManager";
import {RunManager} from "../../RunManager";
import {GraphNodeManager} from "../../NodeManager";

export abstract class GraphLoopNode<IGenericNodeData extends ILoopNodeData = ILoopNodeData> extends GraphInvokableNode<IGenericNodeData>
    implements IIsEventTriggered {

    private readonly logicManager: GraphLogicManager = new GraphLogicManager(this.incomingEdges);
    protected readonly matchManager: GraphMatchManagerNode

    constructor(value: IGenericNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
        this.matchManager = new GraphMatchManagerNode(this.incomingEdges, nodeManager)
    }

    abstract isEventTriggered(mode?: EConnectionMode): boolean;

    protected abstract checkIsLoopActive(): void;

    get incomingVariables() {
        return this.data.incomingVariables
    }

    get outgoingVariables() {
        return this.data.outgoingVariables
    }

    invokeStep() {
        super.invokeStep()
        this.updateState()
        this.checkWasLoopActiveOnce()
    }

    updateState() {
        super.updateState()
        this.checkIsLoopActive()
        this.updateVariables()
        this.updateVariablesToExternal()
    }

    get isLoopWasActive() {
        return this.data.isLoopWasActive || false
    }

    get isLoopActive() {
        this.checkIsLoopActive()
        return this.data.isLoopActive || false
    }

    protected updateVariablesToExternal() {
        const variablesToExternal = this.logicManager.getVariables({
            targetMode: EConnectionMode.LoopChildrenToExternal,
        })
        this._data = {
            ...this.data,
            outgoingVariables: variablesToExternal,
        }
    }

    protected updateVariables() {
        const variables = this.logicManager.getVariables({
            targetMode: EConnectionMode.NodeIncoming,
        })

        this._data = {
            ...this.data,
            incomingVariables: variables,
        }
    }

    protected setIsLoopActive(isLoopActive: boolean) {
        this.updateNode({
            ...this.data,
            isLoopActive,
        })
    }

    private checkWasLoopActiveOnce() {
        if (!this.isLoopWasActive && this.isLoopActive) {
            this.updateNode({
                ...this.data,
                isLoopWasActive: this.isLoopActive,
            })
        }
    }

    updateChildrenNodesList() {
        const children: { id: string, name: string }[] = this.nodeManager.nodes.filter(node => {
            return node.parentId === this.data.id
        }).map(node => ({
            id: node.data.id,
            name: node.data.name,
        }))
        this._data = {
            ...this.data,
            children
        }
    }

    updateConnectedNodes() {
        this.updateChildrenNodesList()
        super.updateConnectedNodes()
        const children = this.data.children
        const connectedNodes = this.data.connectedNodes
        if (children && connectedNodes) {
            const childrenNodeNames = children.map(child => child.name)
            const filteredNodes = connectedNodes.filter(connectedNode => !childrenNodeNames.includes(connectedNode))
            this._data = {
                ...this.data,
                connectedNodes: filteredNodes
            }
        }
    }

}
