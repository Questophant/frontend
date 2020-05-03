import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/shared/services/api-service/api.service';
import { instance, mock } from 'ts-mockito';
import { UploadProfilePicturePageComponent } from './upload-profile-picture-page.component';

describe('UploadProfilePicturePageComponent', () => {
	let component: UploadProfilePicturePageComponent;
	let fixture: ComponentFixture<UploadProfilePicturePageComponent>;
	const mockApiService = mock(ApiService);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UploadProfilePicturePageComponent],
			providers: [
				{
					provide: ApiService,
					useValue: instance(mockApiService),
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UploadProfilePicturePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
