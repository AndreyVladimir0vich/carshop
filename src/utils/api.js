const freshHeaders = () => {
  return {
    headers: {
      'content-type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  }
}

const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
    Authorization: localStorage.getItem('token'),
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBhZjNmNjRlZTQxOTk3NWZiZDJmY2QiLCJncm91cCI6ImZyb250LTEwIiwiaWF0IjoxNjc4NDQwMDY3LCJleHAiOjE3MDk5NzYwNjd9.uNPl6p9X-ua4U8P8s35H6Gjx10bE9l3dqzslLsx5UrE',
  },
  freshHeaders: freshHeaders,
}

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject('Error')
}

class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl
    this._headers = data.headers
    this._freshHeaders = data.freshHeaders
  }
  getProductList() {
    return fetch(`${this._baseUrl}/products`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res))
  }

  getProductById(id) {
    return fetch(`${this._baseUrl}/products/${id}`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res))
  }

  addNewProduct(newProduct) {
    return fetch(`${this._baseUrl}/products`, {
      method: 'POST',
      ...this._freshHeaders(),
      body: JSON.stringify(newProduct),
    }).then((res) => onResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res))
  }

  setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      ...this._freshHeaders(),
      body: JSON.stringify(dataUser),
    }).then((res) => onResponse(res))
  }

  searchProducts(query) {
    return fetch(`${this._baseUrl}/products/search?query=${query}`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res))
  }

  changeLikeProductStatus(productId, isLike) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      method: isLike ? 'PUT' : 'DELETE',
      ...this._freshHeaders(),
    }).then((res) => onResponse(res))
  }
}

export const api = new Api(config)
