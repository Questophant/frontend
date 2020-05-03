import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { instance, mock } from 'ts-mockito';
import { ApiService } from '../../shared/services/api/api.service';
import { ChallengeListPageComponent } from './challenge-list-page.component';


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
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
