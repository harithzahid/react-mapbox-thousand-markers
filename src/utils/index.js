import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

export const formatDate = (date, format='MMMM Do, YYYY') => {
  const dateFormat = dayjs.extend(advancedFormat);
  return dateFormat(date).format(format);
};

export function objectToString(obj, separator='') {
  return Object.keys(obj).reduce((total, current) => {
    if (obj[current]) {
      return total.length > 0
        ? obj[current] + separator + total
        : obj[current]
    }
  }, '');
}
