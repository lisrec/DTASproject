import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';

import { Book } from '../../objects/Book';

@Component({
	moduleId: module.id,
	selector: 'booksGrid',
	templateUrl: 'booksGrid.component.html',
	styleUrls: [ 'booksGrid.component.css' ],
	providers: [ BooksService ]
})
export class BooksGridComponent {
	books: Book[];

	constructor(private booksService: BooksService) {

		this.booksService.getBooks()
			.subscribe(books => {
				console.log(books);
				this.books = books;
			});
	}
}