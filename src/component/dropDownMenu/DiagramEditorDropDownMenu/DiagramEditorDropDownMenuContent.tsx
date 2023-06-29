import React, {useState} from 'react';
import {Box, Menu, MenuItem} from "@mui/material";
import {useSimplePopUpManager} from "../../../hooks/useSimplePopUpManager";
import {DiagramManagerPopUp} from "../../popUp/NewDiagramPopUp";

export const DiagramEditorDropDownMenuContent: React.FC<{
    anchorEl: HTMLElement | null
    close: () => void
}> = ({
          anchorEl,
          close
      }) => {
    const {
        openPopUp: openNewDiagramPopUp,
        closePopUp: closeNewDiagramPopUp,
        isPopUpShow: isNewDiagramPopUpShow
    } = useSimplePopUpManager()

    const onCloseNewDiagramPopUp = () =>{

    }

    const buttons: {
        name: string
        onClick: () => void
    }[] = [{
        name: 'New',
        onClick: openNewDiagramPopUp
    },{
        name: 'Open-',
        onClick: () => {}
    },{
        name: 'Save-',
        onClick: () => {}
    },{
        name: 'Rename-',
        onClick: () => {}
    },{
        name: 'Make a copy-',
        onClick: () => {}
    }]

    return (
        <Menu
            sx={{mt: '25px'}}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={close}
        >
            <DiagramManagerPopUp type="new" isShow={isNewDiagramPopUpShow} onClose={closeNewDiagramPopUp}/>
            {buttons.map((button) => (<MenuItem
                onClick={button.onClick}
                key={button.name}
            >{button.name}</MenuItem>))}
        </Menu>
    );
};
