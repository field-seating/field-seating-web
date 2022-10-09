import { prop, propOr, pathOr, compose, filter, propEq } from 'ramda';

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
    label: '照片ID',
    resolver: compose(
      (photoId) => (
        <Link
          size="md"
          href={`/photos/${photoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {photoId}
        </Link>
      ),
      prop('photoId')
    ),
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
  filter(propEq('status', 'pending')),
  propOr([], 'reportPhotos')
);
