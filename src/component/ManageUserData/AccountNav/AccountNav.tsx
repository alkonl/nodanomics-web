import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {ELinks} from "../../../service";
import {AccountLayoutNavElement} from "./AccountLayoutNavElement";
import {useCurrentPath} from "../../../hooks/useCurrentPath";

const accountPages = [
    {
        name: 'Plan',
        link: ELinks.accountPlan,
    }, {
        name: 'Billing',
        link: ELinks.accountBilling,
    }, {
        name: 'NFT',
        link: ELinks.accountNFT,
    }, {
        name: 'Settings',
        link: ELinks.accountSettings,
    }];

export const AccountNav = () => {

    const [activePage, setActivePage] = useState<ELinks>();
    const currentPath = useCurrentPath()

    useEffect(() => {
        setActivePage(location.pathname as ELinks)
    }, [currentPath])

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
            }}
        >
            {accountPages.map((page) => (
                <AccountLayoutNavElement
                    key={page.name}
                    page={page}
                    isActive={activePage === page.link}
                    onSelect={setActivePage}
                />
            ))}
        </Box>
    );
};
