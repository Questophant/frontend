import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

const routes: Routes = [
	{
		path: '',
		component: WelcomePageComponent,
	},
	{
		path: 'register',
		component: RegisterPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
