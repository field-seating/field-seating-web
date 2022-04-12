import { path } from 'ramda';

export const getDataFromSuccessfulApiEvent = path(['data', 'data']);
export const getDataFromFailurefulApiEvent = path(['data', 'response', 'data']);
