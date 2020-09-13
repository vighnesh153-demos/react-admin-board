// Read more here:
// https://marmelab.com/react-admin/Tutorial.html#connecting-to-a-real-api

import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:4242';
const httpClient = fetchUtils.fetchJson;


export default {
  getList: (resource, params) => {
    console.log('getList', params);

    const filters = {};
    if (params.filter.id) {
      filters.ids = [params.filter.id]
    }
    if (params.filter.q) {
      filters.query = params.filter.q;
    }

    const url = `${apiUrl}/${resource}?${stringify({
      filter: JSON.stringify(filters),
      pagination: JSON.stringify(params.pagination),
      sort: JSON.stringify(params.sort),
    })}`;

    return httpClient(url).then(({ json }) => ({
      data: json.users,
      total: json.total,
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({
        ids: params.ids || [],
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    console.log('getManyReference', params);
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids}),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/123`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const deleteRequests = params.ids.map(userId => {
      return httpClient(`${apiUrl}/${resource}/${userId}`, {
        method: 'DELETE',
      });
    })
    return Promise.allSettled(deleteRequests)
      .then(res => ({ data: {} }));
  }
};
