import { Injectable } from '@angular/core';
import { UserDto } from '../../dtos/user.dto';
import { ApiService } from '../api/api.service';

@Injectable({
	providedIn: 'root',
})
export class UrlResolverService {
	private readonly profilePictureFormat: string;
	private readonly canUseWebP: boolean;

	constructor(private api: ApiService) {
		this.canUseWebP = this.checkWebPCompatibility();
		if (this.canUseWebP) {
			this.profilePictureFormat = 'webp';
		} else {
			this.profilePictureFormat = 'jpg';
		}
	}

	getProfilePicture(user: UserDto, size: string): string {
		if (
			user == null ||
			user.imageUrl == null ||
			user.imageUrl.length === 0
		) {
			let fileName;
			switch (Math.abs(this.hash(user.userName) % 3)) {
				case 1:
					fileName = 'alpaca';
					break;
				case 2:
					fileName = 'penguin';
					break;
				default:
					fileName = 'panda';
					break;
			}

			return (
				'/assets/images/profile/' +
				fileName +
				'.' +
				(this.canUseWebP ? 'webp' : 'png')
			);
		}
		return (
			this.api.getApiUrl() +
			user.imageUrl +
			size +
			'.' +
			this.profilePictureFormat
		);
	}

	private hash(s: string): number {
		let hash = 0;
		let i;
		let chr;
		for (i = 0; i < s.length; i++) {
			chr = s.charCodeAt(i);
			// tslint:disable-next-line:no-bitwise
			hash = (hash << 5) - hash + chr;
			// tslint:disable-next-line:no-bitwise
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}

	// TODO: externalize this for the whole app?
	private checkWebPCompatibility(): boolean {
		const elem = document.createElement('canvas');

		if (!!(elem.getContext && elem.getContext('2d'))) {
			// was able or not to get WebP representation
			return (
				elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
			);
		}

		// very old browser like IE 8, canvas not supported
		return false;
	}
}
