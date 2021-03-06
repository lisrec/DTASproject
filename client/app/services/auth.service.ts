import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'


@Injectable()
export class AuthService {
    public token: string;
    _host: string = '';

    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username, password) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this._host+'/api/auth/login', JSON.stringify({ login: username, pass: password }), {headers: headers})
            .map(res => {
                let token = res.json() && res.json().token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    return {"auth": true};
                } else {
                    return {"auth": false};
                }
            });
    }

    checkAuth(curUsr) {
        let login = curUsr.username;
        let token = curUsr.token;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this._host+'/api/auth/check', JSON.stringify({ login: login, token: token }), {headers: headers})
            .map(res => {
                let result = res.json() && res.json().success;
                if (result) {
                    return true;
                } else {
                    return false;
                }
            });
    }

    getUser(curUsr) {
        let login = curUsr.username;
        let token = curUsr.token;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this._host+'/api/auth/getUser', JSON.stringify({ login: login, token: token }), {headers: headers})
            .map(res => {

                if(res.json() && (typeof(res.json().success) != 'undefined') && (res.json().success == false)) {
                    localStorage.clear(); 
                }

                return res.json();
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}