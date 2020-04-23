import { Component, OnInit } from '@angular/core';
import { ChallengeDto } from 'src/app/shared/dtos/challenge.dto';
import { ApiService } from '../../shared/services/api-service/api.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
	challenges$: Promise<ChallengeDto[]>;
	showDataPrivacy = false;
	showRules = false;

	constructor(private api: ApiService, private router: Router) {
		this.challenges$ = api.getChallenges(null, 0, 10); // TODO:
	}

	ngOnInit(): void {}

	toggleRules(): void {
		this.showRules = !this.showRules;
	}

	toggleDataPrivacy(): void {
		this.showDataPrivacy = !this.showDataPrivacy;
	}

	challengeSelect(evt, status) {
		// Declare all variables
		var i, tabcontent, tablinks;

		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName('tabcontent');
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = 'none';
		}

		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = document.getElementsByClassName('tablinks');
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(
				' active',
				''
			);
		}

		// Show the current tab, and add an "active" class to the button that opened the tab
		document.getElementById(status).style.display = 'block';
		evt.currentTarget.className += ' active';
	}
}
