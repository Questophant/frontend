import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeListPageComponent } from './challenge-list-page.component';

describe('ChallengeListComponent', () => {
	let component: ChallengeListPageComponent;
	let fixture: ComponentFixture<ChallengeListPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ChallengeListPageComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChallengeListPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
