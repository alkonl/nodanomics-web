import React from 'react';
import {Button, Card, Typography, Grid} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {IBaseDiagram} from '../../../interface';
import {ELinks} from "../../../service/router";

export const DiagramListItem: React.FC<{
    diagram: IBaseDiagram,
}> = ({diagram: {id, name}}) => {
    const navigate = useNavigate()

    return (
        <Link to={`${ELinks.diagram}/${id}`}>
            <Card
                sx={{
                    padding: '6px',
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '10px'
                }}
            >
                <Typography>
                    {name}
                </Typography>
                <Button>
                    Open
                </Button>
            </Card>
        </Link>
    );
};
