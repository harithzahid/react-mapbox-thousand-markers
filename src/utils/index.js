import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

export const formatDate = (date, format='MMMM Do, YYYY') => {
  const dateFormat = dayjs.extend(advancedFormat);
  return dateFormat(date).format(format);
};
