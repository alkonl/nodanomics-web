import React from 'react';
import {Button, Tooltip} from "@mui/material";
import {ELeftToolbarSideMenu} from "../../../../interface";

export const LeftBarItem: React.FC<{
    name: ELeftToolbarSideMenu;
    onClick: (name: ELeftToolbarSideMenu) => void;
    Component: React.FC;
    isSelected: boolean;
}> = ({name, onClick, Component, isSelected}) => {

    const onClickHandler = () => {
        onClick(name);
    }

    return (
        <Tooltip title={name}>
            <Button
                style={{
                    minWidth: '100%',
                    padding: 3,
                    margin: 0,
                }}
                variant={isSelected ? 'outlined' : 'text'}
                onClick={onClickHandler}
            >
                <Component/>
            </Button>
        </Tooltip>
    );
};

