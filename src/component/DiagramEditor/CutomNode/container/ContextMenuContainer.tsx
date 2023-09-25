import React, {useState} from 'react';
import {Box, Popover} from "@mui/material";
import {DiagramEditorContextMenu} from "../../DiagramEditorContextMenu";

export const ContextMenuContainer: React.FC<{
    children: React.ReactNode,
}> = ({children}) => {
    const [isContextMenuOpen, setIsContextMenuOpen] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

    const id = isContextMenuOpen ? 'context-menu-popover' : undefined;

    const openContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isContextMenuOpen) {
            setIsContextMenuOpen(true);
            setAnchorEl(event.currentTarget);
        }

    }

    const handleClose = () => {
        setIsContextMenuOpen(false);
    }

    return (
        <Box
            onClick={openContextMenu}
        >
            <Popover
                id={id}

                open={isContextMenuOpen}
                anchorEl={anchorEl}
                onClose={handleClose}

                anchorOrigin={{
                    vertical: 20,
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <DiagramEditorContextMenu id="test"/>
            </Popover>

            {children}
        </Box>


    );
};

