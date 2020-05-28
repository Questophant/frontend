import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SwUpdate } from '@angular/service-worker';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';


class MockSwUpdate {
	$$availableSubj = new Subject<{ available: { hash: string } }>();
	$$activatedSubj = new Subject<{ current: { hash: string } }>();

	available = this.$$availableSubj.asObservable();
	activated = this.$$activatedSubj.asObservable();

	activateUpdate = jasmine.createSpy('MockSwUpdate.activateUpdate')
		.and.callFake(() => Promise.resolve());

	checkForUpdate = jasmine.createSpy('MockSwUpdate.checkForUpdate')
		.and.callFake(() => Promise.resolve());

	constructor(public isEnabled: boolean) { }
}

describe('AppComponent', () => {

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: SwUpdate,
					useValue: new MockSwUpdate(false),
				},
			],
			imports: [RouterTestingModule],
			declarations: [AppComponent],
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
