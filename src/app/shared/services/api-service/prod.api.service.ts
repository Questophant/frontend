import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class ProdApiService implements ApiService {
	public getDailyChallenge(): string {
		return 'daily challenge';
	}
}
