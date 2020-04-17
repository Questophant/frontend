import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HasRegisteredGuard } from './shared/guards/has-registered/has-registered.guard';
import { ChallengeListPageComponent } from './pages/challenge-list-page/challenge-list-page.component';

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
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
