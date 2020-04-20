import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { getCategoryByName } from '../../dtos/category';

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

			service.addRememberedChallenge({
				id: 0,
				title: 'asdasdasd',
				description: 'lorem ipsum ...',
				category: getCategoryByName('eco'),
				durationSeconds: 300,
				createdBy: 'Annete',
				material: null,
			});

			expect(service.getRememberedChallenges()).toEqual([
				{
					id: 0,
					title: 'asdasdasd',
					description: 'lorem ipsum ...',
					category: getCategoryByName('eco'),
					durationSeconds: 300,
					createdBy: 'Annete',
					material: null,
				},
			]);
		});

		it('should remove challenge', () => {
			localStorage.setItem('rememberedChallenges', '');

			service.addRememberedChallenge({
				id: 0,
				title: 'asdasdasd',
				description: 'lorem ipsum ...',
				category: getCategoryByName('eco'),
				durationSeconds: 300,
				createdBy: 'Annete',
				material: null,
			});

			service.removeRememberedChallenge({
				id: 0,
				title: 'asdasdasd',
				description: 'lorem ipsum ...',
				category: getCategoryByName('eco'),
				durationSeconds: 300,
				createdBy: 'Annete',
				material: null,
			});

			expect(service.getRememberedChallenges()).toEqual([]);
		});
	});
});
