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
  

// GET (all) /classifier
export const fetchClassifiers = (query) => fetch(endpoint + '/classifier?' + queryToQueryString(query))
  .then(res => res.json()).then(res => res.msg)

// POST /classifier
export const createClassifier = data => fetchWithData(endpoint + '/classifier', 'POST', data)

// PUT /classifier
export const updateClassifier = (_id, data) => fetchWithData(endpoint + '/classifier', 'PUT', { _id, data })

// DELETE /classifier
export const deleteClassifier = _id => fetchWithData(endpoint + '/classifier', 'DELETE', { _id })
