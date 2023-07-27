import React, {useEffect, useMemo} from 'react';
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
import {ElementNameParameter} from "../parameter/ElementNameParameter";


export const PropertiesSection: React.FC<{
    selectedElementData: INodeData | IDiagramConnectionData
}> = ({selectedElementData}) => {
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
            <Grid container columns={9} gap={1}>

                <ElementNameParameter elementData={selectedElementData}/>
                {selectedElementData.elementType === EElementType.Node &&
                    <NodeTagParameter nodeData={selectedElementData}/>}
                {'trigger' in selectedElementData && <NodeTriggerModeParameter nodeData={selectedElementData}/>}
                {'actionMode' in selectedElementData && <NodeActionParameter node={selectedElementData}/>}
            </Grid>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}>
                {selectedElementData?.type === EConnection.DataConnection && <ConnectionFormulaParameter/>}
                {selectedElementData.elementType === EElementType.Connection
                    &&
                    <ConnectionTypeParameter selectedElementData={selectedElementData as IDiagramConnectionData}/>}
                {selectedElementData.type === EConnection.LogicConnection
                    && <ConnectionVariableParameter selectedElementData={selectedElementData}/>}
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
