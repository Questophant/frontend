import { Injectable } from '@angular/core';
import { HTTPApiService } from './http.api.service';

@Injectable()
/**
 * This API Service connects to the test backend running online.
 */
export class TestApiService extends HTTPApiService {
	apiUrl = 'https://test.challengemeapp.de/api/v1';
}
