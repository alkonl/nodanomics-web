import React, {useMemo} from "react";
import styles from './LeftToolbar.module.scss';
import {Box, Typography, Popover} from "@mui/material";
import {Svg} from "../../../../assets";
import {LeftToolbarItem} from "./LeftToolbarItem";
import {SideMenu} from "./SideMenu";
import {ELeftToolbarSideMenu} from "../../../../interface";
import {PreviewNodeHierarchy} from "./PreviewComponent";


const menuOptions: {
    name: ELeftToolbarSideMenu;
    preview: {
        type: 'Component';
        Component: React.FC;
    }
}[] = [
    {
        name: ELeftToolbarSideMenu.LibrariesSideMenu,
        preview: {
            type: 'Component',
            Component: Svg.Library
        }
    },
    {
        name: ELeftToolbarSideMenu.CustomVariablesSideMenu,
        preview: {
            type: 'Component',
            Component: Svg.Variable
        }
    }, {
        name: ELeftToolbarSideMenu.GroupedNodes,
        preview: {
            type: 'Component',
            Component: () => <Typography>G</Typography>
        }
    }, {
        name: ELeftToolbarSideMenu.NodeHierarchy,
        preview: {
            type: 'Component',
            Component: PreviewNodeHierarchy
        }
    }, {
        name: ELeftToolbarSideMenu.LayersManagement,
        preview: {
            type: 'Component',
            Component: () => <Typography>L</Typography>
        }
    }
]

export function LeftToolbar() {
    const [selectedSideMenu, setSelectedSideMenu] = React.useState<ELeftToolbarSideMenu | undefined>(undefined);
    const [isSideMenuOpen, setIsSideMenuOpen] = React.useState<boolean>(false);

    const SelectedSideMenu = useMemo(() => {
        if (selectedSideMenu === undefined) {
            return undefined;
        }
        return SideMenu[selectedSideMenu];
    }, [selectedSideMenu])
    const onSelectSideMenu = (sideMenuName: ELeftToolbarSideMenu) => {
        setSelectedSideMenu(sideMenuName);
        if (sideMenuName === selectedSideMenu) {
            setIsSideMenuOpen(false);
            setSelectedSideMenu(undefined);
        } else {
            setIsSideMenuOpen(true);
        }
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const id = isSideMenuOpen ? 'simple-popover' : undefined;

    const handleClose = () => {
        setIsSideMenuOpen(false);
        setSelectedSideMenu(undefined);
    }

    return (
        <Box sx={{
            display: 'flex',
            height: '90%',
        }}>
            <Box
                onMouseEnter={(event) => {
                    setAnchorEl(event.currentTarget);
                }}
                sx={{
                    width: 60,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '25px',
                    paddingTop: '20px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                    pointerEvents: 'none',
                }}
            >
                {menuOptions.map((option) => {
                    const isSelected = option.name === selectedSideMenu;
                    return (
                        <LeftToolbarItem
                            isSelected={isSelected}
                            onClick={onSelectSideMenu}
                            name={option.name}
                            Component={option.preview.Component}
                            key={option.name}
                        />)
                })}
            </Box>
            <Popover
                id={id}
                open={isSideMenuOpen}
                anchorEl={anchorEl}
                onClose={handleClose}

                anchorOrigin={{
                    vertical: 20,
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <>
                    {SelectedSideMenu && <SelectedSideMenu/>}
                </>
            </Popover>



        </Box>
    );
}
