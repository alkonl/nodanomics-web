import React from 'react';
import {BasePopUp} from "../../../popUp";
import {Dialog} from "@headlessui/react";
import {LayerDelete} from "../LayerDelete";
import {IDiagramLayer} from "../../../../interface";

export const DiagramLayerDeletePopUp: React.FC<{
    isShow: boolean;
    onClose: () => void;
    layer: IDiagramLayer;
}> = ({isShow, onClose, layer}) => {
    return (
        <Dialog open={isShow} onClose={onClose}>
            <BasePopUp>
                <Dialog.Panel>
                    <LayerDelete layer={layer}/>
                </Dialog.Panel>
            </BasePopUp>
        </Dialog>
    );
};

