import { environment } from '../../../../environments/environment';
import { ApiService } from './api.service';
import { ProdApiService } from './prod.api.service';
import { LocalApiService } from './loca.api.service';

export function apiServiceFactory(): ApiService {
	if (environment.production) {
		return new ProdApiService();
	} else {
		return new LocalApiService();
	}
}
