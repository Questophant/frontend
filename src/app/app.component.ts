import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ConnectionService } from 'ng-connection-service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	offline = !navigator.onLine;

	constructor(
		private connectionService: ConnectionService,
		swUpdate: SwUpdate,
		router: Router,
	) {
		this.connectionService.monitor()
			.subscribe((currentState) => {
				this.offline = !currentState;
			});

		// apply updates without reloading the webpage
		swUpdate.available
			.subscribe((e) => {
				console.log('New version available');
				swUpdate.activateUpdate()
					.then(() => {
						console.log('New version installed. Refreshing ...');
						document.location.reload();
					});
			});

		router.events.subscribe(swUpdate.checkForUpdate);
	}
}
