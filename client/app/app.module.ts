import { NgModule }      	from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { NgbModule } 		from '@ng-bootstrap/ng-bootstrap';
import { RouterModule }		from '@angular/router';
import { HttpModule } 		from '@angular/http';

import { TruncatePipe, GridCategoryPipe }   	from './app.pipe';

import { AppComponent }   		from './app.component';
import { BooksGridComponent } 	from './components/booksGrid/booksGrid.component';
import { BookDetailsComponent } from './components/bookDetails/bookDetails.component';
import { BookReviewsComponent } from './components/bookReviews/bookReviews.component';
import { AboutComponent }       from './components/about/about.component';
import { AboutPatrykComponent } from './components/about/aboutPatryk.component';
import { AboutMichalComponent } from './components/about/aboutMichal.component';
import { AboutKrzysztofComponent } from './components/about/aboutKrzysztof.component';
import { AboutKamilComponent } from './components/about/aboutKamil.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { MainPageComponent } from './components/mainPage/mainPage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookCarouselComponent } from './components/bookCarousel/bookCarousel.component';

import { RouterConf } 			from './router.config';
import { AuthGuard } from './guards/auth/auth.guard';



@NgModule({
  imports: [
				BrowserModule,
				HttpModule,
				NgbModule.forRoot(),
				RouterModule.forRoot(RouterConf)
			],

  declarations: [
  					AppComponent,
            MainPageComponent,
  					BooksGridComponent,
  					BookDetailsComponent,
  					BookReviewsComponent,
  					TruncatePipe,
            GridCategoryPipe,
  					AboutComponent,
            AboutPatrykComponent,
            AboutMichalComponent,
            AboutKrzysztofComponent,
            AboutKamilComponent,
            ProfileComponent,
            NotFoundComponent,
            RegisterComponent,
            LoginComponent,
  					TruncatePipe,
            BookCarouselComponent
  				],

  providers: [
            AuthGuard
          ],

  bootstrap: [
  				AppComponent
  			 ]
})

export class AppModule { }
