import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';
import 'rxjs/add/operator/map';

import { Book } from '../../objects/Book';

@Component({
	moduleId: module.id,
	selector: 'booksGrid',
	templateUrl: 'booksGrid.component.html',
	styleUrls: [ 'booksGrid.component.css' ],
	providers: [ BooksService ]
})
export class BooksGridComponent implements OnInit {
	books_geted: Book[];
	books: Book[];
	booksLoaded: boolean = false;
	category: string = '';

	constructor(private booksService: BooksService,
				private activatedRoute: ActivatedRoute) {

		this.booksService.getBooks()
			.subscribe(books => {
				let countBooks = books;
				countBooks.forEach(book => {
					this.booksService.getBooksRevsCount(book._id)
						.subscribe(ret => {
							book.revs = ret.count;
						});
				});

				this.books = countBooks;
				this.booksLoaded = true;
			});
	}

	get filterCat()   { return this.category; }

	ngOnInit(){
		this.activatedRoute.params.subscribe(
			(param: any) => {
				if(typeof(param['category']) !== 'undefined')
					this.category = param['category'];
			});
	}
}