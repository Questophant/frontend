import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementsPageComponent } from './pages/achievements-page/achievements-page.component';
import { CreateChallengePageComponent } from './pages/create-challenge-page/create-challenge-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HasRegisteredGuard } from './shared/guards/has-registered/has-registered.guard';

const routes: Routes = [
	{
		path: '',
		component: HomePageComponent,
		canActivate: [HasRegisteredGuard],
	},
	{
		path: 'welcome',
		component: WelcomePageComponent,
	},
	{
		path: 'challenge/create',
		component: CreateChallengePageComponent,
	},
	{
		path: 'achievements',
		component: AchievementsPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
