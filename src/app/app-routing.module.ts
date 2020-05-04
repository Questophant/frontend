import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementsPageComponent } from './pages/achievements-page/achievements-page.component';
import { ChallengeListPageComponent } from './pages/challenge-list-page/challenge-list-page.component';
import { CreateChallengePageComponent } from './pages/create-challenge-page/create-challenge-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HasRegisteredGuard } from './shared/guards/has-registered/has-registered.guard';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { ChallengeDetailsPageComponent } from './pages/challenge-details-page/challenge-details-page.component';
import { UploadProfilePicturePageComponent } from './pages/upload-profile-picture-page/upload-profile-picture-page.component';

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
				path: 'challenges',
				component: ChallengeListPageComponent,
			},
			{
				path: 'challenge/create',
				component: CreateChallengePageComponent,
			},
			{
				path: 'challenge/:id/details',
				component: ChallengeDetailsPageComponent,
			},
			{
				path: 'achievements',
				component: AchievementsPageComponent,
			},
			{
				path: 'profile',
				component: ProfilePageComponent,
			},
			{
				path: 'friends',
				component: FriendsPageComponent,
			},
			{
				path: 'uploadProfilePicture',
				component: UploadProfilePicturePageComponent,
			},
		],
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
			scrollPositionRestoration: 'enabled',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
