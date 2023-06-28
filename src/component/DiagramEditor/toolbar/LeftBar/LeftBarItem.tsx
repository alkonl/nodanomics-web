import React from 'react';
import { Button, Tooltip} from "@mui/material";
import {ELeftToolbarSideMenu} from "../../../../interface";

export const LeftBarItem: React.FC<{
    name: ELeftToolbarSideMenu;
    onClick: (name: ELeftToolbarSideMenu) => void;
    Component: React.FC;
}> = ({name, onClick, Component}) => {

    const onClickHandler = () => {
        onClick(name);
    }

    return (
        <Tooltip title={name}>
            <Button
                onClick={onClickHandler}
            >
                <Component/>
            </Button>
        </Tooltip>
    );
};

