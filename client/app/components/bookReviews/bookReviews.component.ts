import { Component, OnInit, Input } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
	openedModal: boolean;

	constructor(private reviewsService: ReviewsService, private modalService: NgbModal) {
		this.myRevService = reviewsService;
		this.openedModal = false;
	}

	ngOnInit() {
		this.myRevService.getReviewsBook(this.bookId)
			.subscribe(reviews => {
				this.reviews = reviews;
			});
	}

	open(content) {
		this.openedModal = true;
		this.modalService.open(content, {backdrop: false}).result.then((result) => {
			this.openedModal = false;
		}, (reason) => {
			this.openedModal = false;
		});
	}

	checkModal(){
		if(this.openedModal){
			return "block";
		} else {
			return "none";
		}
	}

}