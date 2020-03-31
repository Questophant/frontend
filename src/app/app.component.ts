import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'HACAFrontend';
	test = 'New';
	array = [{ a: 't', b: { c: 1 } }];
}
