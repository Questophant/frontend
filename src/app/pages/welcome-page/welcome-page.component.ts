import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ApiService } from '../../shared/services/api/api.service';

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

	redirectRoute: string;

	nameFormControl = new FormControl('', [
		Validators.required,
		Validators.minLength(3),
		Validators.maxLength(30),
		Validators.pattern('([a-zA-Z0-9 ])+'),
	]);

	registrationForm = new FormGroup({
		name: this.nameFormControl,
		dataPrivacy: new FormControl(false, [Validators.requiredTrue]),
		rules: new FormControl(false, [Validators.requiredTrue]),
	});

	constructor(
		public auth: AuthService,
		private router: Router,
		private api: ApiService,
		private route: ActivatedRoute
	) {
		this.auth
			.checkUserRegistered()
			.then((registered) => {
				if (registered) {
					this.router.navigate(['/']).catch((reason) => {
						alert('Es gab einen Fehler bei der Weiterleitung');
					});
				}
			})
			.catch(api.getDefaultExceptionHandler);

		this.route.queryParamMap.subscribe((params) => {
			const param = params.get('redirect');
			this.redirectRoute = param ? atob(param) : '/';
		});
	}

	ngOnInit(): void {}

	saveName(): void {
		this.submitted = true;

		if (this.registrationForm.valid) {
			const name = this.registrationForm.get('name').value;

			this.auth.register(name).then(
				(value) => {
					this.router
						.navigate([this.redirectRoute])
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

	toggleDataPrivacy(): void {
		this.showDataPrivacy = !this.showDataPrivacy;
	}

	toggleRules(): void {
		this.showRules = !this.showRules;
	}

	getErrorMessageForName(): string {
		if (this.nameFormControl.hasError('required')) {
			return 'Bitte gib einen Namen an.';
		}
		if (this.nameFormControl.hasError('minlength')) {
			return 'Bitte gib einen längeren Namen an.';
		}
		if (this.nameFormControl.hasError('maxlength')) {
			return 'Bitte gib einen kürzeren Namen an.';
		}
		if (this.nameFormControl.hasError('pattern')) {
			return 'Dein Name enthält ungültige Zeichen';
		}
	}
}
