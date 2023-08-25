import React, {useEffect} from 'react';
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {Box} from "@mui/material";
import {EConnection, IDataNodeData} from "../../../../interface";
import {NodeStyle} from "../styledComponent";
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {BaseNodeContainer} from "../container";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useChangeNodeDataStep} from "../../../../hooks";
import {useDiagramEditorState} from "../../../../redux";


export const DataNode: React.FC<NodeProps<IDataNodeData>> = (props) => {
    const {isConnectable, data} = props
    const {isStepFinished, isDiagramRunning} = useDiagramEditorState()


    // const maxRegisteredValue = data.maxResources
    // const minRegisteredValue = data.minResources
    // const currentResourcesValue = data.resources?.length.toFixed(1) || 0

    const maxRegisteredValue = data.history.length > 0
        ? data.history.reduce((acc, cur) => Math.max(acc, cur), 0)
        : undefined
    const minRegisteredValue = data.history.length > 0
        ? data.history.reduce((acc, cur) => Math.min(acc, cur), Infinity)
        : undefined

    const isShowStep = data.isShowStep || false

    const {increaseNodeDataStep, decreaseNodeDataStep} = useChangeNodeDataStep({
        nodeData: props.data,
    })

    const [resources, setResources] = React.useState<number>(data.resources.length)
    const [minMaxResources, setMinMaxResources] = React.useState<{
        min: number | undefined,
        max: number | undefined,
    }>({
        min: undefined,
        max: undefined,
    })


    useEffect(() => {
        setResources(data.resources.length)
        if(data.history.length > 0) {
            setMinMaxResources({
                min: Math.min(...data.history),
                max: Math.max(...data.history),
            })
        }
    }, [isStepFinished]);

    useEffect(() => {
        if (!isDiagramRunning) {
            setResources(data.resources.length)
            if(data.history.length > 0) {
                setMinMaxResources({
                    min: Math.min(...data.history),
                    max: Math.max(...data.history),
                })
            } else {
                setMinMaxResources({
                    min: undefined,
                    max: undefined,
                })
            }
        }

    }, [data.resources]);


    const currentResourcesValue = resources.toFixed(1) || 0
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
                    backgroundColor: EColor.black,
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
                        <NodeStyle.Name sx={{
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textAlign: 'center',
                            overflowWrap: 'break-word',
                        }}>
                            {data.name}
                        </NodeStyle.Name>
                        <NodeStyle.Value>
                            {currentResourcesValue}
                        </NodeStyle.Value>
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
                            <NodeStyle.Name>
                                Max
                            </NodeStyle.Name>
                            <NodeStyle.Value>
                                {maxRegisteredValue ? maxRegisteredValue : <br/>}
                            </NodeStyle.Value>
                        </Box>
                        <Box>
                            <NodeStyle.Name>
                                Min
                            </NodeStyle.Name>
                            <NodeStyle.Value>
                                {minRegisteredValue !== undefined ? minRegisteredValue : <br/>}
                            </NodeStyle.Value>
                        </Box>
                    </Box>
                </Box>
            </BaseNodeContainer>

        </>
    );
};
