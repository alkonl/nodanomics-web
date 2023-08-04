import {Optionalize} from "../../../utils";
import {IReactFlowNode} from "./node";

export type IUpdateReactflowNode = Optionalize<Partial<IReactFlowNode>, 'id'>
