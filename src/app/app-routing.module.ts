import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
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
		path: 'select-challenge',
		component: HomePageComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
