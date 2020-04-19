import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.compontent';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { AchievementsPageComponent } from './pages/achievements-page/achievements-page.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChallengeListPageComponent } from './pages/challenge-list-page/challenge-list-page.component';
import { CreateChallengePageComponent } from './pages/create-challenge-page/create-challenge-page.component';

@NgModule({
	declarations: [
		AppComponent,
		WelcomePageComponent,
		HomePageComponent,
		ChallengeListPageComponent,
		AchievementsPageComponent,
		CreateChallengePageComponent,
		ProfilePageComponent,
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
