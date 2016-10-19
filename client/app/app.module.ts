import { NgModule }      	from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { NgbModule } 		from '@ng-bootstrap/ng-bootstrap';
import { RouterModule }		from '@angular/router';
import { HttpModule } 		from '@angular/http';

import { TruncatePipe }   	from './app.pipe';

import { AppComponent }   		from './app.component';
import { BooksGridComponent } 	from './components/booksGrid/booksGrid.component';
import { BookDetailsComponent } from './components/bookDetails/bookDetails.component';
import { RouterConf } 			from './router.config';



@NgModule({
  imports:      [ BrowserModule, HttpModule, NgbModule.forRoot(), RouterModule.forRoot(RouterConf) ],
  declarations: [ AppComponent, BooksGridComponent, BookDetailsComponent, TruncatePipe ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }