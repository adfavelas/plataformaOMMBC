import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RequestsComponent } from './requests/requests.component';
import { UploadProblemsComponent } from './upload-problems/upload-problems.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [RequestsComponent, UploadProblemsComponent],
  imports: [CommonModule, FormsModule, AdminRoutingModule]
})
export class AdminModule {}
