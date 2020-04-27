import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categories, getCategoryByName } from '../../shared/dtos/category';
import { ApiService } from '../../shared/services/api-service/api.service';

@Component({
	selector: 'app-create-challenge-page',
	templateUrl: './create-challenge-page.component.html',
	styleUrls: ['./create-challenge-page.component.scss'],
})
export class CreateChallengePageComponent implements OnInit {
	categories = Categories;
	submitted = false;

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
	challengeDuration = new FormControl(0, [Validators.required]);

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
		console.log(this.createChallengeForm.errors);
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
					alert('Challenge created');
				})
				.catch((reason) => {
					alert(JSON.stringify(reason));
				});
		}
	}
}
