import React from "react";
import {ILoopNodeData} from "../../../../../../interface";
import {ElementParameter} from "../ElementParameter";
import {MButton} from "../../../../../base"
import {useExpandOrCollapse} from "../../../../../../hooks";
import {EColor} from "../../../../../../constant";

export const GeneralLoopEditLoopButton: React.FC<{
    nodeData: ILoopNodeData
}> = ({nodeData}) => {


    const {expandOrCollapse} = useExpandOrCollapse({
        nodeData: nodeData,
    })

    const onClickEditLoop = () => {
        expandOrCollapse()
    }

    return (
        <ElementParameter label="Children Nodes">
            <MButton.Submit
                onClick={onClickEditLoop}
                sx={{
                    width: '100%',
                    height: '100%',
                    borderColor: EColor.black,
                    borderStyle: 'solid',
                    borderWidth: 2,
                }}
            >
                Edit Loop
            </MButton.Submit>
        </ElementParameter>
    );
};
