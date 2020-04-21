import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeListPageComponent } from './challenge-list-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../../shared/services/api-service/api.service';
import { instance, mock } from 'ts-mockito';

describe('ChallengeListPageComponent', () => {
	let component: ChallengeListPageComponent;
	let fixture: ComponentFixture<ChallengeListPageComponent>;
	const mockApiService = mock(ApiService);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ChallengeListPageComponent],
			providers: [
				{
					provide: ApiService,
					useValue: instance(mockApiService),
				},
			],
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
