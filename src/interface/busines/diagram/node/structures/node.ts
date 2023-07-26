// eslint-disable-next-line import/named
import {Node} from "reactflow";
import {IPoolNodeData} from "../poolNode";
import {IFormulaNodeData} from "../formulaNode";
import {ISourceNodeData} from "../sourceNode";
import {IEventTriggerNodeData} from "../eventTriggerNode";
import {IEventListenerNodeData} from "../eventListenerNode";
import {IStaticVariableNodeData} from "../staticVariableNode";


export type INodeData = IStaticVariableNodeData
    | IFormulaNodeData
    | ISourceNodeData
    | IPoolNodeData
    | IEventTriggerNodeData
    | IEventListenerNodeData

export type IReactFlowNode = Node<INodeData>


