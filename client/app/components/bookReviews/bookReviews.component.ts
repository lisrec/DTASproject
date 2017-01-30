import { Component, OnInit, Input } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
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

	userLogged: boolean = false;
	reviews: Review[];
	myRevService: ReviewsService;
	openedModal: boolean;
	reviewString: string;
	sub: any;

	constructor(private reviewsService: ReviewsService,
				private authService: AuthService,
				private modalService: NgbModal, 
				private route: ActivatedRoute, 
				private router: Router) {
		this.myRevService = reviewsService;
		this.openedModal = false;
	}

	ngOnInit() {
		this.myRevService.getReviewsBook(this.bookId)
			.subscribe(reviews => {
				this.reviews = reviews;
			});

		this.sub = this.route.params.subscribe(params => {
			let id = params['id'];
			this.bookId = id;

			this.myRevService.getReviewsBook(this.bookId)
				.subscribe(reviews => {
					this.reviews = reviews;
				});
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

	checkModal() {
		if(this.openedModal){
			return "block";
		} else {
			return "none";
		}
	}

	saveComment() {
		console.log(this.reviewString);

		let currentUser = JSON.parse(localStorage.getItem('currentUser'));

		let that = this;

        that.authService.getUser(currentUser)
        	.subscribe(usr => {
        		//console.log(usr._id);
        		let authorId = usr._id;
        		
        		let rev = {
					author: usr.login,
					authorId: authorId,
					bookId: this.bookId,
					content: this.reviewString,
					rate: 5
				}

				console.log(rev)

				this.myRevService.addReview(rev)
					.subscribe(review => {
						console.log(review);
						if(!review.fail) {
							this.myRevService.getReviewsBook(this.bookId)
								.subscribe(reviews => {
									this.reviews = reviews;
								});
						}
					});

        	});
	}

	showElement_checkUser() {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if(currentUser && currentUser.token) {
			this.userLogged = true;
			return "block";
		} else {
			this.userLogged = false;
			return "none";
		}
	}

}