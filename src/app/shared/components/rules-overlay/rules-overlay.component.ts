import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-rules-overlay',
	templateUrl: './rules-overlay.component.html',
	styleUrls: ['./rules-overlay.component.scss'],
})
export class RulesOverlayComponent {
	@Output() public closeEvent: EventEmitter<void> = new EventEmitter();

	constructor() {}

	close(): void {
		this.closeEvent.emit();
	}
}
