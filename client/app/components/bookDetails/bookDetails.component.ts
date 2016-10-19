import { Component } 		from '@angular/core';
import { ActivatedRoute } 	from '@angular/router';

import { Book }				from '../../objects/Book'

import { BooksService } 	from '../../services/books.service';


@Component({
	moduleId: module.id,
	selector: 'bookDetails',
	templateUrl: 'bookDetails.component.html',
	styleUrls: [ 'bookDetails.component.css' ],
	providers: [ BooksService ]
})
export class BookDetailsComponent{
	sub: any;
	bookId: string;
	book: Book;

	constructor(private route: ActivatedRoute, 
				private booksService: BooksService){

		this.sub = this.route.params.subscribe(params => {
			let id = params['id'];
			this.bookId = id;
        });

        this.booksService.getBook(this.bookId)
        	.subscribe(book => {
        		this.book = book;
        	});
	}


}