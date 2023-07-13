import React from 'react';
import styles from './TopToolBar.module.scss';
import {EDiagramNode, EElementType, IDiagramElementPreviewToolbarElement} from "../../../../interface";
import {NodePreviewSVG} from "../../../../assets";
import {ElementsToolbarElementDeprecated} from "./TopToolBarElement";


// const mockDiagramNodes: IDiagramElementPreviewToolbarElement[] = [
    // {
    //     elementType: EElementType.Node,
    //     tooltip: EDiagramNode.Variable,
    //     type: EDiagramNode.Variable,
    //     // preview: {
    //     //     Component: NodePreviewSVG.Pool,
    //     //     type: 'Component',
    //     // }
    // },
    // {
    //     elementType: EElementType.Node,
    //     tooltip: EDiagramNode.Drain,
    //     type: EDiagramNode.Drain,
    //     preview: {
    //         Component: NodePreviewSVG.Drain,
    //         type: 'Component',
    //     }
    // },
    // {
    //     elementType: EElementType.Node,
    //     tooltip: EDiagramNode.Pool,
    //     type: EDiagramNode.Pool,
    //     preview: {
    //         Component: NodePreviewSVG.Pool,
    //         type: 'Component',
    //     }
    // }
// ]
export const ElementsToolbarDeprecated = () => {
    return (
        <div className={styles.topToolbarContainer}>
            {/*{mockDiagramNodes.map((node) => (*/}
            {/*    <ElementsToolbarElementDeprecated key={node.tooltip} {...node}/>*/}
            {/*))}*/}
        </div>
    );
};
