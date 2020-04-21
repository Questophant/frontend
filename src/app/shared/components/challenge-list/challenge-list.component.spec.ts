import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeListComponent } from './challenge-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChallengeListComponent', () => {
	let component: ChallengeListComponent;
	let fixture: ComponentFixture<ChallengeListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ChallengeListComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ChallengeListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
