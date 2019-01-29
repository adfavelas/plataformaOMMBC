import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-upload-problems',
  templateUrl: './upload-problems.component.html',
  styleUrls: ['./upload-problems.component.sass']
})
export class UploadProblemsComponent implements OnInit {
  csvFile: any;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  setFile(event: Event) {
    this.csvFile = (event.target as HTMLInputElement).files[0];
    console.log(this.csvFile);
  }

  onUpload() {
    const data = new FormData();
    data.append('file', this.csvFile);
    this.adminService.uploadCSV(data).subscribe( res => {
      console.log(res);
    });
  }

}
