import { Component, OnInit } from '@angular/core';
import { md5 } from './md5';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'register',
	templateUrl: 'register.component.html',
	styleUrls: [ 'register.component.css' ],
	providers: [ RegisterService ]
})
export class RegisterComponent implements OnInit {

	login: string = "";
	pass: string = "";
	error: boolean = false;
	processingRegister: boolean = false;

	constructor(private registerService: RegisterService,
				private router: Router) {}

	ngOnInit() {
		
	}

	register() {

		if(this.login == "" || this.pass == "") {
			this.error = true;
			return false;
		}

		this.processingRegister = true;

		let newUser = {
			login: "",
			pass: ""
		}

		newUser.login = this.login;
		newUser.pass = md5(this.pass);

		console.log(newUser);

		this.registerService.saveUser(newUser)
			.subscribe(res => {
				if(res.fail) {
					this.error = true;
					this.processingRegister = false;
				} else {
					this.error = false;
					this.processingRegister = false;
					this.router.navigate(['/login']);
				}
			});
	}
}