import React from 'react';
import {ElementParameter} from "../ElementParameter";
import {IDatasetDatafield} from "../../../../../../interface";
import {Box, Checkbox} from "@mui/material";
import {EColor} from "../../../../../../constant";
import {useUpdateNode} from "../../../../../../hooks";
// eslint-disable-next-line import/named

export const DatasetReadOnly: React.FC<{
    nodeData: IDatasetDatafield
}> = ({nodeData}) => {

    const {updateNodeData} = useUpdateNode<IDatasetDatafield>({
        nodeId: nodeData.id,
    })

    const changeIsReadOnly = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        console.log('checked', checked)
        updateNodeData({
            isReadOnly: checked
        })
    }

    console.log('nodeData.isReadOnly', nodeData.isReadOnly)

    return (
        <ElementParameter label='Read-only'>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <Checkbox
                    onChange={changeIsReadOnly}
                    checked={nodeData.isReadOnly || false}
                    sx={{
                        padding: 0,
                        borderColor: EColor.grey2,
                        color: EColor.grey2,
                        '&.Mui-checked': {
                            color: EColor.grey2,
                        },
                    }}/>
            </Box>
        </ElementParameter>
    );
};
