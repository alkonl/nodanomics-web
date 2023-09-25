import {ELeftToolbarSideMenu} from "../../../../../interface";
import {LibrariesSideMenu} from "./LibrariesSideMenu";
import {CustomVariablesSideMenu} from "./CustomVariablesSideMenu";
import {GroupedNodes} from "./GroupedNodes";
import {NodeHierarchy} from "./NodeHierarchy";
import {LayersManagement} from "./LayersManagement/LayersManagement";




export const SideMenu: {
    [key in ELeftToolbarSideMenu]: React.FC
} = {
    [ELeftToolbarSideMenu.LibrariesSideMenu]: LibrariesSideMenu,
    [ELeftToolbarSideMenu.CustomVariablesSideMenu]: CustomVariablesSideMenu,
    [ELeftToolbarSideMenu.GroupedNodes]: GroupedNodes,
    [ELeftToolbarSideMenu.NodeHierarchy]: NodeHierarchy,
    [ELeftToolbarSideMenu.LayersManagement]: LayersManagement,
}
