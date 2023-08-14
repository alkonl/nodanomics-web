import React from 'react';
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {Box} from "@mui/material";
import {EConnection, IVariableNodeData} from "../../../../interface";
import {NodeText} from "../styledComponent";
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {BaseNodeContainer} from "../container/BaseNodeContainer";

export const VariableNode: React.FC<NodeProps<IVariableNodeData>> = (props) => {
    const {isConnectable, data} = props
    const currentResourcesValue = data.resources?.length.toFixed(1) || 0
    const maxRegisteredValue = data.maxResources
    const minRegisteredValue = data.minResources

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
                        gap: 1,
                        justifyItems: 'center',
                        flex: 1,
                    }}>
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
