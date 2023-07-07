import React from 'react';
import {Button, Card, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {ELinks} from "../../../service";
import {IBaseProject} from "../../../interface";

export const DiagramListItem: React.FC<{
    diagram: IBaseProject,
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
