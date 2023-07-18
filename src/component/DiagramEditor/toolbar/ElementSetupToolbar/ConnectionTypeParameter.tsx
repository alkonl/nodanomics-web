import React from 'react';
import {ParameterContainer, ParameterLabel} from "./styledComponents";
import {EConnection, IDiagramConnectionData} from "../../../../interface";
import {useUpdateEdgeData} from "../../../../hooks";
// eslint-disable-next-line import/named
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {EFontColor} from "../../../../constant";

const nodeTriggerModes = Object.keys(EConnection)

export const ConnectionTypeParameter: React.FC<{
    selectedElementData: IDiagramConnectionData
}> = ({selectedElementData}) => {

    const {updateEdgeType} = useUpdateEdgeData({
        edgeId: selectedElementData.id,
    })
    const changeNodeTriggerMode = (event: SelectChangeEvent) => {
        updateEdgeType(event.target.value as EConnection)
    }

    return (
        <ParameterContainer>
            <ParameterLabel>
                Conection Type
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
                    value={selectedElementData.type}
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
    );
};
