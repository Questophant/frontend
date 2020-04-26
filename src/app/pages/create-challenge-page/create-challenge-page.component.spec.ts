import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChallengePageComponent } from './create-challenge-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CreateChallengePageComponent', () => {
	let component: CreateChallengePageComponent;
	let fixture: ComponentFixture<CreateChallengePageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CreateChallengePageComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateChallengePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
