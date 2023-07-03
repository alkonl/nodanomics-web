import React from 'react';
import {Box} from "@mui/material";
import {useGetDiagramsByUserIdQuery} from "../../../api";
import {DiagramListItem} from './DiagramListItem';
import {IBaseDiagram} from "../../../interface";

export const DiagramList: React.FC<{
    diagrams: IBaseDiagram[]
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
