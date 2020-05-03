import { Injectable } from '@angular/core';
import { UserDto } from '../../dtos/user.dto';
import { ApiService } from '../api/api.service';

@Injectable({
	providedIn: 'root',
})
export class UrlResolverService {
	constructor(private api: ApiService) { }

	private hash(s: string): number {
		var hash = 0,
			i,
			chr;
		for (i = 0; i < s.length; i++) {
			chr = s.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}

	public getProfilePicture(user: UserDto, sizeAndFormat: string): string {
		if (
			user == null ||
			user.imageUrl == null ||
			user.imageUrl.length == 0
		) {
			var fileName;
			switch (Math.abs(this.hash(user.userName) % 3)) {
				case 1:
					fileName = 'alpaca.webp';
					break;
				case 2:
					fileName = 'penguin.webp';
					break;
				default:
					fileName = 'panda.webp';
					break;
			}

			return '/assets/images/profile/' + fileName;
		}
		return this.api.getApiUrl() + user.imageUrl + sizeAndFormat;
	}
}
