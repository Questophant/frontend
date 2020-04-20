import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiService } from './services/api-service/api.service';
import { apiServiceFactory } from './services/api-service/apiService.factory';
import { DataPrivacyOverlayComponent } from './components/data-privacy-overlay/data-privacy-overlay.component';
import { RulesOverlayComponent } from './components/rules-overlay/rules-overlay.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { StoreService } from './services/store/store.service';
import { AuthService } from './services/auth/auth.service';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';

@NgModule({
	imports: [CommonModule, HttpClientModule, RouterModule],
	declarations: [
		DataPrivacyOverlayComponent,
		RulesOverlayComponent,
		NavbarComponent,
		ChallengeListComponent,
	],
	providers: [
		{
			provide: ApiService,
			useFactory: apiServiceFactory,
			deps: [HttpClient, StoreService],
		},
		AuthService,
		StoreService,
	],
	exports: [
		DataPrivacyOverlayComponent,
		RulesOverlayComponent,
		NavbarComponent,
		ChallengeListComponent,
	],
})
export class SharedModule {}
