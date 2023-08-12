export enum EUploadSpreadSheetRequestType {
    File = "File",
    GoogleSpreadsheetId = "GoogleSpreadsheetId"
}

export type IUploadSpreadSheetRequest = {
    type: EUploadSpreadSheetRequestType.File;
    projectId: string;
    file: File;
} | {
    type: EUploadSpreadSheetRequestType.GoogleSpreadsheetId;
    projectId: string;
    googleSpreadsheetId: string;
}
