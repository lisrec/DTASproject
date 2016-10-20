import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';

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

	constructor(private booksService: BooksService) {

		this.booksService.getBooks()
			.subscribe(books => {
				this.books = books;
			});

	}

	ngOnInit(){

	}
}