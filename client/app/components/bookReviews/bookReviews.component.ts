import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'bookReview',
	templateUrl: 'bookReviews.component.html',
	styleUrls: [ 'bookReviews.component.css' ]
})
export class BookReviewsComponent implements OnInit {
	closeResult: string;

	constructor() {}

	ngOnInit() {
		
	}
}