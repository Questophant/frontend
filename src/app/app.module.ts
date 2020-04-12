import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [AppComponent, WelcomePageComponent, RegisterPageComponent],
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
