import React, {useState} from 'react';
import {Box, Popover} from "@mui/material";
import {DiagramEditorContextMenu} from "../../DiagramEditorContextMenu";
import type {NodeProps} from "reactflow";
import {INodeData} from "../../../../interface";
import {EColor} from "../../../../constant";

export const ContextMenuContainer: React.FC<{
    children: React.ReactNode,
    node: NodeProps<INodeData>
}> = ({children, node}) => {
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
                sx={{
                    backgroundColor: 'transparent',
                    borderRadius: 22,
                    padding: 2,
                }}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: 'transparent',
                        }
                    }
                }}

                anchorOrigin={{
                    vertical: 20,
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <DiagramEditorContextMenu node={node.data}/>
            </Popover>

            {children}
        </Box>


    );
};

