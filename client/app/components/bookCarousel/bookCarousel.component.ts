import { Component ,Input } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../objects/Book';



@Component({
  moduleId: module.id,
  selector: 'bookCarousel',
  templateUrl: 'bookCarousel.component.html',
  styleUrls: [ 'bookCarousel.component.css' ],
  providers: [ BooksService ]
})
export class BookCarouselComponent  {

  @Input() genre = "";
  books: Book[];
  booksLoaded: boolean = false;

  constructor(private booksService: BooksService) {
  let that=this;
  this.booksService.getBooks()
    .subscribe(books => {
      let bookstemp = new Array();
      books.forEach(function(book){
        if (book.genre == that.genre)
          bookstemp.push(book);

      });
      that.books=bookstemp;
      that.booksLoaded = true;
    });



  }

get filterCat()   { return this.genre; }

}
