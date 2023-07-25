import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {LandingHeaderNavListItem} from "./LandingHeaderNavListItem";
import {ELinks} from "../../../../service";
import {useCurrentPath} from "../../../../hooks/useCurrentPath";


const pages = [
    {
        name: 'Projects',
        link: ELinks.projects,
    }, {
        name: 'Teams',
        link: ELinks.team,
    }, {
        name: 'Account',
        link: ELinks.accountManageData,
    }
]

const technicPages = [
    ELinks.authGoogle
]

const allPages = Object.entries(ELinks).map(([key, value]) => ({
    name: key,
    link: value,
})).filter(page => !technicPages.includes(page.link))

export const LandingHeaderNavList: React.FC = () => {
    const [selected, setSelected] = useState<ELinks>()
    const currentPath = useCurrentPath()

    useEffect(() => {
        if (currentPath) {
            const openedPath = pages.find((page) => currentPath.includes(page.link))
            setSelected(openedPath?.link)
        }
    }, [currentPath])
    return (
        <>
            <Box style={{
                display: 'flex',
                flex: 1,
                alignSelf: 'stretch',
            }}>
                {pages.map((page) => (
                    <LandingHeaderNavListItem
                        name={page.name}
                        link={page.link}
                        isSelected={selected === page.link}
                        setSelected={setSelected}
                        key={page.name}
                    />
                ))}


            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
            }}>
                <Typography>
                    All pages:
                </Typography>
                {allPages.map((page) => (
                    <LandingHeaderNavListItem
                        name={page.name}
                        link={page.link}
                        isSelected={selected === page.link}
                        setSelected={setSelected}
                        key={page.name}
                    />
                ))}
            </Box>
        </>
    );
};
