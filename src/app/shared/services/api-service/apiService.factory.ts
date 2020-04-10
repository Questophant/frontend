import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Store } from '../../storage/store';
import { ApiService } from './api.service';
import { LocalApiService } from './local.api.service';
import { ProdApiService } from './prod.api.service';
import { SimApiService } from './sim.api.service';
import { TestApiService } from './test.api.service';

export function apiServiceFactory(httpClient: HttpClient, store: Store): ApiService {
	switch (environment.apiService) {
		case 'production':
			return new ProdApiService(httpClient, store);

		case 'test':
			return new TestApiService(httpClient, store);

		case 'simulation':
			return new SimApiService(store);

		case 'local':
			return new LocalApiService(httpClient, store);

		default:
			throw new Error(
				'Invalid ApiService selected. Only production, test, simulation and local are provided!'
			);
	}
}
