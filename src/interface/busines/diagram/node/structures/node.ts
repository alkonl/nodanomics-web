// eslint-disable-next-line import/named
import {Node} from "reactflow";
import {IPoolNodeData} from "../poolNode";
import {IFormulaNodeData} from "../formulaNode";
import {IVariableNodeData} from "../variableNode";
import {ISourceNodeData} from "../sourceNode";
import {IEventTriggerNodeData} from "../eventTriggerNode";
import {IEventListenerNodeData} from "../eventListenerNode";


export type INodeData = IVariableNodeData
    | IFormulaNodeData
    | ISourceNodeData
    | IPoolNodeData
    | IEventTriggerNodeData
    | IEventListenerNodeData

export type IReactFlowNode = Node<INodeData>


