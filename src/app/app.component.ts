import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private test: string, private blub: number) {}
	title = 'HACAFrontend';
	array = [{ a: 't', b: { c: 1 } }];
}
