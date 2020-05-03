import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AchievementsPageComponent } from './pages/achievements-page/achievements-page.component';
import { ChallengeDetailsPageComponent } from './pages/challenge-details-page/challenge-details-page.component';
import { ChallengeListPageComponent } from './pages/challenge-list-page/challenge-list-page.component';
import { CreateChallengePageComponent } from './pages/create-challenge-page/create-challenge-page.component';
import { FriendsPageComponent } from './pages/friends-page/friends-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { UploadProfilePicturePageComponent } from './pages/upload-profile-picture-page/upload-profile-picture-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
		WelcomePageComponent,
		HomePageComponent,
		ChallengeListPageComponent,
		AchievementsPageComponent,
		CreateChallengePageComponent,
		ChallengeDetailsPageComponent,
		ProfilePageComponent,
		FriendsPageComponent,
		UploadProfilePicturePageComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
		}),
		ImageCropperModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
