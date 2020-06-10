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
	needReload = false;

	constructor(
		private readonly connectionService: ConnectionService,
		private readonly swUpdate: SwUpdate,
		private readonly router: Router
	) {
		this.connectionService.watch()
			.subscribe((online) => {
				this.offline = !online;
			});

		// apply updates without reloading the webpage
		swUpdate.available.subscribe((e) => {
			console.log('New version available');
			swUpdate.activateUpdate().then(() => {
				console.log('New version installed.');
				this.needReload = true;
			});
		});

		setInterval(() => {
			swUpdate.checkForUpdate();
		}, 1000*60*60); // 1 Hour

		router.events.subscribe(() => {
			if (this.needReload) {
				this.needReload = false;
				document.location.reload();
			}
		});
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
