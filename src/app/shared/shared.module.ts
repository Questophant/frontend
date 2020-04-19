import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FilterChallengesByCategoryNamePipe } from './pipes/filter-challenges-by-category-name-pipe/filter-challenges-by-category-name.pipe';
import { ApiService } from './services/api-service/api.service';
import { apiServiceFactory } from './services/api-service/apiService.factory';
import { AuthService } from './services/auth/auth.service';
import { StoreService } from './services/store/store.service';
import { DataPrivacyOverlayComponent } from './components/data-privacy-overlay/data-privacy-overlay.component';
import { RulesOverlayComponent } from './components/rules-overlay/rules-overlay.component';

@NgModule({
	declarations: [
		FilterChallengesByCategoryNamePipe,
		DataPrivacyOverlayComponent,
		RulesOverlayComponent,
	],
	imports: [CommonModule, HttpClientModule],
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
		FilterChallengesByCategoryNamePipe,
		DataPrivacyOverlayComponent,
		RulesOverlayComponent,
	],
})
export class SharedModule {}
