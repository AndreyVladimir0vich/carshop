const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBhZjNmNjRlZTQxOTk3NWZiZDJmY2QiLCJncm91cCI6ImZyb250LTEwIiwiaWF0IjoxNjc4NDQwMDY3LCJleHAiOjE3MDk5NzYwNjd9.uNPl6p9X-ua4U8P8s35H6Gjx10bE9l3dqzslLsx5UrE',
  },
}

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject('Error')
}

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }
  getProductList() {
    return fetch(`${this._baseUrl}/products`, {
      headers: this._headers,
    }).then((res) => onResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => onResponse(res))
  }

  setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(dataUser),
    }).then((res) => onResponse(res))
  }

  searchProducts(query) {
    return fetch(`${this._baseUrl}/products/search?query=${query}`, {
      headers: this._headers,
    }).then((res) => onResponse(res))
  }

  changeLikeProductStatus(productId, like) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      headers: this._headers,
      method: like ? 'PUT' : 'DELETE',
    }).then((res) => onResponse(res))
  }
}

export const api = new Api(config)
