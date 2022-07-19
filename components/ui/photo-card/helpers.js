import { compose } from 'ramda';
import format from 'date-fns/fp/format';

export const renderDate = compose(
  format('yyyy-MM-dd'),
  (dateStr) => new Date(dateStr)
);
