import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiService } from './api.service';
import { LocalApiService } from './local.api.service';
import { ProdApiService } from './prod.api.service';
import { SimApiService } from './sim.api.service';
import { TestApiService } from './test.api.service';
import { AuthService } from '../auth/auth.service';

export function apiServiceFactory(
	httpClient: HttpClient,
	auth: AuthService
): ApiService {
	switch (environment.apiService) {
		case 'production':
			return new ProdApiService(httpClient, auth);

		case 'test':
			return new TestApiService(httpClient, auth);

		case 'simulation':
			return new SimApiService(auth);

		case 'local':
			return new LocalApiService(httpClient, auth);

		default:
			throw new Error(
				'Invalid ApiService selected. Only production, test, simulation and local are provided!'
			);
	}
}
