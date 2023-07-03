export enum EFontStyle {
    Bold = 'Bold',
    Italic = 'Italic',
    Underline = 'Underline',
}

export enum EFontAlign {
    Left = 'Left',
    Center = 'Center',
    Right = 'Right',
}

export interface IDiagramTextStyle {
    fontFamily: string;
    fontSize: number;
    fontColor: string;
    fontStyles: EFontStyle[]
    fontAlign: EFontAlign;
}
