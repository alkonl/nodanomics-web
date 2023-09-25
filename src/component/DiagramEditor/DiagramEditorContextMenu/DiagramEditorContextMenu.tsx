import React from 'react';
import {Box} from "@mui/material";

export const DiagramEditorContextMenu: React.FC<{
    id: string,

}> = ({id,}) => {
    return (
        <Box sx={{
            width: 200,
            height: 200,
            backgroundColor: 'red',
        }}>
            node id: {id}
        </Box>
    );
};
