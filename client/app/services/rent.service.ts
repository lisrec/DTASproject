import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RentService {
	constructor(private http: Http) {}

	getRent(userId) {
		return this.http.get('/api/rents/'+userId)
			.map(res => res.json());
	}

	addRent(rent) {
		return this.http.post('/api/rent', rent)
			.map(res => res.json());
	}

	remRent(renId) {
		return this.http.delete('/api/rent/'+renId)
			.map(res => res.json());
	}
}