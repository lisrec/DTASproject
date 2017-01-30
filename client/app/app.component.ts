import { Component } from '@angular/core';
import { BooksGridComponent } from './components/booksGrid/booksGrid.component';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: 'template/main.html'
})
export class AppComponent{
	userLogged: boolean = false;
	constructor() {}

	showElement_checkUser() {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if(currentUser && currentUser.token) {
			this.userLogged = true;
			return "block";
		} else {
			this.userLogged = false;
			return "none";
		}
	}
}