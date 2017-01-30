import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ReviewsService {
	constructor(private http: Http) {}

	getReviews() {
		return this.http.get('/api/reviews')
			.map(res => res.json());
	}

	getReviewsBook(id) {
		return this.http.get('/api/reviews/book/'+id)
			.map(res => res.json());
	}

	getReviewsAuthor(id) {
		return this.http.get('/api/reviews/author/'+id)
			.map(res => res.json());
	}

	addReview(review) {
		return this.http.post('/api/review', review)
			.map(res => res.json());
	}
}