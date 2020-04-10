import { Injectable } from '@angular/core';
import { HTTPApiService } from './http.api.service';

@Injectable()
/**
 * This API Service connects to locally running backend.
 */
export class LocalApiService extends HTTPApiService {
	apiUrl = 'http://localhost:8080/api/v1';
}
