import {Optionalize} from "../../utils";
import {IReactFlowNode} from "../busines";

export type IUpdateReactflowNode = Optionalize<Partial<IReactFlowNode>, 'id'>
