import React from 'react';
import {MButton} from "../../base";
import {CreateProjectPopUp} from "../../popUp";
import {useToggle} from "../../../hooks";

export const CreateProjectButton = () => {
    const createProjectPopUp = useToggle()

    return (
        <>
            <CreateProjectPopUp
                onClose={createProjectPopUp.close}
                isShow={createProjectPopUp.isExpanded}
            />
            <MButton.Submit onClick={createProjectPopUp.open}>
                Create Project
            </MButton.Submit>
        </>

    );
};
