import {styled, Typography} from "@mui/material";
import {EFontColor} from "../../../constant";

export const NodeTextName = styled(Typography)(() => ({
    fontSize: 10,
    color: EFontColor.grey2,
}))

const NodeTextValue = styled(Typography)(() => ({
    fontSize: 12,
    fontWeight: 600,
    color: EFontColor.white,
}))

export const NodeText = {
    Name: NodeTextName,
    Value: NodeTextValue,
}
