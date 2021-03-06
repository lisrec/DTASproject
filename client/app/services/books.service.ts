import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BooksService {
	constructor(private http: Http) { }

	getBooks(){
		return this.http.get('/api/books')
			.map(res => res.json());
	}

	getBooksRevsCount(id){
		return this.http.get('/api/bookRevs/'+id)
			.map(res => res.json());
	}

	getBook(id){
		return this.http.get('/api/book/'+id)
			.map(res => res.json());
	}
	
}