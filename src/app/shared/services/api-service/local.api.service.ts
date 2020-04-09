import { Injectable } from '@angular/core';
import { HTTPApiService as HttpApiService } from './http.api.service';

@Injectable()
//** This API Service connects to a backend running locally. **//
export class LocalApiService extends HttpApiService {
	protected getApiURL(): string {
		return 'https://localhost:8080/api/v1';
	}
}
