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
  

// GET (all) /user
export const fetchUsers = (query) => fetch(endpoint + '/user?' + queryToQueryString(query))
  .then(res => res.json()).then(res => res.msg)

// POST /user
export const createUser = data => fetchWithData(endpoint + '/user', 'POST', data)

// PUT /user
export const updateUser = (_id, data) => fetchWithData(endpoint + '/user', 'PUT', { _id, data })

// DELETE /user
export const deleteUser = _id => fetchWithData(endpoint + '/user', 'DELETE', { _id })
