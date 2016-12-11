import { MainPageComponent } from './components/mainPage/mainPage.component';
import { BooksGridComponent } from './components/booksGrid/booksGrid.component';
import { BookDetailsComponent } from './components/bookDetails/bookDetails.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactComponent } from './components/contact/contact.component';

import { AuthGuard } from './guards/auth/auth.guard';

export const RouterConf = [
      { path: '', component: MainPageComponent },
      { path: 'books', component: BooksGridComponent },
      { path: 'books/:category', component: BooksGridComponent },
      { path: 'book/:id', component: BookDetailsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'contact', component: ContactComponent },

      { path: '**', component: NotFoundComponent }
    ]
