import React from 'react';
import {ElementParameter} from "./ElementParameter";
import {Box, Checkbox} from "@mui/material";
import {EColor} from "../../../../../constant";
import {Parameter} from "../styledComponents";
import {IDiagramNodeBaseData, INodeDecimal} from "../../../../../interface";
import {useUpdateNode} from "../../../../../hooks";

export const NodeDecimalParameter: React.FC<{
    nodeData: IDiagramNodeBaseData & INodeDecimal
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDiagramNodeBaseData & INodeDecimal>({
        nodeId: nodeData.id,
    })

    const changeIsShowDecimals = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
            isShowDecimal: checked
        })
    }

    const changeDigits = (event: React.ChangeEvent<HTMLInputElement>) => {
        const decimals = Number(event.target.value)
        updateNodeData({
            decimalDigits: decimals
        })
    }

    return (
        <ElementParameter label="Decimals">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Checkbox
                        onChange={changeIsShowDecimals}
                        checked={nodeData.isShowDecimal || false}
                        sx={{
                            padding: 0,
                            borderColor: EColor.grey2,
                            color: EColor.grey2,
                            '&.Mui-checked': {
                                color: EColor.grey2,
                            },
                        }}/>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1,
                }}>
                    <Parameter.Text sx={{
                        fontWeight: 400,
                        marginRight: 0.25,
                    }}>
                        Digits
                    </Parameter.Text>
                    <Parameter.Input

                        type="number"
                        value={nodeData.decimalDigits || ''}
                        onChange={changeDigits}
                        sx={{
                            maxWidth: 65,
                        }}
                    />
                </Box>
            </Box>
        </ElementParameter>
    );
};
