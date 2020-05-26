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
  

// GET (all) /task
export const fetchTasks = (query) => fetch(endpoint + '/task?' + queryToQueryString(query))
  .then(res => res.json()).then(res => res.msg)

// POST /task
export const createTask = data => fetchWithData(endpoint + '/task', 'POST', data)

// PUT /task
export const updateTask = (_id, data) => fetchWithData(endpoint + '/task', 'PUT', { _id, data })

// DELETE /task
export const deleteTask = _id => fetchWithData(endpoint + '/task', 'DELETE', { _id })
