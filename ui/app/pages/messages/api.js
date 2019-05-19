var Q = require('Q')
var ecies = require('eth-ecies');
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

export function sendMessageToAddress({ from, to, message, publicKey }) {
  var deferred = Q.defer()
  var headers = new Headers()
  headers.append("Content-Type", "application/json")
  var content, content2;

  this.lookupIdentityPublicKey({address: to})
  .then((data) => {
    if(message.length > 0) {
      content = ecies.encrypt(
        new Buffer(data.publicKey.substring(2), 'hex'),
        new Buffer(message)
      ).toString('base64')
      content2 = ecies.encrypt(
        new Buffer(publicKey.substring(2), 'hex'),
        new Buffer(message)
      ).toString('base64')
    }
    
    var fetchConfig = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ from, to, content, content2 })
    }

    fetch(`${API_ENDPOINT}/send-message-to-address`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

  })

  return deferred.promise
}
