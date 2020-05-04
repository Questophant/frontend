import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { instance, mock } from 'ts-mockito';
import { ProfilePageComponent } from './profile-page.component';

describe('ProfilePageComponent', () => {
	let component: ProfilePageComponent;
	let fixture: ComponentFixture<ProfilePageComponent>;
	const mockApiService = mock(ApiService);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ProfilePageComponent],
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
		fixture = TestBed.createComponent(ProfilePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
