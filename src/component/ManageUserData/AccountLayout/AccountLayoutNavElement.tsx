import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {ELinks} from "../../../service";

export const AccountLayoutNavElement: React.FC<{
    page: {
        name: string;
        link: ELinks;
    }
    isActive: boolean;
    onSelect: (link: ELinks) => void;
}> = ({page, isActive, onSelect}) => {

    const onClick = () => {
        onSelect(page.link)
    }

    return (
        <Link to={page.link}>
            <Button
                onClick={onClick}
                variant="outlined"
                sx={{
                    borderWidth: 2,
                    borderBottomWidth: 0,
                    borderColor: 'text.primary',
                    borderRadius: 0,
                    px: 3,
                    py: 0.5,
                    backgroundColor: isActive ? 'text.primary' : 'transparent',
                }}
            >
                {page.name}
            </Button>
        </Link>
    );
};
