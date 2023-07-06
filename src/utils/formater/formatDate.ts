import moment from "moment";
import 'moment-timezone'


type formatType = 'v1'

export const formatDate = (date: Date, type: formatType): string => {
    if (type === "v1") {
        return moment(date).format('DD/MM/YYYY - hh:mm (UTCZ)')
    } else {
        return moment(date).format('DD/MM/YYYY - hh:mm [UTC-0:00]')
    }
}
