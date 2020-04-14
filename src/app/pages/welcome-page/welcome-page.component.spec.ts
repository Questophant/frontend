import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { WelcomePageComponent } from './welcome-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { instance, mock } from 'ts-mockito';

describe('WelcomePageComponent', () => {
	let component: WelcomePageComponent;
	let fixture: ComponentFixture<WelcomePageComponent>;
	const mockApiService = mock(ApiService);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [WelcomePageComponent],
			imports: [RouterTestingModule, ReactiveFormsModule],
			providers: [
				{
					provide: ApiService,
					useValue: instance(mockApiService),
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
});
