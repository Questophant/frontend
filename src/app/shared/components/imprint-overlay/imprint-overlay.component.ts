import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-imprint-overlay',
	templateUrl: './imprint-overlay.component.html',
	styleUrls: ['./imprint-overlay.component.scss'],
})
export class ImprintOverlayComponent {
	@Output() public onClose: EventEmitter<void> = new EventEmitter();

	constructor() {}

	close() {
		this.onClose.emit();
	}
}
