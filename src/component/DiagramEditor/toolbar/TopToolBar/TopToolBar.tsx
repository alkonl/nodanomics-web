import React from 'react';
import styles from './TopToolBar.module.scss';
import {EDiagramNode, IDiagramNodePreview} from "../../../../interface";
import {nodePreviewSVG} from "../../../../assets";
import {TopToolBarElement} from "./TopToolBarElement";


const mockDiagramNodes: IDiagramNodePreview[] = [
    {
        name: EDiagramNode.Source,
        type: EDiagramNode.Source,
        preview: {
            Component: nodePreviewSVG.source,
            type: 'Component',
        }
    },
    {
        name: EDiagramNode.Drain,
        type: EDiagramNode.Drain,
        preview: {
            Component: nodePreviewSVG.drain,
            type: 'Component',
        }
    },
    {
        name: EDiagramNode.Drain,
        type: EDiagramNode.Pool,
        preview: {
            Component: nodePreviewSVG.pool,
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
