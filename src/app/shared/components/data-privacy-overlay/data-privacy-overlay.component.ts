import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-data-privacy-overlay',
	templateUrl: './data-privacy-overlay.component.html',
	styleUrls: ['./data-privacy-overlay.component.scss'],
})
export class DataPrivacyOverlayComponent {
	@Output() public onClose: EventEmitter<void> = new EventEmitter();

	constructor() {}

	close() {
		this.onClose.emit();
	}
}
