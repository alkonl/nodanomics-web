import React from 'react';
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {Box} from "@mui/material";
import {EConnection, IDataNodeData} from "../../../../interface";
import {NodeText} from "../styledComponent";
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {BaseNodeContainer} from "../container/BaseNodeContainer";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useChangeNodeDataStep} from "../../../../hooks";


export const DataNode: React.FC<NodeProps<IDataNodeData>> = (props) => {
    const {isConnectable, data} = props
    const currentResourcesValue = data.resources?.length.toFixed(1) || 0
    const maxRegisteredValue = data.maxResources
    const minRegisteredValue = data.minResources

    const isShowStep = data.isShowStep || false

    const {increaseNodeDataStep,decreaseNodeDataStep} = useChangeNodeDataStep({
        nodeId: props.data.id,
    })

    return (

        <>
            <Handle type="target" position={Position.Left} id={EConnection.DataConnection}
                    isConnectable={isConnectable}
                    style={{
                        background: EColor.green,
                    }}
            />
            <Handle type="source" position={Position.Right} id={EConnection.DataConnection}
                    isConnectable={isConnectable}
                    style={{
                        background: EColor.green,
                    }}
            />
            <BaseNodeContainer node={props}>

                <Box sx={{

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: GAP_BETWEEN_EDITOR_CANVAS_DOTS * 6,
                    height: GAP_BETWEEN_EDITOR_CANVAS_DOTS * 4,
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mx: 1,
                        justifyItems: 'center',
                        flex: 1,
                    }}>
                        {isShowStep && <KeyboardArrowUpIcon
                            onClick={increaseNodeDataStep}
                            sx={{
                                cursor: 'pointer',
                                pointerEvents: 'all',
                                width: 18,
                                height: 18,
                                color: EColor.white,
                            }}/>}
                        <NodeText.Name sx={{
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textAlign: 'center',
                            overflowWrap: 'break-word',
                        }}>
                            {data.name}
                        </NodeText.Name>
                        <NodeText.Value>
                            {currentResourcesValue}
                        </NodeText.Value>
                        {isShowStep && <KeyboardArrowDownIcon
                            onClick={decreaseNodeDataStep}
                            sx={{
                                cursor: 'pointer',
                                pointerEvents: 'all',
                                width: 18,
                                height: 18,
                                color: EColor.white,
                            }}
                        />}
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '2px',
                        height: 1,
                    }}>
                        <Box>
                            <NodeText.Name>
                                Max
                            </NodeText.Name>
                            <NodeText.Value>
                                {maxRegisteredValue ? maxRegisteredValue : <br/>}
                            </NodeText.Value>
                        </Box>
                        <Box>
                            <NodeText.Name>
                                Min
                            </NodeText.Name>
                            <NodeText.Value>
                                {minRegisteredValue ? minRegisteredValue : <br/>}
                            </NodeText.Value>
                        </Box>
                    </Box>
                </Box>
            </BaseNodeContainer>

        </>
    );
};
