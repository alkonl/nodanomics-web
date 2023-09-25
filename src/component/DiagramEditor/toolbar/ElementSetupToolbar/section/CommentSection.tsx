import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import {IDiagramBaseInteractiveElementData} from "../../../../../interface";
import {useToggle} from "../../../../../hooks";
import {BaseSection} from "./BaseSection";
import {ElementCommentParameter} from "../parameter/generic";

export const CommentSection: React.FC<{
    element: IDiagramBaseInteractiveElementData
}> = ({element}) => {

    const accordionController = useToggle()

    useEffect(() => {
        accordionController.open()
    }, [element])

    return (
        <BaseSection
            isOpen={accordionController.isOpened}
            toggle={accordionController.toggle}
            title="Style">
            <Grid container columns={9} gap={1}>
                <ElementCommentParameter element={element}/>
            </Grid>
        </BaseSection>
    );
};
