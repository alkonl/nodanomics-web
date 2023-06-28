import React from "react";

export enum EDiagramNode {
    Source = 'Source',
    Drain = 'Drain',
    Pool = 'Pool',
    Gate = 'Gate',
}

export interface IBaseDiagramNode {
    type: EDiagramNode;
    name: string;
}

export interface IDiagramNodePreview extends IBaseDiagramNode {
    preview: {
        type: 'Component';
        Component: React.FC;
    };
}
