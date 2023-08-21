import React, {useEffect} from 'react';
import {BaseSection} from "./BaseSection";
import {useToggle} from "../../../../../hooks";
import {Grid} from "@mui/material";
import {
    EConnection,
    EDiagramNode,
    EElementType,
    IDiagramConnectionData,
    INodeData,
} from "../../../../../interface";
import {ConnectionFormulaParameter} from "../parameter/ConnectionFormulaParameter";
import {NodeTriggerModeParameter} from "../parameter/NodeTriggerModeParameter";
import {NodeActionParameter} from "../parameter/NodeActionParameter";
import {ConnectionTypeParameter} from "../parameter/ConnectionTypeParameter";
import {NodeTagParameter} from "../parameter/NodeTagParameter";
import {ElementNameParameter} from "../parameter/ElementNameParameter";
import {ConnectionVariableParameter} from "../parameter/ConnectionVariableParameter";
import {
    DataFieldParameter,
    DatasetParameter,
    DatasetReadOnly,
    ForLoopLoopsParameter,
    NodeConnectedNodesParameter,
    NodeFormulaParameterContainer
} from "../parameter";
import {NodeDataParametersContainer} from "../parameter/data/NodeDataParametersContainer";
import {GeneralLoopChildrenNodesParameter} from "../parameter/generalLoop";
import {GeneralLoopEditLoopButton} from "../parameter/generalLoop/GeneralLoopEditLoopButton";
import {ChainConnectionParametersContainer} from "../parameter/chainConnection/ChainConnectionParametersContainer";
import {NodeEventTriggerParametersContainer} from "../parameter/eventTrigger";


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
            <Grid container columns={9} gap={1} sx={{
                maxWidth: '100%',
            }}>

                <ElementNameParameter elementData={selectedElementData}/>
                {selectedElementData.elementType === EElementType.Node &&
                    <NodeTagParameter nodeData={selectedElementData}/>}

                {selectedElementData.elementType === EElementType.Node &&
                    selectedElementData.type === EDiagramNode.Data &&
                    <NodeDataParametersContainer nodeData={selectedElementData}/>}

                {selectedElementData.type === EConnection.ChainConnection &&
                    <ChainConnectionParametersContainer edgeData={selectedElementData}/>}
                {selectedElementData.type === EDiagramNode.Formula
                    && <NodeFormulaParameterContainer nodeData={selectedElementData}/>}
                {selectedElementData.type === EDiagramNode.EventTrigger
                    && <NodeEventTriggerParametersContainer nodeData={selectedElementData}/>}
                {'trigger' in selectedElementData && <NodeTriggerModeParameter nodeData={selectedElementData}/>}
                {selectedElementData.type === EDiagramNode.MicroLoop
                    && <ForLoopLoopsParameter nodeData={selectedElementData}/>}
                {'actionMode' in selectedElementData && <NodeActionParameter node={selectedElementData}/>}
                {selectedElementData.elementType === EElementType.Node
                    && selectedElementData.type === EDiagramNode.DatasetDatafield
                    && <DatasetParameter nodeData={selectedElementData}/>}
                {selectedElementData.elementType === EElementType.Node
                    && selectedElementData.type === EDiagramNode.DatasetDatafield
                    && <DataFieldParameter nodeData={selectedElementData}/>}
                {selectedElementData.elementType === EElementType.Node
                    && selectedElementData.type === EDiagramNode.DatasetDatafield
                    && <DatasetReadOnly nodeData={selectedElementData}/>}
                {selectedElementData?.type === EConnection.DataConnection &&
                    <ConnectionFormulaParameter connection={selectedElementData}/>}
                {selectedElementData.elementType === EElementType.Connection
                    &&
                    <ConnectionTypeParameter selectedElementData={selectedElementData as IDiagramConnectionData}/>}
                {selectedElementData?.type === EConnection.LogicConnection &&
                    <ConnectionVariableParameter selectedElementData={selectedElementData}/>}
                {selectedElementData.elementType === EElementType.Node
                    && <NodeConnectedNodesParameter baseNodeData={selectedElementData}/>}
                {(selectedElementData.type === EDiagramNode.MicroLoop || selectedElementData.type === EDiagramNode.WhileLoop)
                    && <GeneralLoopChildrenNodesParameter nodeData={selectedElementData}/>}
                {(selectedElementData.type === EDiagramNode.MicroLoop || selectedElementData.type === EDiagramNode.WhileLoop)
                    && <GeneralLoopEditLoopButton nodeData={selectedElementData}/>}
            </Grid>
        </BaseSection>
    );
};
