import { endpoint } from "../constants"

const queryToQueryString = query => Object.keys(query)
  .map(key => (key + '=' + query[key].split(" ").join("+")))
  .join('&');

const fetchWithData = (url = '', method = 'GET', body = {}) => fetch(url,
  {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  

// GET (all) /model
export const fetchModels = (query) => fetch(endpoint + '/model?' + queryToQueryString(query))
  .then(res => res.json()).then(res => res.msg)

// POST /model
export const createModel = data => fetchWithData(endpoint + '/model', 'POST', data)

// PUT /model
export const updateModel = (_id, data) => fetchWithData(endpoint + '/model', 'PUT', { _id, data })

// DELETE /model
export const deleteModel = _id => fetchWithData(endpoint + '/model', 'DELETE', { _id })
