import { Injectable } from '@angular/core';
import { HTTPApiService } from './http.api.service';

@Injectable()
//** This API Service connects to the production backend. **//
export class ProductionApiService extends HTTPApiService {
	protected getApiURL(): string {
		throw new Error('Backend not implemented.');
	}
}
