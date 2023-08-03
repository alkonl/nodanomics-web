import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import {IDiagramConnectionData, INodeData} from "../../../../../interface";
import {useToggle} from "../../../../../hooks";
import {BaseSection} from "./BaseSection";
import {BorderColorParameter} from "../parameter/BorderColorParameter";

export const StyleSection: React.FC<{
    element: INodeData | IDiagramConnectionData
}> = ({element}) => {

    const accordionController = useToggle()

    useEffect(() => {
        accordionController.open()
    }, [element])

    return (
        <BaseSection
            isOpen={accordionController.isExpanded}
            toggle={accordionController.toggle}
            title="Style">
            <Grid container columns={9} gap={1}>
                <BorderColorParameter elementData={element}/>
            </Grid>
        </BaseSection>
    );
};
