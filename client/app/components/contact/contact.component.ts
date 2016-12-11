import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
	moduleId: module.id,
	selector: 'contact',
	templateUrl: 'contact.component.html',
	styleUrls: [ 'contact.component.css' ],
	providers: [ ContactService ]
})
export class ContactComponent implements OnInit {
	
	mail:string = "";
	title:string = "";
	message:string = "";

	constructor(private contactService: ContactService) {}

	ngOnInit() {
		
	}

	sendMessage(){
		console.log(this.mail, this.title, this.message)
		this.contactService.saveMessage({'usermail':this.mail, 'title':this.title, 'message':this.message})
			.subscribe(response => {
				console.log(response);
				if (response.fail && response.fail=="badArgs"){
					//wyswietl blad
					alert("Błąd w formularzu!");
				}
				else{
					//wyswietl ze wyslano
					this.mail = "";
					this.title = "";
					this.message = "";
					alert("Wysłano!");
				}
			});
	}

}