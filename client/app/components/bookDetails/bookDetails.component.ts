import { Component,
		 HostBinding,
         trigger,
         transition,
         animate,
         style,
         state } 			from '@angular/core';
import { Router, ActivatedRoute } 	from '@angular/router';
import { BooksService } 	from '../../services/books.service';
import { AuthService } from '../../services/auth.service';
import { RentService } from '../../services/rent.service';
import { BookCarouselComponent } from '../bookCarousel/bookCarousel.component';

import { Book }				from '../../objects/Book'


@Component({
	moduleId: module.id,
	selector: 'bookDetails',
	templateUrl: 'bookDetails.component.html',
	styleUrls: [ 'bookDetails.component.css' ],
	providers: [ BooksService,
				 RentService,
				 AuthService ]
})
export class BookDetailsComponent {
	sub: any;
	bookId: string;
	rentId: string = "";
	book: Book;

	loggedUsr: any = {};

	rentLoaded: boolean = false;
	canReturn: boolean = false;
	canRent: boolean = false;

	constructor(private route: ActivatedRoute,
				private router: Router,
				private booksService: BooksService,
				private rentService: RentService,
				private authService: AuthService) {


		this.sub = this.route.params.subscribe(params => {
			let id = params['id'];
			this.bookId = id;

			this.booksService.getBook(this.bookId)
	        	.subscribe(book => {
	        		this.book = book;
	        		this.checkUsr(); 
	        	});
        }); 
	}

	checkUsr() {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		let that = this;

		if(!currentUser || !currentUser.token)
			return false;

        this.authService.getUser(currentUser)
        	.subscribe(usr => {
        		console.log(usr);
        		if((typeof(usr.success) != 'undefined') && (usr.success == false)) {
    				console.log('User not authorized.');
    				that.rentLoaded = false;
					that.canReturn = false;
					that.canRent = false;
        		} else {
        			that.loggedUsr = usr;
        			that.checkRentButton();
        		}
        	});
	}

	checkRentButton() {
		if(this.loggedUsr == {})
			return false;

		let that = this;
		let userId = that.loggedUsr._id;

		console.log(userId);

		this.rentService.getRent(userId)
			.subscribe(rents => {
				console.log(rents);
				if(!rents.fail) {
					if(rents.length == 0) {
						that.rentLoaded = true;
						that.canReturn = false;
						that.canRent = true;
					} else {
						let notFinded = true;
						rents.forEach((rent, index, arr) => {
							console.log(rent);
							if(that.bookId == rent.bookId) {
								that.rentId = rent._id;
								that.rentLoaded = true;
								that.canReturn = true;
								that.canRent = false;
								notFinded = false;
							} else {
								if(index == arr.length-1 && notFinded){
									that.rentLoaded = true;
									that.canReturn = false;
									that.canRent = true;
								}
							}
						});
					}
				} else {
					that.rentLoaded = true;
					that.canReturn = false;
					that.canRent = true;
				}
			});
	}

	rentBook() {
		let that = this;
		let userId = this.loggedUsr._id;
		let bookId = this.bookId;

		let rent = {
			"userId": userId,
    		"bookId": bookId,
		}

		this.rentService.addRent(rent)
			.subscribe(res => {
				console.log(res);
				that.canReturn = true;
				that.canRent = false;
			});
	}

	returnBook() {
		let that = this;
		this.rentService.remRent(that.rentId)
			.subscribe(res => {
				console.log(res);
				if(res.ok && res.n == 1) {
					that.canReturn = false;
					that.canRent = true;
				} else {
					that.router.navigate(['/profile']);
				}
			});
	}
}
