import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	offline = !navigator.onLine;

	constructor(private connectionService: ConnectionService) {
		this.connectionService.monitor().subscribe((currentState) => {
			this.offline = !currentState;
		});
	}
}
