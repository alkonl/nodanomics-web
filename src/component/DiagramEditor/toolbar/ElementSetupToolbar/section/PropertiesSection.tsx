import React, {Fragment, useEffect, useMemo} from 'react';
import {BaseSection} from "./BaseSection";
import {useToggle} from "../../../../../hooks";
import {Box, Grid} from "@mui/material";
import {EConnection, EElementType, IDiagramConnectionData, INodeData} from "../../../../../interface";
import {ConnectionFormulaParameter} from "../parameter/ConnectionFormulaParameter";
import {NodeTriggerModeParameter} from "../parameter/NodeTriggerModeParameter";
import {NodeActionParameter} from "../parameter/NodeActionParameter";
import {ConnectionTypeParameter} from "../parameter/ConnectionTypeParameter";
import {ConnectionVariableParameter} from "../parameter/ConnectionVariableParameter";
import {ElementSetupToolbarStyleSection} from "../ElementSetupToolbarStyleSection";
import {NodeDeleteButton} from "../NodeDeleteButton";
import {NodeTagParameter} from "../parameter/NodeTagParameter";
import {ElementNameParameterInput} from "../parameter/ElementNameParameter";
import {ElementParameterLabel} from "../parameter/ElementParameterLabel";

export const PropertiesSection: React.FC<{
    selectedElementData: INodeData | IDiagramConnectionData
}> = ({selectedElementData}) => {
    // const {updateEdgeData, updateNodeData} = useUpdateElement({
    //     elementId: selectedElementData?.id,
    //     elementType: selectedElementData?.elementType,
    // })
    //
    // const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (selectedElementData?.elementType === EElementType.Node) {
    //         updateNodeData({
    //             name: event.target.value,
    //         })
    //     } else if (selectedElementData?.elementType === EElementType.Connection) {
    //         updateEdgeData({
    //             name: event.target.value,
    //         })
    //     }
    // }


    const accordionController = useToggle()

    useEffect(() => {
        accordionController.open()
    }, [selectedElementData])

    const parameterList: {
        ParameterInput: React.FC<{
            elementData: INodeData | IDiagramConnectionData,
        }>
        label: string
    }[] = useMemo(() => {
        const properties = [{
            ParameterInput: ElementNameParameterInput,
            label: 'Name'
        }]
        if (selectedElementData?.elementType === EElementType.Node) {
            // properties.push(ElementNameParameter)
            // properties.push(NodeTriggerModeParameter)
            // properties.push(NodeActionParameter)
            // properties.push(NodeTagParameter)
        }
        return properties
    }, [selectedElementData])

    return (
        <BaseSection
            isOpen={accordionController.isOpened}
            toggle={accordionController.toggle}
            title="Properties"
        >
            <Grid container columns={9} gap={1}>
                {parameterList.map(({ParameterInput,label}) => (
                    <Fragment key={label}>
                        <Grid item xs={3}>
                            <ElementParameterLabel label={label}/>
                        </Grid>
                        <Grid item xs={5.5}>
                            <ParameterInput elementData={selectedElementData}/>
                        </Grid>
                    </Fragment>
                ))}
            </Grid>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}>
                {selectedElementData.elementType === EElementType.Node &&
                    <NodeTagParameter nodeData={selectedElementData}/>}
                {selectedElementData?.type === EConnection.DataConnection && <ConnectionFormulaParameter/>}
                {'trigger' in selectedElementData && <NodeTriggerModeParameter node={selectedElementData}/>}
                {'actionMode' in selectedElementData && <NodeActionParameter node={selectedElementData}/>}
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
