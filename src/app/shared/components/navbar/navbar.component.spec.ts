import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { instance, mock } from 'ts-mockito';
import { ApiService } from '../../services/api/api.service';
import { NavbarComponent } from './navbar.component';


describe('NavbarComponent', () => {
	let component: NavbarComponent;
	let fixture: ComponentFixture<NavbarComponent>;
	const mockApiService = mock(ApiService);
	const mockRouterService = mock(Router);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NavbarComponent],
			providers: [
				{
					provide: Router,
					useValue: instance(mockRouterService),
				},
				{
					provide: ApiService,
					useValue: instance(mockApiService),
				}]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
