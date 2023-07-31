import React, {useEffect, useMemo, useState} from 'react';
import {Box, Input, Typography} from "@mui/material";
// eslint-disable-next-line import/named
import {Handle, NodeProps, Position} from "reactflow";
import {EConnection, IFormulaNodeData} from "../../../../interface";
import {EColor, EFontColor} from "../../../../constant";
import {useUpdateNode, useWidthAndHeight} from "../../../../hooks";
import {Scroll} from "../../../base";

export const FormulaNode: React.FC<NodeProps<IFormulaNodeData>> = ({isConnectable, data}) => {

    const [formula, setFormula] = useState<string>(data.formula || '')

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

    useEffect(() => {
        updateNodeData({
            formula
        })
    }, [formula])

    const duplicateMessage = useMemo(() => {
        const duplicates = data.variables?.filter((variable, index, array) => {
            return array.findIndex((item) => item.variableName === variable.variableName) !== index
        }).map((variable) => variable.variableName).join(', ')
        if (duplicates?.length) {
            return `duplicate: ${duplicates}`
        }
    }, [data.variables])

    const {elementRef, elementSize} = useWidthAndHeight()

    const [initialContentHeight, setInitialContentHeight] = useState<number>()

    useEffect(() => {
        if (!initialContentHeight && elementSize.height) {
            setInitialContentHeight(elementSize.height)
        }
    }, [elementSize])

    const contentHeight = useMemo(() => {
        if (!data.variables || !initialContentHeight) {
            return 'fit-content'
        }
        const multiplier = data.variables.length <= 3 ? data.variables.length : 3
        return initialContentHeight + (multiplier * 20)

    }, [data.variables, initialContentHeight])

    return (
        <Box>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                id={EConnection.LogicConnection}
            />
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                id={EConnection.EventConnection}
                style={{
                    background: EColor.blue,
                }}
            />
            <Box sx={{
                padding: 1,
                backgroundColor: EColor.black,
                color: EFontColor.white,
                width: 200,
                height: contentHeight,
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                borderWidth: 3,
                borderColor: data.style.borderColor,
                borderStyle: 'solid',
            }}
                 ref={elementRef}
            >
                <Input
                    onChange={onFormulaChange}
                    value={formula}
                    sx={{
                        color: EFontColor.white,
                    }}/>
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-between',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                    }}>
                        <Typography sx={{
                            flexShrink: 0,
                        }}>
                            list of inputs
                        </Typography>
                        <Scroll>
                            {data.variables?.map((variable, index) => (
                                <Typography key={index}>
                                    {variable.variableName} = {variable.value}
                                </Typography>
                            ))}
                        </Scroll>
                    </Box>
                    <Box sx={{
                        minWidth: 20,
                    }}>
                        = {result}
                    </Box>
                </Box>

                {duplicateMessage && <Box>
                    <Typography sx={{
                        color: EFontColor.red
                    }}>
                        {duplicateMessage}
                    </Typography>
                </Box>}

            </Box>
        </Box>
    );
};
