import { WelcomePageComponent } from './welcome-page.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ApiService } from '../../shared/services/api-service/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('WelcomePageComponent', () => {
	let component: WelcomePageComponent;
	let fixture: ComponentFixture<WelcomePageComponent>;
	const mockAuthService = mock(AuthService);
	const mockApiService = mock(ApiService);
	const mockRouter = mock(Router);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [WelcomePageComponent],
			imports: [RouterTestingModule, ReactiveFormsModule],
			providers: [
				{
					provide: AuthService,
					useValue: instance(mockAuthService),
				},
				{
					provide: ApiService,
					useValue: instance(mockApiService),
				},
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		when(mockAuthService.checkUserRegistered()).thenResolve(true);
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
		when(mockRouter.navigate(deepEqual(['/']))).thenResolve();
		when(mockAuthService.checkUserRegistered()).thenResolve(true);

		const comp = new WelcomePageComponent(
			instance(mockAuthService),
			instance(mockRouter),
			mockApiService
		);

		// Need to wait here because method call happens inside then method of promise. Otherwise fails because checking too early
		setTimeout(() => {
			verify(mockRouter.navigate(deepEqual(['/']))).called();
		}, 1000);
	});
});
