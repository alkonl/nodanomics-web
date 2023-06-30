import React from 'react';
import {Menu, MenuItem} from "@mui/material";
import {useSimplePopUpManager} from "../../../hooks/useSimplePopUpManager";
import {DiagramManagerPopUp} from "../../popUp/NewDiagramPopUp";
import {EDiagramManagerType} from "../../form";

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

    const {
        openPopUp: openRenameDiagramPopUp,
        closePopUp: closeRenameDiagramPopUp,
        isPopUpShow: isRenameDiagramPopUpShow
    } = useSimplePopUpManager()

    const buttons: {
        name: string
        onClick: () => void
    }[] = [{
        name: 'New',
        onClick: openNewDiagramPopUp
    }, {
        name: 'Open-',
        onClick: () => {
        }
    }, {
        name: 'Save-',
        onClick: () => {
        }
    }, {
        name: 'Rename',
        onClick: openRenameDiagramPopUp
    }, {
        name: 'Make a copy-',
        onClick: () => {
        }
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
            <DiagramManagerPopUp type={EDiagramManagerType.new} isShow={isNewDiagramPopUpShow}
                                 onClose={closeNewDiagramPopUp}/>
            <DiagramManagerPopUp type={EDiagramManagerType.rename} isShow={isRenameDiagramPopUpShow}
                                 onClose={closeRenameDiagramPopUp}/>
            {buttons.map((button) => (<MenuItem
                onClick={button.onClick}
                key={button.name}
            >{button.name}</MenuItem>))}
        </Menu>
    );
};
