import {IGroupedItems} from "../interface";
import {EDateMarker} from "../constant";
import moment from "moment";

const groupValue: {
    [key in EDateMarker]: number
} = {
    [EDateMarker.DAY]: 1,
    [EDateMarker.WEEK]: 7,
    [EDateMarker.MONTH]: 30,
    [EDateMarker.YEAR]: 365,
    [EDateMarker.OLDER]: Infinity,
}

export const addToGroup = <T>(params: { allGroups: IGroupedItems<T>, item: T, addTo: EDateMarker }) => {
    const {allGroups, item, addTo} = params
    const group = allGroups.find(({group}) => group.name === addTo)
    if (group) {
        group.items.push(item)
    } else {
        allGroups.push({
            group: {
                name: addTo,
                value: groupValue[addTo],
            },
            items: [item]
        })
    }
}

export const groupByDate = <T extends Record<Key, string>, Key extends keyof T>(
    array: T[],
    groupBy: Key
) => {
    return array.reduce((acc: IGroupedItems<T>, item) => {
        const createdAt = moment(item[groupBy])
        const now = moment.now()
        const differenceInDays = Math.abs(createdAt.diff(now, 'days'))
        if (differenceInDays === 0) {
            addToGroup({allGroups: acc, item: item, addTo: EDateMarker.DAY})
        } else if (differenceInDays < 7) {
            addToGroup({allGroups: acc, item: item, addTo: EDateMarker.WEEK})
        } else if (differenceInDays < 30) {
            addToGroup({allGroups: acc, item: item, addTo: EDateMarker.MONTH})
        } else if (differenceInDays < 365) {
            addToGroup({allGroups: acc, item: item, addTo: EDateMarker.YEAR})
        } else {
            addToGroup({allGroups: acc, item: item, addTo: EDateMarker.OLDER})
        }
        return acc
    }, []).sort((a, b) => a.group.value - b.group.value)
}
