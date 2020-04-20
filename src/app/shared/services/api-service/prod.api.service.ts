import { Injectable } from '@angular/core';
import { HTTPApiService } from './http.api.service';

@Injectable()
/**
 * This API Service connects to the backend.
 */
export class ProdApiService extends HTTPApiService {
	apiUrl = 'https://app.challengemeapp.de/api/v1';
}
