var Q = require('Q')
const API_ENDPOINT = "http://alwaysbcoding.ngrok.io"

export function registerIdentity({address, publicKey}) {
  var deferred = Q.defer()
  var headers = new Headers()
  headers.append("Content-Type", "application/json")

  var fetchConfig = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ address, publicKey })
  }

  fetch(`${API_ENDPOINT}/register-identity`, fetchConfig)
  .then((response) => {
    deferred.resolve(response.json())
  })
  .catch((error) => {
    deferred.reject(error)
  })

  return deferred.promise
}

export function getMessagesForAddress({address}) {
  var deferred = Q.defer()
  var headers = new Headers()
  headers.append("Content-Type", "application/json")

  var fetchConfig = {
    method: "GET",
    headers: headers
  }

  fetch(`${API_ENDPOINT}/messages/${address}`, fetchConfig)
  .then((response) => {
    deferred.resolve(response.json())
  })
  .catch((error) => {
    deferred.reject(error)
  })

  return deferred.promise
}

export function lookupIdentityPublicKey({address}) {
  var deferred = Q.defer()
  var headers = new Headers()
  headers.append("Content-Type", "application/json")

  var fetchConfig = {
    method: "GET",
    headers: headers
  }

  fetch(`${API_ENDPOINT}/lookup-identity-public-key/${address}`, fetchConfig)
  .then((response) => {
    deferred.resolve(response.json())
  })
  .catch((error) => {
    deferred.reject(error)
  })

  return deferred.promise
}

export function sendMessageToAddress({}) {
  var deferred = Q.defer()
  var headers = new Headers()
  headers.append("Content-Type", "application/json")

  var from = ""
  var to = ""
  var content = ""

  var fetchConfig = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ from, to, content })
  }

  fetch(`${API_ENDPOINT}/send-message-to-address`, fetchConfig)
  .then((response) => {
    deferred.resolve(response.json())
  })
  .catch((error) => {
    deferred.reject(error)
  })

  return deferred.promise
}
