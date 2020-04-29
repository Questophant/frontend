import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintOverlayComponent } from './imprint-overlay.component';

describe('ImprintOverlayComponent', () => {
	let component: ImprintOverlayComponent;
	let fixture: ComponentFixture<ImprintOverlayComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ImprintOverlayComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ImprintOverlayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
