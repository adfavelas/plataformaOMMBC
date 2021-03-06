import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './student/header/header.component';
import { AppRoutingModule } from './app-routing.module';
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
import { TokenInterceptor } from './token-interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProblemsComponent } from './student/problems/problems.component';
import { ProblemComponent } from './student/problem/problem.component';
import { RankingComponent } from './ranking/ranking.component';
import { ForumComponent } from './forum/forum.component';

// Modules
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    LandingComponent,
    HomeComponent,
    FaqComponent,
    ProfileComponent,
    GuidedLearningComponent,
    Error404Component,
    SettingsComponent,
    UpdateProfileComponent,
    NotificationsComponent,
    RestorePasswordComponent,
    UpdatePasswordComponent,
    ForgotPasswordComponent,
    ProblemsComponent,
    ProblemComponent,
    RankingComponent,
    ForumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
