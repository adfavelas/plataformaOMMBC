import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { RequestsComponent } from './requests/requests.component';
import { UploadProblemsComponent } from './upload-problems/upload-problems.component';

const routes: Routes = [
  { path: 'requests', component: RequestsComponent},
  { path: 'uploadProblems', component: UploadProblemsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
