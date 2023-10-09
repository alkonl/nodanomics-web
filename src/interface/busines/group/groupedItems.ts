import {EDateMarker} from "../../../constant";

export type IGroupedItems<T> = {
    group: {
        name: EDateMarker
        value: number
    }
    items: T[]
}[]
