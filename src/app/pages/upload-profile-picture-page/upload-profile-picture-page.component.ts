import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserDto } from 'src/app/shared/dtos/user.dto';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { StoreService } from 'src/app/shared/services/store/store.service';
import { UrlResolverService } from 'src/app/shared/services/url/url-resolver.service';

@Component({
	selector: 'app-upload-profile-picture-page',
	templateUrl: './upload-profile-picture-page.component.html',
	styleUrls: ['./upload-profile-picture-page.component.scss'],
})
export class UploadProfilePicturePageComponent implements OnInit {
	user$: Promise<UserDto>;

	constructor(
		private location: Location,
		private store: StoreService,
		private api: ApiService,
		private urlResolverService: UrlResolverService
	) {
		this.user$ = api.getMyUser(store.getUserId());
	}

	ngOnInit(): void { }

	fileLoaded: boolean;
	imageChangedEvent: any = '';
	croppedImage: string;

	fileChangeEvent(event: any): void {
		this.fileLoaded = true;
		this.imageChangedEvent = event;
	}

	imageCropped(event: ImageCroppedEvent) {
		this.croppedImage = event.base64;
	}

	imageLoaded() {
		// show cropper
	}

	cropperReady() {
		// cropper ready
	}

	loadImageFailed() {
		// show message
		alert('Bild konnte nicht geöffnet werden.');
		this.fileLoaded = false;
	}

	navigateBack() {
		this.location.back();
	}

	upload() {
		this.api.setUserImage(this.croppedImage).then((userDto) => {
			this.navigateBack();
		});
	}

	getProfilePicture(user: UserDto): string {
		let element = document.getElementsByClassName('container')[0];
		return this.urlResolverService.getProfilePicture(
			user,
			'.' + element.clientWidth + 'x' + element.clientHeight
		);
	}
}
