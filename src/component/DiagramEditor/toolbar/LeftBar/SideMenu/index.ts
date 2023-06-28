import {ELeftToolbarSideMenu} from "../../../../../interface";
import {LibrariesSideMenu} from "./LibrariesSideMenu";
import {CustomVariablesSideMenu} from "./CustomVariablesSideMenu";




export const SideMenu = {
    [ELeftToolbarSideMenu.LibrariesSideMenu]: LibrariesSideMenu,
    [ELeftToolbarSideMenu.CustomVariablesSideMenu]: CustomVariablesSideMenu,
}
