import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { SimApiService } from 'src/app/shared/services/api-service/sim.api.service';
import { SelectChallengePageComponent } from './select-challenge-page.component';

describe('SelectChallengePageComponent', () => {
	let component: SelectChallengePageComponent;
	let fixture: ComponentFixture<SelectChallengePageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SelectChallengePageComponent],
			providers: [
				{
					provide: ApiService,
					useValue: new SimApiService(),
				},
			],
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
