// eslint-disable-next-line import/named
import {Node} from "reactflow";
import {IDiagramBaseInteractiveElementData} from "../diagramElement";
import {IPoolNodeData} from "./poolNode";
import {IFormulaNodeData} from "./formulaNode";
import {IVariableNodeData} from "./variableNode";
import {ISourceNodeData} from "./sourceNode";





export type INodeData = IVariableNodeData | IFormulaNodeData | ISourceNodeData | IPoolNodeData

export type IReactFlowNode = Node<INodeData>


