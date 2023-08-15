import React, {useEffect, useMemo, useState} from 'react';
import {Box} from "@mui/material";
import {EConnectionMode, IFormulaNodeData} from "../../../../interface";
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {useUpdateNode} from "../../../../hooks";
import {BaseNodeShapeContainer} from "../container";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {NodeStyle} from "../styledComponent";
import {EventHandle} from "../../CustomHandle/EventHandle";
import {LogicHandle} from "../../CustomHandle";


const HEIGHT = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 4
const WIDTH = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 6
const clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'

export const FormulaNode: React.FC<NodeProps<IFormulaNodeData>> = (props) => {
    const {isConnectable, data} = props
    const [formula, setFormula] = useState<string | undefined>(data.formula || '')

    const result = useMemo(() => {
        if (data.result && data.result.type === 'number') {
            return data.result.value
        }
    }, [data])

    const {updateNodeData} = useUpdateNode({
        nodeId: data.id,
    })

    const onFormulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormula(event.target.value)
    }


    const duplicateMessage = useMemo(() => {
        const duplicates = data.variables?.filter((variable, index, array) => {
            return array.findIndex((item) => item.variableName === variable.variableName) !== index
        }).map((variable) => variable.variableName).join(', ')
        if (duplicates?.length) {
            return `duplicate: ${duplicates}`
        }
    }, [data.variables])


    useEffect(() => {
        if (formula) {
            updateNodeData({
                formula
            })
        }
    }, [formula])

    const contentHeight = useMemo(() => {
        if (!data.variables) {
            return 0
        }
        const multiplier = data.variables.length <= 3 ? data.variables.length : 3
        return multiplier * 24

    }, [data.variables])

    return (
        <>
            {/*connections*/}
            <Box sx={{
                position: 'absolute',
                width: 'calc(100% + 28px)',
                height: 'calc(100% + 28px)',
                left: -14,
                top: -14,
            }}>
                <Box sx={{
                    width: '100%',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',
                    bottom: 'calc(50% - 5px)',
                }}>
                    <EventHandle
                        type="target"
                        position={Position.Left}
                        isConnectable={isConnectable}

                    />
                    <EventHandle
                        type="source"
                        position={Position.Right}
                        isConnectable={isConnectable}
                    />
                </Box>
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 'calc(50% - 5px)',
                }}>
                    <LogicHandle
                        type="source"
                        position={Position.Right}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeOutgoing}
                    />
                </Box>
            </Box>
            <BaseNodeShapeContainer
                params={{
                    width: WIDTH,
                    height: HEIGHT,
                    clipPath: clipPath,
                }}
                node={props}>
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'column',
                        clipPath: clipPath,
                        background: EColor.black,
                        py: 2,
                        px: 2,
                    }}
                >
                    <NodeStyle.Name type="small">
                        {data.name}
                    </NodeStyle.Name>
                    <NodeStyle.Value>
                        {result}
                    </NodeStyle.Value>
                    <NodeStyle.Name type="small">
                        {data.formula}
                    </NodeStyle.Name>
                </Box>
            </BaseNodeShapeContainer>

        </>
        // <Box>
        //     <Box sx={{
        //         position: 'absolute',
        //         width: 'calc(100% + 10px)',
        //         left: -5,
        //         height: '100%',
        //         display: 'flex',
        //         justifyContent: 'space-between',
        //         alignItems: 'center',
        //     }}>
        //         <LogicHandle
        //             type="target"
        //             position={Position.Left}
        //             isConnectable={isConnectable}
        //             mode={EConnectionMode.NodeIncoming}
        //         />
        //         <LogicHandle
        //             type="source"
        //             position={Position.Right}
        //             isConnectable={isConnectable}
        //             mode={EConnectionMode.NodeOutgoing}
        //         />
        //     </Box>
        //     <Box sx={{
        //         padding: 1,
        //         backgroundColor: EColor.black,
        //         color: EFontColor.white,
        //         width: 200,
        //         height: 'fit-content',
        //         display: 'flex',
        //         flexDirection: 'column',
        //         flex: 1,
        //         borderWidth: 3,
        //         borderColor: data.style.borderColor,
        //         borderStyle: 'solid',
        //     }}
        //     >
        //         <Input
        //             onChange={onFormulaChange}
        //             value={formula}
        //             sx={{
        //                 color: EFontColor.white,
        //             }}/>
        //         <Box sx={{
        //             display: 'flex',
        //             flex: 1,
        //             justifyContent: 'space-between',
        //         }}>
        //             <Box
        //                 sx={{
        //                     flex: 1,
        //                     height: 'fit-content',
        //                 }}
        //             >
        //                 <Typography sx={{
        //                     flexShrink: 0,
        //                 }}>
        //                     list of inputs
        //                 </Typography>
        //                 <Box sx={{
        //                     display: 'flex',
        //                     flexDirection: 'column',
        //                     flex: 1,
        //                     height: contentHeight,
        //                 }}
        //                 >
        //
        //                     <Scroll>
        //                         {data.variables?.map((variable, index) => (
        //                             <Typography key={index}>
        //                                 {variable.variableName} = {variable.value}
        //                             </Typography>
        //                         ))}
        //                     </Scroll>
        //
        //                 </Box>
        //             </Box>
        //
        //             <Box sx={{
        //                 minWidth: 20,
        //             }}>
        //                 = {result}
        //             </Box>
        //         </Box>
        //
        //         {duplicateMessage && <Box>
        //             <Typography sx={{
        //                 color: EFontColor.red
        //             }}>
        //                 {duplicateMessage}
        //             </Typography>
        //         </Box>}
        //
        //     </Box>
        // </Box>
    );
};
