import React, {useEffect} from 'react';
import {BaseSection} from "./BaseSection";
import {useToggle, useUpdateElement} from "../../../../../hooks";
import {ParameterContainer, ParameterLabel} from "../styledComponents";
import {Box, Input} from "@mui/material";
import {EFontColor} from "../../../../../constant";
import {EConnection, EElementType, IDiagramConnectionData, INodeData} from "../../../../../interface";
import {ConnectionFormulaParameter} from "../parameter/ConnectionFormulaParameter";
import {NodeTriggerModeParameter} from "../parameter/NodeTriggerModeParameter";
import {NodeActionParameter} from "../parameter/NodeActionParameter";
import {ConnectionTypeParameter} from "../parameter/ConnectionTypeParameter";
import {ConnectionVariableParameter} from "../parameter/ConnectionVariableParameter";
import {ElementSetupToolbarStyleSection} from "../ElementSetupToolbarStyleSection";
import {NodeDeleteButton} from "../NodeDeleteButton";
import {NodeTagParameter} from "../parameter/NodeTagParameter";

export const PropertiesSection: React.FC<{
    selectedElementData: INodeData | IDiagramConnectionData
}> = ({selectedElementData}) => {
    const {updateEdgeData, updateNodeData} = useUpdateElement({
        elementId: selectedElementData?.id,
        elementType: selectedElementData?.elementType,
    })

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedElementData?.elementType === EElementType.Node) {
            updateNodeData({
                name: event.target.value,
            })
        } else if (selectedElementData?.elementType === EElementType.Connection) {
            updateEdgeData({
                name: event.target.value,
            })
        }
    }


    const accordionController = useToggle()

    useEffect(() => {
        accordionController.open()
    }, [selectedElementData])

    return (
        <BaseSection
            isOpen={accordionController.isOpened}
            toggle={accordionController.toggle}
            title="Properties"
        >
            <Box sx={{
                display:'flex',
                flexDirection: 'column',
                gap: 1,
            }}>
                <ParameterContainer>
                    <ParameterLabel>
                        Name
                    </ParameterLabel>
                    <Input
                        value={selectedElementData?.name || ''}
                        onChange={onNameChange}
                        type="text"
                        sx={{
                            color: EFontColor.grey4,
                            width: '100%',
                        }}/>
                </ParameterContainer>
                {selectedElementData.elementType === EElementType.Node &&
                    <NodeTagParameter nodeData={selectedElementData}/>}
                {selectedElementData?.type === EConnection.DataConnection && <ConnectionFormulaParameter/>}
                {'trigger' in selectedElementData && <NodeTriggerModeParameter/>}
                {'actionMode' in selectedElementData && <NodeActionParameter/>}
                {selectedElementData.elementType === EElementType.Connection
                    &&
                    <ConnectionTypeParameter selectedElementData={selectedElementData as IDiagramConnectionData}/>}
                {selectedElementData.type === EConnection.LogicConnection
                    && <ConnectionVariableParameter selectedElementData={selectedElementData}/>}
                <ElementSetupToolbarStyleSection element={selectedElementData}/>
                {selectedElementData.elementType === EElementType.Node && <Box
                    sx={{
                        mt: 2,
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <NodeDeleteButton nodeId={selectedElementData.id}/>
                </Box>}
            </Box>
        </BaseSection>
    );
};
