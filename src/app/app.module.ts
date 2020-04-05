import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {SharedModule} from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
		StartPageComponent,
		RegisterPageComponent,
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
