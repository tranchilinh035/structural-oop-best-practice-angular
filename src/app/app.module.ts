import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ClassManagementComponent } from './class-management/class-management.component';
import { StudenteditComponent } from './studentedit/studentedit.component';
import { StudentcreateComponent } from './studentcreate/studentcreate.component';

@NgModule({
	declarations: [
		AppComponent,
		ClassManagementComponent,
		StudenteditComponent,
		StudentcreateComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ReactiveFormsModule,
		ToastrModule.forRoot({
			timeOut: 3000
		}),
	],
	bootstrap: [AppComponent],
	providers: [CurrencyPipe, DatePipe]
})
export class AppModule {
}
