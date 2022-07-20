import { apiFetcher } from 'lib/fetch';
import useSWR from 'swr';
import qs from 'qs';

export const url = ({ startPhotoId }) => {
  const query = qs.stringify(
    { start_photo: startPhotoId },
    { addQueryPrefix: true }
  );

  return `/api/photos${query}`;
};

const getPhotos = (options) => apiFetcher(url(options));

export const useFetchPhotos = (options) => {
  const { data, error } = useSWR(url(options), apiFetcher);

  return { data, error };
};

export default getPhotos;
