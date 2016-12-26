import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    _host: string = '';

    constructor(private router: Router,
    			private http: Http) { }

    checkUsr() {
    	let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
      	return this.http.post(this._host+'/api/auth/check', JSON.stringify({ token: currentUser.token }), {headers: headers})
            .map(res => {
                let result = res.json() && res.json().success;
                console.log(result);
                if (result) {
                    return true;
                } else {
                    return false;
                }
            });
    }

    canActivate() {
        if ((localStorage.getItem('currentUser')) && 
        	this.checkUsr().subscribe(result => {
        		if(result) {
                    console.log(result)
        			return true;
        		}
        		else {
        			this.router.navigate(['/login']);
        			return false;
        		}
        	},
            err => {
                this.router.navigate(['/login']);
                return false;
            })) return true;

        this.router.navigate(['/login']);
        return false;
    }
}