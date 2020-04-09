import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiService } from './api.service';
import { LocalApiService } from './local.api.service';
import { ProductionApiService } from './production.api.service';
import { SimulationApiService } from './simulation.api.service';
import { TestApiService } from './test.api.service';

export function apiServiceFactory(httpClient: HttpClient): ApiService {
	switch (environment.apiService) {
		case 'production':
			return new ProductionApiService(httpClient);
			break;
		case 'test':
			return new TestApiService(httpClient);
			break;
		case 'local':
			return new LocalApiService(httpClient);
			break;
	}
	return new SimulationApiService();
}
