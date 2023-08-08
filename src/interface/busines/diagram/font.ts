export enum EFontStyle {
    Bold = 'Bold',
    Italic = 'Italic',
    Underline = 'Underline',
}

export enum EFontAlign {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

export interface IDiagramTextStyle {
    fontFamily: string;
    fontSize: number;
    fontColor: string;
    // fontStyles: EFontStyle[]
    fontAlign: EFontAlign;
}
