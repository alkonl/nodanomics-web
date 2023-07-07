import React from 'react';
import {Box} from "@mui/material";
import {DiagramListItem} from './DiagramListItem';
import {IBaseProject} from "../../../interface/busines/project/project";

export const DiagramList: React.FC<{
    diagrams: IBaseProject[]
}> = ({diagrams}) => {


    return (
        <Box style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '20px'
        }}>
            {diagrams.map(diagram => (
                <Box
                    style={{
                        flex: '0 0 32%'
                    }}
                    key={diagram.id}>
                    <DiagramListItem diagram={diagram}/>
                </Box>
            ))}
        </Box>
    );
};
