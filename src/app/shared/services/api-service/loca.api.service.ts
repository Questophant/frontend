import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class LocalApiService implements ApiService {
	public getDailyChallenge(): string {
		return 'mock daily challenge';
	}
}
