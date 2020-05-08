import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categories, getCategoryByName } from '../../shared/dtos/category';
import { ApiService } from '../../shared/services/api/api.service';

@Component({
	selector: 'app-create-challenge-page',
	templateUrl: './create-challenge-page.component.html',
	styleUrls: ['./create-challenge-page.component.scss'],
})
export class CreateChallengePageComponent implements OnInit {
	categories = Categories;
	submitted = false;
	showForm = true;
	challengeCreated = false;
	error = false;

	challengeName = new FormControl('', [
		Validators.required,
		Validators.minLength(2),
		Validators.maxLength(255),
	]);
	challengeDescription = new FormControl('', [
		Validators.required,
		Validators.minLength(10),
		Validators.maxLength(2048),
	]);
	challengeCategory = new FormControl('', [Validators.required]);
	challengeMaterial = new FormControl('', [Validators.maxLength(255)]);
	challengeDuration = new FormControl(null, [
		Validators.min(0),
		Validators.max(24 * 60),
		Validators.pattern('[0-9]*'),
	]);

	createChallengeForm = new FormGroup({
		title: this.challengeName,
		description: this.challengeDescription,
		category: this.challengeCategory,
		material: this.challengeMaterial,
		duration: this.challengeDuration,
	});

	constructor(private api: ApiService) {}

	ngOnInit(): void {}

	onSubmit(): void {
		this.submitted = true;
		const category = getCategoryByName(this.challengeCategory.value);

		if (this.createChallengeForm.valid && category !== undefined) {
			this.api
				.createNewChallenge({
					title: this.challengeName.value,
					description: this.challengeDescription.value,
					category: category.name,
					material: this.challengeMaterial.value,
					durationSeconds: this.challengeDuration.value,
					kind: 'self',
				})
				.then((value) => {
					this.showForm = false;
					this.challengeCreated = true;
				})
				.catch((reason) => {
					this.showForm = false;
					this.error = true;
				});
		}
	}

	getErrorForDescription(): string {
		if (this.challengeDescription.hasError('required')) {
			return 'Gib deiner Herausforderung eine Beschreibung.';
		}
		if (this.challengeDescription.hasError('minlength')) {
			return 'Beschreibe deine Herausforderung genauer.';
		}
		if (this.challengeDescription.hasError('maxlength')) {
			return 'Fasse dich in der Beschreibung etwas kürzer.';
		}
	}

	getErrorForName(): string {
		if (this.challengeDescription.hasError('required')) {
			return 'Gib deiner Herausforderung einen Namen.';
		}
		if (this.challengeDescription.hasError('minlength')) {
			return 'Der Name ist etwas kurz.';
		}
		if (this.challengeDescription.hasError('maxlength')) {
			return 'Der Name ist etwas lang.';
		}
	}
}
