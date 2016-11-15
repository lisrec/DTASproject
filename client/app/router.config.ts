import { BooksGridComponent } from './components/booksGrid/booksGrid.component';
import { BookDetailsComponent } from './components/bookDetails/bookDetails.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';

export const RouterConf = [
      { path: '', component: BooksGridComponent },
      { path: 'books', component: BooksGridComponent },
      { path: 'books/cat/:category', component: BooksGridComponent },
      { path: 'book/:id', component: BookDetailsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'profile', component: ProfileComponent }
    ]
