import React from 'react';
import {ElementParameter} from "./ElementParameter";
import {EElementType, IDiagramConnectionData, INodeData} from "../../../../../interface";
import {useUpdateElement} from "../../../../../hooks";
import {ColorPicker} from "../../../../ColorPicker";
import {EColor} from "../../../../../constant";

export const BorderColorParameter: React.FC<{
    elementData: INodeData | IDiagramConnectionData,
}> = ({elementData}) => {

    const {updateEdgeStyle, updateNodeStyle} = useUpdateElement({
        elementId: elementData.id,
        elementType: elementData.elementType,
    })

    const onBorderColorChange = (color?: string) => {
        if (elementData.elementType === EElementType.Node) {
            updateNodeStyle({
                borderColor: color,
            })
        } else if (elementData.elementType === EElementType.Connection) {
            updateEdgeStyle({
                borderColor: color,
            })
        }

    }

    return (
        <ElementParameter label="color">
            <ColorPicker
                onChange={onBorderColorChange}
                value={elementData?.style.borderColor || EColor.white}
            />
        </ElementParameter>
    );
};
