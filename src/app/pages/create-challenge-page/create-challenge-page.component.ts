import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categories, Category } from '../../shared/dtos/category';

@Component({
	selector: 'app-create-challenge-page',
	templateUrl: './create-challenge-page.component.html',
	styleUrls: ['./create-challenge-page.component.scss'],
})
export class CreateChallengePageComponent implements OnInit {
	categories = Categories;

	challengeName = new FormControl('', [Validators.required]);
	challengeDescription = new FormControl('', [Validators.required]);
	challengeMaterial = new FormControl('', []);
	challengeCategory = new FormControl('', [Validators.required]);

	createChallengeForm = new FormGroup({
		title: this.challengeName,
		description: this.challengeDescription,
		material: this.challengeMaterial,
		category: this.challengeCategory,
	});

	constructor() {}

	ngOnInit(): void {}

	onSubmit(): void {
		console.log(this.createChallengeForm);
	}
}
