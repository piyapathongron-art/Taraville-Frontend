import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';
dayjs.locale('th');
dayjs.extend(buddhistEra);




function formattedDate(date) {
    const result = dayjs(date).format('DD MMMM BBBB')
    return result
}

export default formattedDate
