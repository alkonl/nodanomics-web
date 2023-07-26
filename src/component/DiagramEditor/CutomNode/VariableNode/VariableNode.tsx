import React from 'react';
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {Box} from "@mui/material";
import {EConnection, IVariableNodeData} from "../../../../interface";
import {NodeText} from "../styledComponent";
import {EColor} from "../../../../constant";

export const VariableNode: React.FC<NodeProps<IVariableNodeData>> = ({isConnectable, data}) => {

    const currentResourcesValue = data.resources?.length.toFixed(1) || 0
    const maxRegisteredValue = data.maxResources
    const minRegisteredValue = data.minResources

    return (
        <Box>
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
            <Box sx={{
                borderWidth: 1,
                borderColor: EColor.purple,
                borderStyle: 'solid',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 150,
                backgroundColor: EColor.black,
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                    justifyItems: 'center',
                    flex: 2,
                }}>
                    <NodeText.Name sx={{
                        maxWidth: '100%',
                        overflow: 'hidden',
                        inlineSize: 100,
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
                }}>
                    <Box>
                        <NodeText.Name>
                            Max
                        </NodeText.Name>
                        <NodeText.Value>
                            {maxRegisteredValue}
                        </NodeText.Value>
                    </Box>
                    <Box>
                        <NodeText.Name>
                            Min
                        </NodeText.Name>
                        <NodeText.Value>
                            {minRegisteredValue}
                        </NodeText.Value>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
};
