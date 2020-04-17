import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AchievementsPageComponent } from './pages/achievements-page/achievements-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
		StartPageComponent,
		RegisterPageComponent,
		AchievementsPageComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
