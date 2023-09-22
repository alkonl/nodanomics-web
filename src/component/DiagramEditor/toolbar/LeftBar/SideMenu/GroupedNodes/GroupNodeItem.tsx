import React from 'react';
import {Button, Typography} from "@mui/material";
import {useSetEditElement} from "../../../../../../hooks";
import {EElementType} from "../../../../../../interface";
import {EFontColor} from "../../../../../../constant";

export const GroupNodeItem: React.FC<{
    nodeName: string;
    nodeId: string;
}> = ({nodeName, nodeId}) => {

    const setEditNode = useSetEditElement()

    const onClick = () => {
        setEditNode({
            id: nodeId,
            elementType: EElementType.Node
        })
    }

    return (
        <Button
            onClick={onClick}
            sx={{
                textAlign: 'left',
                wordBreak: 'break-all',
                width: '100%',
                justifyContent: 'flex-start',
            }}
        >
            <Typography sx={{
                color: EFontColor.grey2,
            }}>
                {nodeName}
            </Typography>
        </Button>
    );
};
