import { Component } 		from '@angular/core';
import { AuthService }	from '../../services/auth.service';
import { ReviewsService }	from '../../services/reviews.service';
import { BooksService }	from '../../services/books.service';


@Component({
	moduleId: module.id,
	selector: 'profile',
	providers: [ ReviewsService, 
				 BooksService ],
	templateUrl: 'profile.component.html',
	styleUrls: [ 'profile.component.css' ]
})
export class ProfileComponent {

	user: any = {};
	reviews: any = [];
	books_borrowed: any = [];

	constructor(private authService: AuthService,
				private reviewsService: ReviewsService,
				private booksService: BooksService) {

		this.loadRevs();

    }

    loadRevs() {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let that = this;

        that.authService.getUser(currentUser)
            .subscribe(usr => {
                console.log(usr);
                that.user = usr;

                that.reviewsService.getReviewsAuthor(usr._id)
                    .subscribe(revs => {
                        console.log(revs);
                        that.reviews = revs;

                        that.reviews.forEach(function(row,index,array){
                            that.booksService.getBook(row.bookId)
                                .subscribe(book => {
                                    array[index].book = book;
                                });
                        });
                    });

            });
    }

    removeRev(revId) {

        let that = this;

        this.reviewsService.remReview(revId)
            .subscribe(ret => {
                if(ret.fail) {
                    console.log(ret.fail);
                } else {
                    console.log(ret);
                    this.loadRevs();
                }
            });
    }

}
