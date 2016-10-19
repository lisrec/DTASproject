import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'bookDetails',
	templateUrl: 'bookDetails.component.html'
})
export class BookDetailsComponent implements OnInit {
	constructor(private route: ActivatedRoute) {
		let sub = this.route.params._value.id;
	    console.log(sub);
	}

	ngOnInit() {
		
	}
}