import {EDateMarker} from "./DateMarker";

export const dataMarkerTitle: {
    [key in EDateMarker]: string
} = {
    [EDateMarker.DAY]: 'Today',
    [EDateMarker.WEEK]: 'Last Week',
    [EDateMarker.MONTH]: 'Last Month',
    [EDateMarker.YEAR]: 'Last Year',
    [EDateMarker.OLDER]: 'Older',
}
