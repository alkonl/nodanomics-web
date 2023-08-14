// eslint-disable-next-line import/named
import {Node} from "reactflow";
import {IDataNodeData} from "../dataNode";
import {IFormulaNodeData} from "../formulaNode";
import {ISourceNodeData} from "../sourceNode";
import {IEventTriggerNodeData} from "../eventTriggerNode";
import {IEventListenerNodeData} from "../eventListenerNode";
import {IStaticVariableNodeData} from "../staticVariableNode";
import {IMicroLoopNodeData} from "../microLoop";
import {IWhileLoopNodeData} from "../whileLoop";
import {IDatasetDatafield} from "../datasetDatafield";


export type INodeData = IStaticVariableNodeData
    | IFormulaNodeData
    | ISourceNodeData
    | IDataNodeData
    | IEventTriggerNodeData
    | IEventListenerNodeData
    | IMicroLoopNodeData
    | IWhileLoopNodeData
    | IDatasetDatafield

export type IReactFlowNode = Node<INodeData>


