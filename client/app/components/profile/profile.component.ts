import { Component, OnInit } 		from '@angular/core';


@Component({
	moduleId: module.id,
	selector: 'profile',
	templateUrl: 'profile.component.html',
	styleUrls: [ 'profile.component.css' ]
})
export class ProfileComponent implements OnInit{

	user: any = {};

	constructor() {
		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.user['username'] = currentUser && currentUser.username;
    }

    ngOnInit() {

    }

}
