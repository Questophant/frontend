import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPageComponent } from './friends-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FriendsPageComponent', () => {
	let component: FriendsPageComponent;
	let fixture: ComponentFixture<FriendsPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FriendsPageComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FriendsPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
