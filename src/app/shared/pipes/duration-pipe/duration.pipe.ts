import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'duration',
})
export class DurationPipe implements PipeTransform {
	transform(seconds: number): string {
		if (seconds) {
			const intervals = {
				Stunde: 3600,
				Minute: 60,
				Sekunde: 1,
			};
			let counter;
			for (const i in intervals) {
				counter = Math.floor(seconds / intervals[i]);
				if (counter > 0) {
					if (counter === 1) {
						return counter + ' ' + i; // singular (1 day ago)
					} else {
						return counter + ' ' + i + 'n'; // plural (2 days ago)
					}
				}
			}
		}
		return '';
	}
}
