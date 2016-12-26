import { Component, OnInit } from '@angular/core';
import { md5 } from './md5';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'login',
	templateUrl: 'login.component.html',
	styleUrls: [ 'assets/css/login.css' ]
})
export class LoginComponent implements OnInit {
	login: string = "";
	pass: string = "";
	err_msg: string = "";

	constructor(private authService: AuthService,
				private router: Router) {}

	tryLogin() {
		let log, pas;
		log = this.login;
		pas = md5(this.pass);
		console.log(log, pas);

		this.authService.login(log,pas)
			.subscribe(res => {
				console.log(res);
				if(res.auth) {
					this.err_msg = '';
					this.router.navigate(['/profile']);
				} else {
					this.err_msg = 'Authorization failed.';
				}
			});
	}

	ngOnInit() {
		this.authService.logout();
	}
}