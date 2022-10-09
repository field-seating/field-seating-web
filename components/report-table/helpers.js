import { prop, propOr, pathOr, compose, filter } from 'ramda';

import Link from 'components/ui/link';

export const properties = [
  {
    label: 'ID',
    resolver: prop('id'),
  },
  {
    label: '回報者ID',
    resolver: propOr('匿名', 'userId'),
  },
  {
    label: '狀態',
    resolver: prop('status'),
  },
  {
    label: '備註',
    resolver: propOr('', 'content'),
  },
  {
    label: '照片網址',
    resolver: compose(
      (url) => (
        <Link size="md" href={url} target="_blank" rel="noopener noreferrer">
          開啟
        </Link>
      ),
      pathOr('無照片', ['dataset', 'lg'])
    ),
  },
];

export const getReports = compose(
  filter((report) => report.status !== 'deleted'),
  propOr([], 'reportPhotos')
);
