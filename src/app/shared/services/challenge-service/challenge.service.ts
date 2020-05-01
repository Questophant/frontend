import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Injectable({
	providedIn: 'root',
})
export class ChallengeService {
	constructor(private api: ApiService) {}
}
