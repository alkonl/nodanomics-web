import React from 'react';
import {
    DiagramElementPreviewToolbar,
    EConnection,
    EDiagramNode,
    EElementType,
    EEvent,
    ELogic
} from "../../../../interface";
import {Box} from "@mui/material";
import {EColor} from "../../../../constant";
import {ElementToolbarSection} from "./ElementToolbarSection";
import {useInvokeStep, useResetDiagramRun} from "../../../../hooks";
import {MButton} from '../../../base';

const mockDiagramNodes: DiagramElementPreviewToolbar = {
    [EElementType.Node]: [{
        elementType: EElementType.Node,
        type: EDiagramNode.Variable,
        tooltip: 'Variable',
        toolbarName: 'V',
    }, {
        elementType: EElementType.Node,
        type: EDiagramNode.D,
        tooltip: 'no',
        toolbarName: 'D',
    }, {
        elementType: EElementType.Node,
        type: EDiagramNode.Source,
        tooltip: 'no',
        toolbarName: 'S',
    }, {
        elementType: EElementType.Node,
        type: EDiagramNode.Formula,
        tooltip: 'Formula',
        toolbarName: 'F',
    }, {
        elementType: EElementType.Node,
        type: EDiagramNode.DOWN,
        tooltip: 'Variable',
        toolbarName: 'Do',
    }, {
        elementType: EElementType.Node,
        type: EDiagramNode.Pool,
        tooltip: 'Pool',
        toolbarName: 'P',
    }],
    [EElementType.Logic]: [{
        elementType: EElementType.Logic,
        type: ELogic.M,
        tooltip: 'M',
        toolbarName: 'M',
    }, {
        elementType: EElementType.Logic,
        type: ELogic.W,
        tooltip: 'W',
        toolbarName: 'W',
    }],
    [EElementType.Event]: [{
        elementType: EElementType.Event,
        type: EEvent.T,
        tooltip: 'T',
        toolbarName: 'T',
    }, {
        elementType: EElementType.Event,
        type: EEvent.L,
        tooltip: 'L',
        toolbarName: 'L',
    }],
    [EElementType.Connection]: [{
        elementType: EElementType.Connection,
        type: EDiagramNode.ConnectionNode,
        tooltip: 'Con',
        toolbarName: 'Con',
    }, {
        elementType: EElementType.Connection,
        type: EConnection.LogicConnection,
        tooltip: '2',
        toolbarName: '2',
    }, {
        elementType: EElementType.Connection,
        type: EConnection.thirdType,
        tooltip: '3',
        toolbarName: '3',
    }],

}

export const ElementToolbar = () => {
    const formated = Object.entries(mockDiagramNodes);

    const {toggleStepInterval, isRunning, runStep} = useInvokeStep();
    const reset = useResetDiagramRun();

    return (
        <Box sx={{
            pointerEvents: 'auto',
            display: 'flex',
            gap: 1,
            borderColor: EColor.grey2,
            borderStyle: 'solid',
            borderWidth: '1px',
            px: 3,
            py: 2,
            backgroundColor: EColor.white,
        }}>
            {formated.map(([sectionName, elements]) => {
                return <ElementToolbarSection
                    key={sectionName}
                    section={{
                        elements,
                        name: sectionName
                    }}
                />
            })}
            <MButton.Submit
                onClick={runStep}
            >
                Step
            </MButton.Submit>
            <MButton.Submit
                onClick={toggleStepInterval}
            >
                {isRunning ? 'Stop' : 'Start'}
            </MButton.Submit>
            <MButton.Submit onClick={reset}>
                Reset
            </MButton.Submit>
        </Box>
    );
};
