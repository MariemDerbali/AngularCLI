import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListMeetingsComponent } from './list-meetings/list-meetings.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminMeetingsComponent } from './admin/admin-meetings/admin-meetings.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { DetailsMeetingComponent } from './details-meeting/details-meeting.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListMeetingsComponent,
    AdminDashboardComponent,
    AdminMeetingsComponent,
    SigninComponent,
    DetailsMeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
