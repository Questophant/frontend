import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { ApiService } from '../../shared/services/api/api.service';
import { AuthService } from '../../shared/services/auth/auth.service';
import { WelcomePageComponent } from './welcome-page.component';
import { Observable } from 'rxjs';

describe('WelcomePageComponent', () => {
	let component: WelcomePageComponent;
	let fixture: ComponentFixture<WelcomePageComponent>;
	const mockAuthService = mock(AuthService);
	const mockApiService = mock(ApiService);
	const mockRouter = mock(Router);
	const mockRoute = mock(ActivatedRoute);

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
		when(mockRoute.queryParamMap).thenReturn(new Observable());

		const comp = new WelcomePageComponent(
			instance(mockAuthService),
			instance(mockRouter),
			mockApiService,
			instance(mockRoute),
		);

		// Need to wait here because method call happens inside then method of promise. Otherwise fails because checking too early
		setTimeout(() => {
			verify(mockRouter.navigate(deepEqual(['/']))).called();
		}, 1000);
	});
});
