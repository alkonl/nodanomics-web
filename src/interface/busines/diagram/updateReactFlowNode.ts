import {DeepPartial, Optionalize} from "../../../utils";
import {IReactFlowNode} from "./node";

export type IUpdateReactflowNode = Optionalize<DeepPartial<IReactFlowNode>, 'id'>
