import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
	submitted = false;
	nameIsAlreadyInUse = false;
	showDataPrivacy = false;
	showRules = false;

	registrationForm = new FormGroup({
		name: new FormControl('', [
			Validators.required,
			Validators.minLength(1),
		]),
		dataPrivacy: new FormControl(false, [Validators.requiredTrue]),
		rules: new FormControl(false, [Validators.requiredTrue]),
	});

	constructor(public auth: AuthService, private router: Router) {
		if (this.auth.isUserRegistered()) {
			this.router
				.navigate(['/'])
				.catch((reason) =>
					alert('Es gab einen Fehler bei der Weiterleitung')
				);
		}
	}

	ngOnInit(): void {}

	saveName(): void {
		this.submitted = true;

		if (this.registrationForm.valid) {
			const name = this.registrationForm.get('name').value;

			this.auth.register(name).then(
				(value) => {
					this.router
						.navigate(['/'])
						.catch((reason) =>
							alert('Es gab einen Fehler bei der Weiterleitung')
						);
				},
				(reason) => {
					this.nameIsAlreadyInUse = true;
				}
			);
		}
	}

	toggleDataPrivacy() {
		this.showDataPrivacy = !this.showDataPrivacy;
	}

	toggleRules() {
		this.showRules = !this.showRules;
	}
}
