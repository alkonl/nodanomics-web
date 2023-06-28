import React from 'react';
import styles from './TopToolBar.module.scss';
import {EDiagramNode, EElementType, IDiagramElementPreviewTooltip} from "../../../../interface";
import {NodePreviewSVG} from "../../../../assets";
import {TopToolBarElement} from "./TopToolBarElement";


const mockDiagramNodes: IDiagramElementPreviewTooltip[] = [
    {
        elementType: EElementType.Node,
        tooltip: EDiagramNode.Source,
        type: EDiagramNode.Source,
        preview: {
            Component: NodePreviewSVG.Source,
            type: 'Component',
        }
    },
    {
        elementType: EElementType.Node,
        tooltip: EDiagramNode.Drain,
        type: EDiagramNode.Drain,
        preview: {
            Component: NodePreviewSVG.Drain,
            type: 'Component',
        }
    },
    {
        elementType: EElementType.Node,
        tooltip: EDiagramNode.Pool,
        type: EDiagramNode.Pool,
        preview: {
            Component: NodePreviewSVG.Pool,
            type: 'Component',
        }
    }
]
export const TopToolBar = () => {
    return (
        <div className={styles.topToolbarContainer}>
            {mockDiagramNodes.map((node) => (
                <TopToolBarElement key={node.tooltip} {...node}/>
            ))}
        </div>
    );
};
