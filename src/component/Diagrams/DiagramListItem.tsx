import React from 'react';
import {MView} from "../base";
import {IBaseDiagramInfo} from "../../interface";
import {useNavigate} from "react-router-dom";
import {ELinks} from "../../service";

export const DiagramListItem: React.FC<{
    diagram: IBaseDiagramInfo
}> = ({diagram}) => {
    const navigate = useNavigate()
    const onClick = () => {
        const navLink = `${ELinks.diagram}/${diagram.id}`
        navigate(navLink)
    }
    return (
        <MView.Simple
            onClick={onClick}
            title={diagram.name}
        />
    );
};

