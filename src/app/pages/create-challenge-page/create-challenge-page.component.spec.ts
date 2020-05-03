import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChallengePageComponent } from './create-challenge-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApiService } from '../../shared/services/api-service/api.service';
import { instance, mock } from 'ts-mockito';

describe('CreateChallengePageComponent', () => {
	let component: CreateChallengePageComponent;
	let fixture: ComponentFixture<CreateChallengePageComponent>;
	const mockApiService = mock(ApiService);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CreateChallengePageComponent],
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
		fixture = TestBed.createComponent(CreateChallengePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
