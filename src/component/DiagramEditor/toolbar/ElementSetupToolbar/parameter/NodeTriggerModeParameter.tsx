import React from 'react';
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {ParameterContainer, ParameterLabel} from "../styledComponents";
import {EFontColor} from "../../../../../constant";
import {ENodeTrigger, IDiagramConnectionData, INodeData} from "../../../../../interface";
import {useCurrentEditElement, useUpdateElement} from "../../../../../hooks";

const nodeTriggerModes = Object.keys(ENodeTrigger)

export const NodeTriggerModeParameter: React.FC<{
    node:  INodeData | IDiagramConnectionData
}> = ({node}) => {

    const selectedElementData = node

    if (selectedElementData && !('trigger' in selectedElementData)) {
        throw new Error(`no triggerMode in selectedElementData ${JSON.stringify(selectedElementData)}`)
    }
    const {updateNodeTrigger} = useUpdateElement({
        elementType: selectedElementData.elementType,
        elementId: selectedElementData?.id,
    })
    const changeNodeTriggerMode = (event: SelectChangeEvent) => {
        updateNodeTrigger({
            trigger: event.target.value as ENodeTrigger,
        })
    }

    return (
        <>
            {
                selectedElementData &&
                <ParameterContainer>
                    <ParameterLabel>
                        Trigger
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
                            value={selectedElementData.trigger.mode}
                            onChange={changeNodeTriggerMode}
                            sx={{
                                color: EFontColor.grey4,
                            }}
                        >
                            {nodeTriggerModes.map((mode) => (
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
