import React from 'react';
import {DiagramElementPreviewToolbar, EDiagramNode, EElementType} from "../../../../interface";
import {Box} from "@mui/material";
import {EColor} from "../../../../constant";
import {ElementToolbarSection} from "./ElementToolbarSection";


export enum EElementShow {
    Node = 'Node',
    // Connection = 'Connection',
    Event = 'Event',
    Logic = 'Logic',
}

const mockDiagramNodes: DiagramElementPreviewToolbar = {
    [EElementShow.Node]: [
        {
            elementType: EElementType.Node,
            type: EDiagramNode.DatasetDatafield,
            tooltip: 'Dataset',
            toolbarName: 'DS',
        },
        {
            elementType: EElementType.Node,
            type: EDiagramNode.Data,
            tooltip: 'Data',
            toolbarName: 'D',
        },
        {
            elementType: EElementType.Node,
            type: EDiagramNode.Origin,
            tooltip: 'Origin',
            toolbarName: 'O',
        }, {
            elementType: EElementType.Node,
            type: EDiagramNode.Sink,
            tooltip: 'Sink',
            toolbarName: 'S',
        }, {
            elementType: EElementType.Node,
            type: EDiagramNode.Formula,
            tooltip: 'Formula',
            toolbarName: 'F',
        }, {
            elementType: EElementType.Node,
            type: EDiagramNode.Transfer,
            tooltip: 'Transfer',
            toolbarName: 'T',
        }, {
            elementType: EElementType.Node,
            type: EDiagramNode.Label,
            tooltip: 'Label',
            toolbarName: 'L',
        }
    ],
    [EElementShow.Logic]: [{
        elementType: EElementType.Node,
        type: EDiagramNode.MicroLoop,
        tooltip: 'Micro Loop',
        toolbarName: 'M',
    }, {
        elementType: EElementType.Node,
        type: EDiagramNode.WhileLoop,
        tooltip: 'While Loop',
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
    // [EElementType.Connection]: [
    //     {
    //         elementType: EElementType.Connection,
    //         type: EConnection.LogicConnection,
    //         tooltip: '2',
    //         toolbarName: '2',
    //     }],

}

export const ElementToolbar = () => {
    const formatted = Object.entries(mockDiagramNodes);

    return (
        <>
            <Box sx={{
                pointerEvents: 'auto',
                display: 'flex',
                gap: 1,
                borderRadius: 2,
                backgroundColor: EColor.darkMarineLight,
                borderStyle: 'solid',
                borderWidth: 2,
                px: 3,
                py: 2,
            }}>
                {formatted.map(([sectionName, elements]) => {
                    return <ElementToolbarSection
                        key={sectionName}
                        section={{
                            elements,
                            name: sectionName
                        }}
                    />
                })}
            </Box>
        </>
    );
};
