import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RegisterService {
	constructor(private http: Http) {}

	saveUser(user) {
		return this.http.post('/api/register', user)
			.map(res => res.json());
	}
}