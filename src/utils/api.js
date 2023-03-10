const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMxMGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-okSY-tac',
    },
};

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject('Error');
};

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    getProductList() {
        return fetch(`${this._baseUrl}/products`, {
            headers: this._headers,
        }).then((res) => onResponse(res));
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: this._headers,
        }).then((res) => onResponse(res));
    }

    searchProducts(query) {
        return fetch(`${this._baseUrl}/products/search?query=${query}`, {
          headers: this._headers,
        }).then((res) => onResponse(res));
    }

    changeLikeProductStatus(productId, like) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
          headers: this._headers,
          method: like ? 'PUT' : 'DELETE',
        }).then((res) => onResponse(res));
    }

    deleteLike(productId) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
          headers: this._headers,
          method: 'DELETE'
        }).then((res) => onResponse(res));
    }
    
    addLike(productId) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
          headers: this._headers,
          method: 'PUT'
        }).then((res) => onResponse(res));
    }
}

export const api = new Api(config);