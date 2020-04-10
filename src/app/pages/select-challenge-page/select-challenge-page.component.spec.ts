import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChallengePageComponent } from './select-challenge-page.component';

describe('SelectChallengePageComponent', () => {
	let component: SelectChallengePageComponent;
	let fixture: ComponentFixture<SelectChallengePageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SelectChallengePageComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectChallengePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
