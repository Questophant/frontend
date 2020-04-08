import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SelectChallengePageComponent } from './pages/select-challenge-page/select-challenge-page.component';

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
		path: 'select-challenge',
		component: SelectChallengePageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
