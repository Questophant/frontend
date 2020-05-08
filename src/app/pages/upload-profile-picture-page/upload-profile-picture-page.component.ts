import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserDto } from '../../shared/dtos/user.dto';
import { StoreService } from '../../shared/services/store/store.service';
import { ApiService } from '../../shared/services/api/api.service';
import { UrlResolverService } from '../../shared/services/url/url-resolver.service';

@Component({
	selector: 'app-upload-profile-picture-page',
	templateUrl: './upload-profile-picture-page.component.html',
	styleUrls: ['./upload-profile-picture-page.component.scss'],
})
export class UploadProfilePicturePageComponent implements OnInit {
	user$: Promise<UserDto>;

	fileLoaded: boolean;
	imageChangedEvent: any = '';
	croppedImage: string;

	constructor(
		private location: Location,
		private store: StoreService,
		private api: ApiService,
		private urlResolverService: UrlResolverService
	) {
		this.user$ = api.getMyUser(store.getUserId());
	}

	ngOnInit(): void {}

	fileChangeEvent(event: any): void {
		this.fileLoaded = true;
		this.imageChangedEvent = event;
	}

	imageCropped(event: ImageCroppedEvent): void {
		this.croppedImage = event.base64;
	}

	imageLoaded(): void {
		// show cropper
	}

	cropperReady(): void {
		// cropper ready
	}

	loadImageFailed(): void {
		// show message
		alert('Bild konnte nicht geöffnet werden.');
		this.fileLoaded = false;
	}

	navigateBack(): void {
		this.location.back();
	}

	upload(): void {
		this.api.setUserImage(this.croppedImage).then((userDto) => {
			this.navigateBack();
		});
	}

	getProfilePicture(user: UserDto): string {
		const element = document.getElementsByClassName('container')[0];
		return this.urlResolverService.getProfilePicture(
			user,
			'.' + element.clientWidth + 'x' + element.clientHeight
		);
	}
}
