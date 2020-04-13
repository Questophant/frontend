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
	registrationForm = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(1)]),
		dataPrivacy: new FormControl(false, [Validators.requiredTrue]),
		codeOfConduct: new FormControl(false, [Validators.requiredTrue]),
	});

	constructor(public auth: AuthService, private router: Router) {
	}

	ngOnInit(): void {
	}

	skip(): void {
		this.router.navigate(['']);
	}

	saveName(): void {
		console.log(this.registrationForm.get('name').errors);
		console.log(this.registrationForm.get('dataPrivacy').errors);
		console.log(this.registrationForm.get('codeOfConduct').errors);
		if (this.registrationForm.valid) {
			this.auth.register(this.registrationForm.get('name').value);
			this.skip();
		} else {
			alert('form invalid');
		}
	}
}
