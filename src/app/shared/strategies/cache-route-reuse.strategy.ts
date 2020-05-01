import { RouteReuseStrategy } from '@angular/router/';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CacheRouteReuseStrategy implements RouteReuseStrategy {
	private handlers: { [key: string]: DetachedRouteHandle } = {};
	private test = false;
	private shouldStore = false;

	constructor() {}

	shouldDetach(route: ActivatedRouteSnapshot): boolean {
		return this.shouldStore;
	}

	store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
		this.handlers[
			route.url.join('/') || route.parent.url.join('/')
		] = handle;
	}

	shouldAttach(route: ActivatedRouteSnapshot): boolean {
		return !!this.handlers[route.url.join('/')];
	}

	retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
		return this.handlers[route.url.join('/') || route.parent.url.join('/')];
	}

	shouldReuseRoute(
		future: ActivatedRouteSnapshot,
		curr: ActivatedRouteSnapshot
	): boolean {
		this.shouldStore =
			curr.routeConfig?.path === 'challenge/:id/details' &&
			future.routeConfig?.path === '';
		this.test =
			future.routeConfig?.path === 'challenge/:id/details' &&
			curr.routeConfig?.path === '';

		return future.routeConfig === curr.routeConfig;
	}
}
