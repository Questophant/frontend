import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { anyString, instance, mock, when } from 'ts-mockito';
import { ApiService } from '../../shared/services/api/api.service';
import { StoreService } from '../../shared/services/store/store.service';
import { AchievementsPageComponent } from './achievements-page.component';

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
			achievementsByCategory: {},
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
