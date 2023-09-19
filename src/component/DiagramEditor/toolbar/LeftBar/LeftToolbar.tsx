import React, {useMemo} from "react";
import styles from './LeftToolbar.module.scss';
import {Box} from "@mui/material";
import {Svg} from "../../../../assets";
import {LeftToolbarItem} from "./LeftToolbarItem";
import {SideMenu} from "./SideMenu";
import {ELeftToolbarSideMenu} from "../../../../interface";
import {BaseSideMenu} from "./SideMenu/BaseSideMenu/BaseSideMenu";
import {useDownloadDiagram} from "../../../../hooks/useDownloadDiagram";
import {useUploadDiagram} from "../../../../hooks";
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
            Component: () => <div>G</div>
        }
    }, {
        name: ELeftToolbarSideMenu.NodeHierarchy,
        preview: {
            type: 'Component',
            Component: PreviewNodeHierarchy
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

    const downloadDiagram = useDownloadDiagram()
    const uploadDiagram = useUploadDiagram()


    return (
        <Box className={styles.container}>
            <Box
                className={styles.buttonList}
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

                   {/*<Box>*/}
                   {/*    <Button*/}
                   {/*        onClick={downloadDiagram}*/}

                   {/*    >*/}
                   {/*        <DownloadIcon sx={{*/}
                   {/*            color: EColor.grey4,*/}
                   {/*        }}/>*/}
                   {/*    </Button>*/}
                   {/*    <Button*/}
                   {/*        component="label"*/}
                   {/*    >*/}
                   {/*        <input type="file" accept=".json" onChange={uploadDiagram} hidden/>*/}
                   {/*        <UploadIcon sx={{*/}
                   {/*            color: EColor.grey4,*/}
                   {/*        }}/>*/}
                   {/*    </Button>*/}
                   {/*</Box>*/}
            </Box>
            <BaseSideMenu isOpen={isSideMenuOpen}>
                {SelectedSideMenu && <SelectedSideMenu/>}
            </BaseSideMenu>
        </Box>
    );
}
