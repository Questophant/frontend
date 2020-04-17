import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementsPageComponent } from './pages/achievements-page/achievements-page.component';
import { CreateChallengePageComponent } from './pages/create-challenge-page/create-challenge-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

const routes: Routes = [
	{
		path: '',
		component: StartPageComponent,
	},
	{
		path: 'register',
		component: RegisterPageComponent,
	},
	{
		path: 'create',
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
