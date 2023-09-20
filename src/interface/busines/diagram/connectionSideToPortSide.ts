import {EConnectionSide} from "./connection";
import {EPortSide} from "./autolayout";

export const connectionSideToPortSide: { [key in EConnectionSide]: EPortSide } = {
    [EConnectionSide.Left]: EPortSide.WEST,
    [EConnectionSide.Top]: EPortSide.NORTH,
    [EConnectionSide.Right]: EPortSide.EAST,
    [EConnectionSide.Bottom]: EPortSide.SOUTH,
}
