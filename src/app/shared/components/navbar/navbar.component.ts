import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '../../dtos/user.dto';
import { ApiService } from '../../services/api/api.service';
import { StoreService } from '../../services/store/store.service';
import { UrlResolverService } from '../../services/url/url-resolver.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

	user$: Promise<UserDto>;

	constructor(private api: ApiService,
		private router: Router,
		private store: StoreService, private urlResolverService: UrlResolverService, ) {
		this.user$ = api.getMyUser(store.getUserId());
	}

	ngOnInit(): void { }

	getProfilePicture(user: UserDto): string {
		let element = document.getElementsByClassName('navbarProfilePicture')[0];
		return this.urlResolverService.getProfilePicture(
			user,
			'.' + element.clientWidth + 'x' + element.clientHeight
		);
	}
}
