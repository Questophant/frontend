import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';
import { DataPrivacyOverlayComponent } from './components/data-privacy-overlay/data-privacy-overlay.component';
import { ImprintOverlayComponent } from './components/imprint-overlay/imprint-overlay.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RulesOverlayComponent } from './components/rules-overlay/rules-overlay.component';
import { DurationPipe } from './pipes/duration-pipe/duration.pipe';
import { ApiService } from './services/api/api.service';
import { apiServiceFactory } from './services/api/apiService.factory';
import { AuthService } from './services/auth/auth.service';
import { ChallengeService } from './services/challenge/challenge.service';
import { StoreService } from './services/store/store.service';
import { CacheRouteReuseStrategy } from './strategies/cache-route-reuse.strategy';
import { UrlResolverService } from './services/url-resolver.service';

@NgModule({
	imports: [CommonModule, HttpClientModule, RouterModule],
	declarations: [
		DataPrivacyOverlayComponent,
		ImprintOverlayComponent,
		RulesOverlayComponent,
		NavbarComponent,
		ChallengeListComponent,
		DurationPipe,
	],
	providers: [
		{
			provide: ApiService,
			useFactory: apiServiceFactory,
			deps: [HttpClient, StoreService],
		},
		{
			provide: RouteReuseStrategy,
			useClass: CacheRouteReuseStrategy,
		},
		AuthService,
		StoreService,
		ChallengeService,
		UrlResolverService,
	],
	exports: [
		DataPrivacyOverlayComponent,
		ImprintOverlayComponent,
		RulesOverlayComponent,
		NavbarComponent,
		ChallengeListComponent,
		DurationPipe,
	],
})
export class SharedModule {}
