import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPrivacyOverlayComponent } from './data-privacy-overlay.component';

describe('DataPrivacyOverlayComponent', () => {
	let component: DataPrivacyOverlayComponent;
	let fixture: ComponentFixture<DataPrivacyOverlayComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DataPrivacyOverlayComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DataPrivacyOverlayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
