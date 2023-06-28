import React, {useState} from 'react';
import {Button} from "@mui/material";
import {NewDiagramPopUp} from "../../popUp/NewDiagramPopUp";

export const NewDiagramButton = () => {
    const [isCreateDiagramPopUpShow, setIsCreateDiagramPopUpShow] = useState(false)

    const closeNewDiagramPopUp = () => {
        setIsCreateDiagramPopUpShow(false)
    }
    const openNewDiagramPopUp = () => {
        setIsCreateDiagramPopUpShow(true)
    }
    return (
        <>
            <NewDiagramPopUp isShow={isCreateDiagramPopUpShow} onClose={closeNewDiagramPopUp}/>
            <Button onClick={openNewDiagramPopUp}>
                New diagram
            </Button>
        </>
    );
};
