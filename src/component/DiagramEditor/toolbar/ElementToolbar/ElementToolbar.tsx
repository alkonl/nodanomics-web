import React from 'react';
import {
    DiagramElementPreviewToolbar,
    EConnection,
    EDiagramNode,
    EElementType,
    ELogic
} from "../../../../interface";
import {Box} from "@mui/material";
import {EColor} from "../../../../constant";
import {ElementToolbarSection} from "./ElementToolbarSection";
import {useInvokeStep, useResetDiagramRun} from "../../../../hooks";
import {MButton} from '../../../base';


export enum EElementShow {
    Node = 'Node',
    Connection = 'Connection',
    Event = 'Event',
    Logic = 'Logic',
}
const mockDiagramNodes: DiagramElementPreviewToolbar = {
    [EElementShow.Node]: [{
        elementType: EElementType.Node,
        type: EDiagramNode.StaticVariable,
        tooltip: 'Static Variable',
        toolbarName: 'SV',
    },
    //     {
    //     elementType: EElementType.Node,
    //     type: EDiagramNode.D,
    //     tooltip: 'no',
    //     toolbarName: 'D',
    // },
        {
        elementType: EElementType.Node,
        type: EDiagramNode.Source,
        tooltip: 'no',
        toolbarName: 'S',
    }, {
        elementType: EElementType.Node,
        type: EDiagramNode.Formula,
        tooltip: 'Formula',
        toolbarName: 'F',
    },
    //     {
    //     elementType: EElementType.Node,
    //     type: EDiagramNode.DOWN,
    //     tooltip: 'Variable',
    //     toolbarName: 'Do',
    // },
        {
        elementType: EElementType.Node,
        type: EDiagramNode.Variable,
        tooltip: 'Variable',
        toolbarName: 'V',
    }],
    [EElementShow.Logic]: [{
        elementType: EElementType.Node,
        type: ELogic.M,
        tooltip: 'M',
        toolbarName: 'M',
    }, {
        elementType: EElementType.Node,
        type: ELogic.W,
        tooltip: 'W',
        toolbarName: 'W',
    }],
    [EElementShow.Event]: [{
        elementType: EElementType.Node,
        type: EDiagramNode.EventTrigger,
        tooltip: 'Trigger',
        toolbarName: 'T',
    }, {
        elementType: EElementType.Node,
        type: EDiagramNode.EventListener,
        tooltip: 'Listener',
        toolbarName: 'L',
    }],
    [EElementType.Connection]: [
    //     {
    //     elementType: EElementType.Connection,
    //     type: EDiagramNode.ConnectionNode,
    //     tooltip: 'Con',
    //     toolbarName: 'Con',
    // },
        {
        elementType: EElementType.Connection,
        type: EConnection.LogicConnection,
        tooltip: '2',
        toolbarName: '2',
    }],

}

export const ElementToolbar = () => {
    const formated = Object.entries(mockDiagramNodes);

    const {toggleStepInterval, isRunning, runStep} = useInvokeStep();
    const {resetDiagramRun} = useResetDiagramRun();

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
            <MButton.Submit onClick={resetDiagramRun}>
                Reset
            </MButton.Submit>
        </Box>
    );
};
