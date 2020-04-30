import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { AuthService } from '../../shared/services/auth/auth.service';
import { WelcomePageComponent } from './welcome-page.component';

describe('WelcomePageComponent', () => {
	let component: WelcomePageComponent;
	let fixture: ComponentFixture<WelcomePageComponent>;
	const mockAuthService = mock(AuthService);
	const mockApiService = mock(ApiService);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [WelcomePageComponent],
			imports: [RouterTestingModule, ReactiveFormsModule],
			providers: [
				{
					provide: AuthService,
					useValue: instance(mockAuthService),
				},
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(WelcomePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should redirect to root if user already registered', () => {
		const mockRouter = mock(Router);
		when(mockAuthService.isUserRegistered()).thenReturn(true);
		when(mockRouter.navigate(deepEqual(['/']))).thenResolve();

		const comp = new WelcomePageComponent(
			mockAuthService,
			instance(mockRouter),
			mockApiService
		);

		verify(mockRouter.navigate(deepEqual(['/']))).called();
	});
});
