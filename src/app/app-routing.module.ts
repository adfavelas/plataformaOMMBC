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
import { ProblemComponent } from './problem/problem.component';
import { RankingComponent } from './ranking/ranking.component';


const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'problem', component: ProblemComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'ranking', component: RankingComponent},
  { path: 'problems', component: ProblemsComponent},
  { path: 'settings', component: SettingsComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: 'updateProfile', component: UpdateProfileComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'updatePassword', component: UpdatePasswordComponent},
  { path: 'guidedLearning', component: GuidedLearningComponent},
  { path: 'restorePassword/:token', component: RestorePasswordComponent},
  { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
