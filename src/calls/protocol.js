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
  

// GET (all) /protocol
export const fetchProtocols = (query) => fetch(endpoint + '/protocol?' + queryToQueryString(query))
  .then(res => res.json()).then(res => res.msg)

// POST /protocol
export const createProtocol = data => fetchWithData(endpoint + '/protocol', 'POST', data)

// PUT /protocol
export const updateProtocol = (_id, data) => fetchWithData(endpoint + '/protocol', 'PUT', { _id, data })

// DELETE /protocol
export const deleteProtocol = _id => fetchWithData(endpoint + '/protocol', 'DELETE', { _id })
