import moment from "moment";
import {serverBaseUrl} from '../common/constant'
export const handleTime  = (value) => {
    var date = moment.parseZone(value).local().format('YYYY-MM-DD HH:mm:ss');
    return date;
}

export const prefix = (url) => {
    if (url && url.startsWith('http')) {
      return url
    } else {
      url = `${serverBaseUrl}${url}`
      return url
    }
}