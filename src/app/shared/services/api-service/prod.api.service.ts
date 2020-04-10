import { Injectable } from '@angular/core';
import { HTTPApiService } from './http.api.service';

@Injectable()
/**
 * This API Service connects to the backend
 */
export class ProdApiService extends HTTPApiService {
	apiUrl = 'https://api.challengemeapp.de/api/v1'; // not defined yet
}
