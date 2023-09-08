import {EDateMarker} from "../date";

export type IGroupedItems<T> = {
    group: {
        name: EDateMarker
        value: number
    }
    items: T[]
}[]
