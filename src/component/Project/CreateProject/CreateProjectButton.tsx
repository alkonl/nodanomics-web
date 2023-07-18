import React from 'react';
import {MButton} from "../../base";
import {CreateProjectPopUp} from "../../popUp";
import {useToggle} from "../../../hooks";
import {useNavigate} from "react-router-dom";

export const CreateProjectButton = () => {
    const navigate = useNavigate()
    const createProjectPopUp = useToggle()

    const onClose = ({diagramId}: {
        diagramId: string
    }) => {
        navigate(`/diagram/${diagramId}`)
        createProjectPopUp.close()
    }

    return (
        <>
            <CreateProjectPopUp
                onClose={onClose}
                isShow={createProjectPopUp.isOpened}
            />
            <MButton.Submit onClick={createProjectPopUp.open}>
                Create Project
            </MButton.Submit>
        </>

    );
};
