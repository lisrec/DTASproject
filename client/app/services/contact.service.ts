import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ContactService {
	constructor(private http: Http) { }

	saveMessage(message){

		let headers = new Headers({"Content-Type":"application/json"});
		let options = new RequestOptions({headers: headers});
		let mess = JSON.stringify(message);
		console.log(mess);
		return this.http.post('/api/message', mess, options)
			.map(res => res.json());
	}
		
}