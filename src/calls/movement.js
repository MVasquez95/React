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
  

// GET (all) /movement
export const fetchMovements = (query) => fetch(endpoint + '/movement?' + queryToQueryString(query))
  .then(res => res.json()).then(res => res.msg)

// POST /movement
export const createMovement = data => fetchWithData(endpoint + '/movement', 'POST', data)

// PUT /movement
export const updateMovement = (_id, data) => fetchWithData(endpoint + '/movement', 'PUT', { _id, data })

// DELETE /movement
export const deleteMovement = _id => fetchWithData(endpoint + '/movement', 'DELETE', { _id })
