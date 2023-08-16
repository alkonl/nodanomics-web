// eslint-disable-next-line import/named
import {Node} from "reactflow";
import {IDataNodeData} from "../dataNode";
import {IFormulaNodeData} from "../formulaNode";
import {IOriginNodeData} from "../originNode";
import {IEventTriggerNodeData} from "../eventTriggerNode";
import {IEventListenerNodeData} from "../eventListenerNode";
import {IStaticVariableNodeData} from "../staticVariableNode";
import {IMicroLoopNodeData} from "../microLoop";
import {IWhileLoopNodeData} from "../whileLoop";
import {IDatasetDatafield} from "../datasetDatafield";
import {IStartNodeData} from "../startNode";


export type INodeData = IStaticVariableNodeData
    | IFormulaNodeData
    | IOriginNodeData
    | IDataNodeData
    | IEventTriggerNodeData
    | IEventListenerNodeData
    | IMicroLoopNodeData
    | IWhileLoopNodeData
    | IDatasetDatafield
    | IStartNodeData

export type IReactFlowNode = Node<INodeData>


