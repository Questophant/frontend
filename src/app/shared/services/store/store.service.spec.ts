import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';

describe('StoreService', () => {
	let service: StoreService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(StoreService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('rememberedChallenges', () => {
		it('should return empty array when no Challenge remembered', () => {
			localStorage.setItem('rememberedChallenges', '');

			expect(service.getRememberedChallenges()).toEqual([]);
		});

		it('should add Challenge', () => {
			localStorage.setItem('rememberedChallenges', '');

			service.addRememberedChallenge(99);

			expect(service.getRememberedChallenges()).toEqual([99]);
		});

		it('should not add when already exists', () => {
			localStorage.setItem('rememberedChallenges', '');

			service.addRememberedChallenge(99);
			service.addRememberedChallenge(99);

			expect(service.getRememberedChallenges()).toEqual([99]);
		});

		it('should remove challenge', () => {
			localStorage.setItem('rememberedChallenges', '[21,99]');

			service.removeRememberedChallenge(99);

			expect(service.getRememberedChallenges()).toEqual([21]);
		});
	});

	describe('acceptedChallenges', () => {
		it('should return empty array when no Challenge accepted', () => {
			localStorage.setItem('acceptedChallenges', '');

			expect(service.getAcceptedChallenges()).toEqual([]);
		});

		it('should add Challenge', () => {
			localStorage.setItem('acceptedChallenges', '');

			service.addAcceptedChallenge(99);

			expect(service.getAcceptedChallenges()).toEqual([99]);
		});

		it('should not add when already exists', () => {
			localStorage.setItem('acceptedChallenges', '');

			service.addAcceptedChallenge(99);
			service.addAcceptedChallenge(99);

			expect(service.getAcceptedChallenges()).toEqual([99]);
		});

		it('should remove challenge', () => {
			localStorage.setItem('acceptedChallenges', '[21,99]');

			service.removeAcceptedChallenge(99);

			expect(service.getAcceptedChallenges()).toEqual([21]);
		});
	});
});
