import React, {useMemo} from 'react';
import {Box} from "@mui/material";
import {EConnectionMode, IFormulaNodeData} from "../../../../interface";
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {BaseNodeShapeContainer} from "../container";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {NodeStyle} from "../styledComponent";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {LogicHandle} from "../../CustomHandle";


const HEIGHT = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 3.57
const WIDTH = GAP_BETWEEN_EDITOR_CANVAS_DOTS * 6.5
const clipPath = 'polygon(18% 0, 83% 0, 100% 50%, 83% 100%, 18% 100%, 0% 50%)'

export const FormulaNode: React.FC<NodeProps<IFormulaNodeData>> = (props) => {
    const {isConnectable, data} = props
    // const [formula, setFormula] = useState<string | undefined>(data.formula || '')

    const result = useMemo(() => {
        if (data.result && data.result.type === 'number') {
            const value = data.result.value
            return data.isShowDecimal ? value.toFixed(data.decimalDigits) : value
        }
    }, [data])

    // const {updateNodeData} = useUpdateNode({
    //     nodeId: data.id,
    // })

    // const onFormulaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormula(event.target.value)
    // }


    // const duplicateMessage = useMemo(() => {
    //     const duplicates = data.variables?.filter((variable, index, array) => {
    //         return array.findIndex((item) => item.variableName === variable.variableName) !== index
    //     }).map((variable) => variable.variableName).join(', ')
    //     if (duplicates?.length) {
    //         return `duplicate: ${duplicates}`
    //     }
    // }, [data.variables])


    // useEffect(() => {
    //     if (formula) {
    //         updateNodeData({
    //             formula
    //         })
    //     }
    // }, [formula])

    // const contentHeight = useMemo(() => {
    //     if (!data.variables) {
    //         return 0
    //     }
    //     const multiplier = data.variables.length <= 3 ? data.variables.length : 3
    //     return multiplier * 24
    //
    // }, [data.variables])

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
                    <ChainHandle
                        type="target"
                        position={Position.Left}
                        isConnectable={isConnectable}

                    />
                    <ChainHandle
                        type="source"
                        position={Position.Right}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeOutgoing}
                    />
                </Box>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 'calc(50% - 5px)',
                }}>
                    <LogicHandle
                        type="source"
                        position={Position.Top}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeOutgoing}
                    />
                </Box>
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 'calc(50% - 5px)',
                }}>
                    <LogicHandle
                        type="target"
                        position={Position.Bottom}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeIncoming}
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
                    <NodeStyle.Name type="text">
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
    );
};
