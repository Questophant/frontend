import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementsPageComponent } from './pages/achievements-page/achievements-page.component';
import { ChallengeDetailsPageComponent } from './pages/challenge-details-page/challenge-details-page.component';
import { ChallengeListPageComponent } from './pages/challenge-list-page/challenge-list-page.component';
import { CreateChallengePageComponent } from './pages/create-challenge-page/create-challenge-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HasRegisteredGuard } from './shared/guards/has-registered/has-registered.guard';

const routes: Routes = [
	{
		// No registered user needed for this route
		path: 'welcome',
		component: WelcomePageComponent,
	},
	{
		// Require registered user for this routes
		path: '',
		canActivate: [HasRegisteredGuard],
		children: [
			{
				path: '',
				component: HomePageComponent,
			},
			{
				path: 'challenges/star',
				component: ChallengeListPageComponent,
				data: { showProgress: false },
			},
			{
				path: 'challenges/running',
				component: ChallengeListPageComponent,
				data: { showProgress: true },
			},
			{
				path: 'challenge/create',
				component: CreateChallengePageComponent,
			},
			{
				path: 'challenge/details',
				component: ChallengeDetailsPageComponent,
			},
			{
				path: 'achievements',
				component: AchievementsPageComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
