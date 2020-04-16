import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WelcomePageComponent } from './welcome-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

describe('WelcomePageComponent', () => {
	let component: WelcomePageComponent;
	let fixture: ComponentFixture<WelcomePageComponent>;
	const mockAuthService = mock(AuthService);

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
			instance(mockRouter)
		);

		verify(mockRouter.navigate(deepEqual(['/']))).called();
	});
});
