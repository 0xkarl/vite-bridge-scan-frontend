import fetch from 'unfetch';
import qs from 'query-string';

import { API_URL } from '@config';

export async function get(url: string, query?: Record<string, any>) {
  if (query) {
    url += '?' + qs.stringify(query);
  }
  return await (await fetch(API_URL + url)).json();
}
