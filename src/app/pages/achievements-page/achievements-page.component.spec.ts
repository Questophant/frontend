import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AchievementsPageComponent } from './achievements-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApiService } from '../../shared/services/api-service/api.service';
import { anyString, instance, mock, when } from 'ts-mockito';
import { StoreService } from '../../shared/services/store/store.service';

describe('AchievementsPageComponent', () => {
	let component: AchievementsPageComponent;
	let fixture: ComponentFixture<AchievementsPageComponent>;
	const mockApiService = mock(ApiService);
	const mockStoreService = mock(StoreService);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ApiService,
					useValue: instance(mockApiService),
				},
				{
					provide: StoreService,
					useValue: instance(mockStoreService),
				},
			],
			declarations: [AchievementsPageComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		when(mockApiService.getAchievementsForUser(anyString())).thenResolve({
			achievmentsByCategory: [],
			overalLevel: [],
		});
		when(mockStoreService.getPublicUserId()).thenReturn('vklkvl');
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AchievementsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
