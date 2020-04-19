import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesOverlayComponent } from './rules-overlay.component';

describe('RulesOverlayComponent', () => {
	let component: RulesOverlayComponent;
	let fixture: ComponentFixture<RulesOverlayComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RulesOverlayComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RulesOverlayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
