import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { ConnectionService } from 'ng-connection-service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	offline = !navigator.onLine;
	reloadNeeded: boolean = false;
	nextUpdateCheckDay = new Date().getDate();

	constructor(
		private connectionService: ConnectionService,
		swUpdate: SwUpdate,
		router: Router
	) {
		this.connectionService.monitor().subscribe((currentState) => {
			this.offline = !currentState;
		});

		// apply updates without reloading the webpage
		swUpdate.available.subscribe(() => {
			swUpdate.activateUpdate().then(() => {
				this.reloadNeeded = true;
			});
		});
		router.events.subscribe((e) => {
			if (e instanceof NavigationEnd && swUpdate.isEnabled) {
				const day = new Date().getDate();
				if (day != this.nextUpdateCheckDay) {
					this.nextUpdateCheckDay = day;
					swUpdate.checkForUpdate();
				}
				if (this.reloadNeeded) {
					window.location.reload();
				}
			}
		});
	}
}
