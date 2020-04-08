import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiService } from './services/api-service/api.service';
import { apiServiceFactory } from './services/api-service/apiService.factory';

@NgModule({
	declarations: [],
	imports: [CommonModule],
	providers: [
		{
			provide: ApiService,
			useFactory: apiServiceFactory,
		}
	],
})
export class SharedModule {
}
