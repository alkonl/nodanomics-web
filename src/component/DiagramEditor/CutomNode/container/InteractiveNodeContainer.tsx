import React, {useMemo} from 'react';
import {Box} from "@mui/material";
import {useUpdateNode} from "../../../../hooks";
import {ENodeTrigger, INodeDataWithInteractivity, INodeTriggers} from "../../../../interface";
import {EColor} from "../../../../constant";

export const InteractiveNodeContainer: React.FC<{
    children: React.ReactNode
    data: INodeDataWithInteractivity
}> = ({children, data}) => {


    const {unableInteractiveTrigger} = useUpdateNode({
        nodeId: data.id
    })

    const onClick = () => {
        if (data.trigger.mode === ENodeTrigger.interactive) {
            unableInteractiveTrigger()
        }
    }
    const borderStyle = useMemo(() => {
        if (data.trigger.mode === ENodeTrigger.interactive && data.trigger.isClicked) {
            return {
                borderColor: EColor.blue,
                borderWidth: 2,
                borderStyle: 'solid'
            }
        }
    }, [data])

    return (
        <Box
            onClick={onClick}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                ...borderStyle,
            }}
        >
            {children}
        </Box>
    );
};
