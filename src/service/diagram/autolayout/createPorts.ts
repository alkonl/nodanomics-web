import {EPortSide} from "../../../interface";
import {ElkPort} from "elkjs/lib/elk-api";
import {portFactory} from "./portFactory";

export const createPorts = (params: EPortSide[]): ElkPort[] => {
    return params.map((side, index) => portFactory(side, index))
}
