import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
	const pipe = new DurationPipe();

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should return correct time for seconds', () => {
		expect(pipe.transform(1)).toEqual('1 Sekunde');
		expect(pipe.transform(10)).toEqual('10 Sekunden');
		expect(pipe.transform(60)).toEqual('1 Minute');
		expect(pipe.transform(600)).toEqual('10 Minuten');
		expect(pipe.transform(3600)).toEqual('1 Stunde');
		expect(pipe.transform(36000)).toEqual('10 Stunden');
	});
});
