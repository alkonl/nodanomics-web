import React from 'react';
import {IDataNodeData} from "../../../../../../interface";
import {ElementParameter} from "../ElementParameter";
import {Box, Checkbox} from "@mui/material";
import {EColor} from "../../../../../../constant";
import {useChangeNodeDataStep, useUpdateNode} from "../../../../../../hooks";
import {Parameter} from "../../../../../base";

export const NodeDataStepParameter: React.FC<{
    nodeData: IDataNodeData
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDataNodeData>({
        nodeId: nodeData.id,
    })

    const changeIsReadOnly = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        updateNodeData({
          isShowStep: checked
        })
    }

    const {changeNodeDataStep} = useChangeNodeDataStep({
        nodeData,
    })

    const changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
        const step = Number(event.target.value)
        changeNodeDataStep(step)
    }



    return (
        <ElementParameter label="Steps">
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 1,
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Parameter.Checkbox
                        onChange={changeIsReadOnly}
                        checked={nodeData.isShowStep || false}
                    />
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
                        Per Step
                    </Parameter.Text>
                    <Parameter.Input
                        type="number"
                        value={nodeData.step || ''}
                        onChange={changeStep}
                        sx={{
                            maxWidth: 65,
                        }}
                    />
                </Box>
            </Box>
        </ElementParameter>
    );
};
