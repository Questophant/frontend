import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { SimApiService } from 'src/app/shared/services/api-service/sim.api.service';
import { StartPageComponent } from './start-page.component';

describe('StartPageComponent', () => {
	let component: StartPageComponent;
	let fixture: ComponentFixture<StartPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [StartPageComponent],
			providers: [
				{
					provide: ApiService,
					useValue: new SimApiService(),
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StartPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
