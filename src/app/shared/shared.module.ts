import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiService } from './services/api-service/api.service';

@NgModule({
	declarations: [],
	imports: [CommonModule],
	providers: [
		ApiService
	],
})
export class SharedModule {}
