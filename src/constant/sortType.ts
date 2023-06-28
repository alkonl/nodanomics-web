import {ESortType} from "../interface";

export const sortTypesText: { [key in ESortType]: string } = {
    [ESortType.NameA2Z]: 'Name A-Z',
    [ESortType.NameZ2A]: 'Name Z-A',
    [ESortType.NewestCreated]: 'Newest Created',
    [ESortType.OldestCreated]: 'Oldest Created',
    [ESortType.NewestModified]: 'Newest Modified',
    [ESortType.OldestModified]: 'Oldest Modified',
}
