import { Component }         from '@angular/core';
import { Router } 		from '@angular/router';
import { AuthService }	from '../../services/auth.service';
import { ReviewsService }	from '../../services/reviews.service';
import { RentService } from '../../services/rent.service';
import { BooksService }	from '../../services/books.service';


@Component({
	moduleId: module.id,
	selector: 'profile',
	providers: [ ReviewsService,
                 RentService, 
				 BooksService ],
	templateUrl: 'profile.component.html',
	styleUrls: [ 'profile.component.css' ]
})
export class ProfileComponent {

	user: any = {};
    reviews: any = [];
	rents: any = [];
	books_borrowed: any = [];
    noRentedBooks: boolean = true;

	constructor(private authService: AuthService,
                private reviewsService: ReviewsService,
                private rentService: RentService,
				private router: Router,
				private booksService: BooksService) {

		this.loadRevs();
        this.loadRents();

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

    loadRents() {

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let that = this;

        that.authService.getUser(currentUser)
            .subscribe(usr => {
                
                let userId = usr._id;

                that.rentService.getRent(userId)
                    .subscribe(rents => {
                        console.log(rents);
                        if(!rents.fail) {
                            if(rents.length == 0) {
                                that.noRentedBooks = true;
                            } else {
                                that.rents = rents;
                                that.rents.forEach((row, index, array) => {
                                    that.booksService.getBook(row.bookId)
                                        .subscribe(book => {
                                            array[index].book = book;
                                        });
                                });
                                that.noRentedBooks = false;
                            }
                        } else {
                            that.noRentedBooks = true;
                        }
                    });

            });
    }

    returnBook(rentId) {
        let that = this;
        this.rentService.remRent(rentId)
            .subscribe(res => {
                console.log(res);
                that.rents.forEach((rent,index,arr) => {
                    if(rent._id == rentId) {
                        arr.splice(index, 1);
                    }
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
