import React from 'react';
import styles from './TopToolBar.module.scss';
import {EDiagramNode, IDiagramNodePreview} from "../../../../interface";
import {NodePreviewSVG} from "../../../../assets";
import {TopToolBarElement} from "./TopToolBarElement";


const mockDiagramNodes: IDiagramNodePreview[] = [
    {
        name: EDiagramNode.Source,
        type: EDiagramNode.Source,
        preview: {
            Component: NodePreviewSVG.Source,
            type: 'Component',
        }
    },
    {
        name: EDiagramNode.Drain,
        type: EDiagramNode.Drain,
        preview: {
            Component: NodePreviewSVG.Drain,
            type: 'Component',
        }
    },
    {
        name: EDiagramNode.Pool,
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
                <TopToolBarElement key={node.name} {...node}/>
            ))}
        </div>
    );
};
