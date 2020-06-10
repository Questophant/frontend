import { Component, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';

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
		this.connectionService.watch()
			.subscribe((online) => {
				this.offline = !online;
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

@Injectable({
	providedIn: 'root',
})
export class ConnectionService {

	/**
	 * Returns true if online, false when offline.
	 */
	watch(): Observable<boolean> {
		return new Observable<boolean>((observer) => {
			fromEvent(window, 'online').subscribe(() => observer.next(true));
			fromEvent(window, 'offline').subscribe(() => observer.next(false));
		});
	}
}
