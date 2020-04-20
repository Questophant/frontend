import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDetailsPageComponent } from './challenge-details-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChallengeDetailsPageComponent', () => {
	let component: ChallengeDetailsPageComponent;
	let fixture: ComponentFixture<ChallengeDetailsPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ChallengeDetailsPageComponent],
		}).compileComponents();

		window.history.pushState({}, '');
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChallengeDetailsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
