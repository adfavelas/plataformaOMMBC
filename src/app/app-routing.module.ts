import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './student/home/home.component';
import { FaqComponent } from './student/faq/faq.component';
import { ProfileComponent } from './profile/profile.component';
import { GuidedLearningComponent } from './student/guided-learning/guided-learning.component';
import { Error404Component } from './error404/error404.component';
import { SettingsComponent } from './settings/settings.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProblemsComponent } from './student/problems/problems.component';
import { ProblemComponent } from './student/problem/problem.component';
import { RankingComponent } from './ranking/ranking.component';
import { ForumComponent } from './forum/forum.component';
import { TokenGuard } from './token-guard';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'faq', component: FaqComponent, canActivate: [TokenGuard]},
  { path: 'home', component: HomeComponent , canActivate: [TokenGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'signup/teacher', component: SignupComponent},
  { path: 'problem/:id', component: ProblemComponent , canActivate: [TokenGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [TokenGuard]},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [TokenGuard]},
  { path: 'ranking', component: RankingComponent, canActivate: [TokenGuard]},
  { path: 'problems', component: ProblemsComponent, canActivate: [TokenGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [TokenGuard]},
  { path: 'notifications', component: NotificationsComponent, canActivate: [TokenGuard]},
  { path: 'updateProfile', component: UpdateProfileComponent, canActivate: [TokenGuard]},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'updatePassword', component: UpdatePasswordComponent , canActivate: [TokenGuard]},
  { path: 'guidedLearning', component: GuidedLearningComponent, canActivate: [TokenGuard]},
  { path: 'restorePassword/:token', component: RestorePasswordComponent},
  { path: 'forum', component: ForumComponent , canActivate: [TokenGuard]},

  // ADMIN
  { path: 'a', loadChildren: './admin/admin.module#AdminModule'},
  { path: '404', component: Error404Component},
  { path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TokenGuard]
})
export class AppRoutingModule {}
