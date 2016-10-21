import { Component, OnInit, Input } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';

import { Review } from '../../objects/Review';


@Component({
	moduleId: module.id,
	selector: 'bookReview',
	providers: [ ReviewsService ],
	templateUrl: 'bookReviews.component.html',
	styleUrls: [ 'bookReviews.component.css' ]
})
export class BookReviewsComponent implements OnInit {
	@Input() bookId:string;

	reviews: Review[];
	myRevService: ReviewsService;

	constructor(private reviewsService: ReviewsService) {
		this.myRevService = reviewsService;
	}

	ngOnInit() {
		this.myRevService.getReviewsBook(this.bookId)
			.subscribe(reviews => {
				this.reviews = reviews;
			});
	}
}