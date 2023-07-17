import React from 'react';
import {ParameterContainer, ParameterLabel} from "./styledComponents";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useCurrentEditElement, useUpdateElement} from "../../../../hooks";
import {ENodeAction} from "../../../../interface";
import {EFontColor} from "../../../../constant";
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";

const nodeActionModes = Object.keys(ENodeAction)

export const NodeActionParameter = () => {
    const selectedElementData = useCurrentEditElement()?.data

    if (selectedElementData && !('actionMode' in selectedElementData)) {
        throw new Error(`no actionMode in selectedElementData ${JSON.stringify(selectedElementData)}`)
    }
    const {updateNodeData} = useUpdateElement({
        elementType: selectedElementData?.elementType,
        elementId: selectedElementData?.id,
    })
    const changeNodeActionMode = (event: SelectChangeEvent) => {
        console.log('changeNodeActionMode', event)
        updateNodeData({
            actionMode: event.target.value as ENodeAction,
        })
    }

    return (
        <>
            {
                selectedElementData &&
                <ParameterContainer>
                    <ParameterLabel>
                        Action
                    </ParameterLabel>
                    <FormControl
                        sx={{
                            color: EFontColor.grey4,
                        }}
                        fullWidth
                        size="small"
                    >
                        <InputLabel
                            sx={{
                                color: EFontColor.grey4,
                            }}
                        />
                        <Select
                            value={selectedElementData.actionMode}
                            onChange={changeNodeActionMode}
                            sx={{
                                color: EFontColor.grey4,
                            }}
                        >
                            {nodeActionModes.map((mode) => (
                                <MenuItem
                                    key={mode}
                                    value={mode}
                                    sx={{
                                        color: EFontColor.grey4,
                                    }}
                                >
                                    {mode}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ParameterContainer>
            }
        </>
    );
};
