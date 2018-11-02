import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { ProfileComponent } from './profile/profile.component';
import { GuidedLearningComponent } from './guided-learning/guided-learning.component';
import { Error404Component } from './error404/error404.component';
import { SettingsComponent } from './settings/settings.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProblemsComponent } from './problems/problems.component';


const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'guidedLearning', component: GuidedLearningComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'updateProfile', component: UpdateProfileComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: 'restorePassword', component: RestorePasswordComponent},
  { path: 'updatePassword', component: UpdatePasswordComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'problems', component: ProblemsComponent},
  { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
