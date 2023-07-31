import {IDiagramTextStyle} from "./font";

export interface IDiagramNodeStyle {
    borderWidth: number;
    borderColor: string;
    fillColor?: string;
    textStyles: IDiagramTextStyle,
}
