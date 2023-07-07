import React from 'react';
import {Link} from "react-router-dom";
import {Box, Button} from "@mui/material";
import {ELinks} from "../../../../service";

export const LandingHeaderNavListItem: React.FC<{
    name: string,
    link: ELinks,
    isSelected: boolean,
    setSelected: (name: ELinks) => void,
}> = ({
          name,
          setSelected,
          isSelected,
          link
      }) => {

    const onClick = () => {
        setSelected(link)
    }

    return (
        <Link to={link} key={name}>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                height: '100%',
            }}>
                <Button
                    onClick={onClick}
                    sx={{
                        display: 'block'
                    }}
                    size="small"
                >
                    {name}
                </Button>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: 2,
                        backgroundColor: isSelected ? 'text.secondary' : 'transparent',
                        borderRadius: 2,
                    }}
                />
            </Box>
        </Link>
    );
};
