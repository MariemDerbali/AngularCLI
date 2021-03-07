import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { DetailsMeetingComponent } from './details-meeting/details-meeting.component';
import { ListMeetingsComponent } from './list-meetings/list-meetings.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'listmeetings', component: ListMeetingsComponent},
  { path: 'admin/dashboard', canActivate: [AuthGuardService] , component: AdminDashboardComponent},
  { path: 'login', component: SigninComponent},
  { path: 'meet/:id', component: DetailsMeetingComponent },
  { path: '', redirectTo: 'listmeetings', pathMatch: 'full' },
  { path: '**' , redirectTo: 'listmeetings' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
