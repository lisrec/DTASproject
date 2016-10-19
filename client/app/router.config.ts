import { BooksGridComponent } from './components/booksGrid/booksGrid.component';
import { BookDetailsComponent } from './components/bookDetails/bookDetails.component';

export const RouterConf = [
      { path: '', component: BooksGridComponent },
      { path: 'book/:id', component: BookDetailsComponent }
    ]