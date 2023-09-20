import {EPortSide} from "../../../interface";
import {ElkPort} from "elkjs/lib/elk-api";

export const portFactory = (side: EPortSide, index: number): ElkPort => {
    return {
        id: side,
        width: 5,
        height: 5,
        layoutOptions: {
            'port.side': side,
            "port.index": `${index}`,
        }
    }
}
