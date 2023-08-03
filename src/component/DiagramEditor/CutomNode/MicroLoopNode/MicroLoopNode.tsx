import React, {useEffect, useState} from 'react';
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {EConnectionMode, IMicroLoopNodeData} from "../../../../interface";
import {BaseNodeContainer} from "../container/BaseNodeContainer";
import {Box} from "@mui/material";
import {EColor} from "../../../../constant";
import {useExpandOrCollapse, useUpdateNode} from "../../../../hooks";
import {EventHandle} from "../../CustomHandle/EventHandle";
import {LogicHandle} from "../../CustomHandle";
import {MicroLoopNodeHeader} from "./MicroLoopNodeHeader";

export const MicroLoopNode: React.FC<NodeProps<IMicroLoopNodeData>> = (props) => {
    const {data} = props;

    const [loopCount, setLoopCount] = useState<number | undefined>(data.loopCount)
    const {updateNodeData} = useUpdateNode<IMicroLoopNodeData>({
        nodeId: data.id,
    })

    const onLoopCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoopCount(Number(event.target.value))
    }

    useEffect(() => {
        if (loopCount) {
            updateNodeData({loopCount})
        }
    }, [loopCount])

    const {isOpened, expandOrCollapse} = useExpandOrCollapse({
        initialIsOpened: data.isCollapsed,
    })

    const changeExpandOrCollapse = () => {
        expandOrCollapse({parentId: data.id})
    }

    return (
        <BaseNodeContainer node={props}>
            {isOpened ?
                <MicroLoopNodeHeader
                    type="small"
                    name={data.name}
                    onLoopCountChange={onLoopCountChange}
                    loopCount={loopCount}
                    currentLoopCount={data.currentLoopCount}
                    changeExpandOrCollapse={changeExpandOrCollapse}
                />
                : <Box
                    sx={{
                        padding: 1,
                        boxSizing: 'border-box',
                        width: data.style.width,
                        height: data.style.height,
                        backgroundColor: EColor.darkPurple,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <MicroLoopNodeHeader
                        type="big"
                        name={data.name}
                        onLoopCountChange={onLoopCountChange}
                        loopCount={loopCount}
                        currentLoopCount={data.currentLoopCount}
                        changeExpandOrCollapse={changeExpandOrCollapse}
                    />
                    <Box sx={{
                        position: 'relative',
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Box sx={{
                            height: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>
                            <Box sx={{
                                position: 'relative',
                            }}>
                                <EventHandle
                                    type="source"
                                    position={Position.Right}
                                    mode={EConnectionMode.LoopInToChildren}
                                />
                            </Box>
                            <Box sx={{
                                position: 'relative',
                            }}>
                                <LogicHandle
                                    type="source"
                                    position={Position.Right}
                                />
                            </Box>
                        </Box>
                        <EventHandle
                            type="source"
                            position={Position.Right}
                            mode={EConnectionMode.LoopOut}
                        />
                    </Box>
                </Box>}
        </BaseNodeContainer>
    );
};
