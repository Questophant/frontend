import { Injectable } from '@angular/core';
import { UserDto } from '../dtos/user.dto';
import { ApiService } from './api-service/api.service';

@Injectable({
	providedIn: 'root'
})
export class UrlResolverService {

	constructor(private api: ApiService) { }

	public getProfilePicture(user: UserDto, sizeAndFormat: string): string {
		if (user == null || user.imageUrl == null || user.imageUrl.length == 0) {
			return "/assets/images/profile/panda.webp";
		}
		return this.api.getApiUrl() + user.imageUrl + sizeAndFormat;
	}
}
