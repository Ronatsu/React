import decode from 'jwt-decode';
export default class {

    constructor(domimio) {
        this.domimio = domimio || 'Mi_Dominio'
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    login(username, password) {
        return this.fetch('https://localhost:44357/api/ManejoIngreso/Login', {
            method: 'POST',
            body: JSON.stringify({
                'email': username,
                'password1': password
            })
        }).then(res => {
            this.setToken(res.token)
            return Promise.resolve(res);
            })
    }

    loggedIn() {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decode = decode(token);
            if (decode.exp < Date.now() / 1000) {
                return true;
            }
            else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    setToken(idToken) {
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    getProfile() {
        return decode(this.getToken());
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken() 
        }

        return fetch(url, {
            headers,
            ...options
        }).then(this._checkStatus)
            .then(response => response.json())
    }


    _checkStatus(response) {
        alert("Se callo, " + response.status);
        if (response.status >= 200 && response.status < 300) {
            return response
        }
        else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}