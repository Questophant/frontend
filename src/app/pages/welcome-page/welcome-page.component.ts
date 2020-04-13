import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api-service/api.service';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});

	constructor(public api: ApiService, private router: Router) {}

	ngOnInit(): void {}

	login(): void {
		if (this.loginForm.valid) {
			alert(
				'email: ' +
					this.loginForm.get('email').value +
					', password: ' +
					this.loginForm.get('password').value
			);
		} else {
			alert('invalid');
		}
	}

	skip(): void {
		this.router.navigateByUrl('select-challenge');
	}

	saveName(): void {
		// ToDo: save name
		this.skip();
	}
}
